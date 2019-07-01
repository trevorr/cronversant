const fields = require('./fields');

/*
  Canonicalization rules:
  1. Each field has an Object value with a `values` array containing all of its values in ascending order.
     Missing fields get the minimum value of the range.
  2. If a field covers the entire range, it is converted to a wildcard.
     This includes a step starting from the minimum value.
  3. If a range or non-wildcard step contains only two values, it is converted to a sequence.
  4. Steps of 1 are converted to a range.
  5. Sequences are sorted and duplicate values are removed.
  6. If a subsequence of three or more values can be replaced with an equivalent range or step, it is.
  7. Sequences of one value (or range or step) are replaced with that value.
  8. The maximum value of a step is its last value.
  9. Steps that cover every value in the field range have `periods` property containing the number of
     periods in the range (i.e. range divided by step) and a `regular` property indicating whether the
     step evenly divides the field range (i.e. `periods` is an integer).
*/

function canonicalCron(cron) {
  if (cron.canonical) {
    return cron;
  }
  const result = {
    canonical: true
  };
  const { macro } = cron;
  if (macro) {
    result.macro = macro;
  }
  if (macro !== 'reboot') {
    for (const field of fields) {
      const value = cron[field.id];
      if (value != null) {
        result[field.id] = canonicalField(field, value);
      } else {
        const range = field.canonicalRange || field.range;
        result[field.id] = {
          values: [range[0]]
        };
      }
    }
  }
  return result;
}

function canonicalField(field, value) {
  if (typeof value === 'number') {
    value = canonicalScalar(field, value);
    return {
      value,
      values: [value]
    };
  }

  let scalar = value.value;
  if (scalar != null) {
    scalar = canonicalScalar(field, scalar);
    const result = {
      value: scalar,
      values: [scalar]
    };
    const { alias } = value;
    if (alias) {
      result.alias = alias;
    }
    return result;
  }

  const { sequence } = value;
  if (sequence) {
    let values = [];
    for (const item of sequence) {
      values = mergeSorted(values, canonicalField(field, item).values);
    }
    return canonicalValues(field, values);
  }

  const { min, max, step } = value;
  const valueMin = scalarValue(min);
  const valueMax = scalarValue(max);
  const values = makeRange(valueMin, valueMax, step);
  const { canonicalRange } = field;
  if (canonicalRange) {
    const [canonicalMin, canonicalMax] = canonicalRange;
    // for ranges outside of canonical range (such as with day of week 4-7),
    // use a slower path that maps all the values to the canonical range and
    // then looks for ranges or steps
    if (valueMin < canonicalMin || valueMax > canonicalMax) {
      return canonicalValues(field, canonicalScalars(field, values));
    }
  }

  if (step > 1) {
    const stepResult = checkWild(field, {
      min,
      max: values[values.length - 1],
      step,
      values
    });
    if (stepResult.wild || values.length > 2) {
      return stepResult;
    }
  }

  if (values.length <= 2) {
    return { values };
  }

  return checkWild(field, {
    min,
    max,
    values
  });
}

function canonicalValues(field, values) {
  switch (values.length) {
    case 1:
      return { values };
    case 2: {
      // check for special case where two-element sequence should convert to wildcard step
      const range = field.canonicalRange || field.range;
      const [fieldMin, fieldMax] = range;
      const min = values[0];
      const max = values[1];
      const step = max - min;
      if (min === fieldMin && max + step > fieldMax) {
        // we know it's wild but call checkWild to set periods and regular
        return checkWild(field, {
          min,
          max,
          step,
          values
        });
      }
      return {
        sequence: values,
        values
      };
    }
  }

  const items = [];
  let prev;
  let step;
  let count = 0;
  const emitItem = () => {
    switch (count) {
      case 1:
        items.push(prev);
        break;
      case 2:
        items.push(prev - step, prev);
        break;
      default: {
        const item = {
          min: prev - step * (count - 1),
          max: prev
        };
        if (step > 1) {
          item.step = step;
        }
        items.push(item);
      }
    }
  };
  for (const v of values) {
    if (!count) {
      // first item
    } else if (!step) {
      // second item
      step = v - prev;
    } else if (v - prev === step) {
      // 3+ items matching step
    } else {
      // step broken: emit step if 3+ matching, else emit just first value and reset step
      if (count === 2) {
        items.push(prev - step);
        step = v - prev;
        count = 1;
      } else {
        emitItem();
        step = undefined;
        count = 0;
      }
    }
    prev = v;
    ++count;
  }
  if (count > 0) {
    emitItem();
  }

  if (items.length > 1) {
    return {
      sequence: items,
      values
    };
  }

  // must be a canonical range or step with more than two values due to checks above
  return checkWild(field, {
    ...items[0],
    values
  });
}

function canonicalScalars(field, values) {
  // map values to canonical values in order without duplicates using a "sparse" array;
  // efficient enough because we expect very small arrays
  const indices = [];
  for (const value of values) {
    indices[canonicalScalar(field, value)] = true;
  }
  const result = [];
  for (let i = 0; i < indices.length; ++i) {
    if (indices[i]) {
      result.push(i);
    }
  }
  return result;
}

function canonicalScalar(field, value) {
  const { canonicalRange } = field;
  if (canonicalRange) {
    const [min, max] = canonicalRange;
    if (value < min || value > max) {
      const mod = max - min + 1;
      value = (value - min) % mod;
      if (value < 0) {
        value += mod;
      }
      value += min;
    }
  }
  return value;
}

function mergeSorted(a, b) {
  const result = [];
  let ai = 0, bi = 0;
  while (ai < a.length && bi < b.length) {
    const av = a[ai];
    const bv = b[bi];
    if (av < bv) {
      result.push(av);
      ++ai;
    } else if (bv < av) {
      result.push(bv);
      ++bi;
    } else {
      result.push(av);
      ++ai;
      ++bi;
    }
  }
  while (ai < a.length) {
    result.push(a[ai++]);
  }
  while (bi < b.length) {
    result.push(b[bi++]);
  }
  return result;
}

function makeRange(min, max, step = 1) {
  const result = new Array(Math.floor((max - min) / step) + 1);
  for (let i = 0, v = min; i < result.length; ++i, v += step) {
    result[i] = v;
  }
  return result;
}

function checkWild(field, value) {
  const range = field.canonicalRange || field.range;
  const [fieldMin, fieldMax] = range;
  const { min, max, step = 1 } = value;
  const valueMin = scalarValue(min);
  const valueMax = scalarValue(max);
  if (valueMin === fieldMin && valueMax + step - 1 >= fieldMax) {
    value.wild = '*';
  }
  if (step > 1 && valueMin < fieldMin + step && valueMax > fieldMax - step) {
    value.periods = (fieldMax - fieldMin + 1) / step;
    value.regular = Number.isInteger(value.periods);
  }
  return value;
}

function scalarValue(value) {
  // handle aliases
  return typeof value === 'number' ? value : value.value;
}

module.exports = canonicalCron;
