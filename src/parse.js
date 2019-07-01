const fields = require('./fields');

const macros = {
  'yearly': '0 0 1 1 *',
  'annually': '0 0 1 1 *',
  'monthly': '0 0 1 * *',
  'weekly': '0 0 * * 0',
  'daily': '0 0 * * *',
  'midnight': '0 0 * * *',
  'hourly': '0 * * * *',
  'reboot': null // special case
};

function parseCron(str, { withSeconds } = {}) {
  const result = {};

  str = str.trim();

  const match = /^@([a-zA-Z]+)(?:\s+(.*))?$/.exec(str);
  if (match) {
    const macroName = match[1];
    const macroValue = macros[macroName.toLowerCase()];
    if (macroValue !== undefined) {
      result.macro = macroName;
      if (match[2]) {
        result.command = match[2];
      }
      if (macroValue === null) {
        return result;
      }
      str = macroValue;
      if (withSeconds) {
        str = '0 ' + str;
      }
    }
  }

  const parts = str.split(/\s+/);
  const minFields = withSeconds ? 6 : 5;
  if (parts.length < minFields) {
    throw new Error(`Expected ${minFields} fields in cron expression but got ${parts.length}`);
  }
  if (parts.length > minFields) {
    parts.length = minFields;
    if (!result.command) { // if this was a macro expansion, the command is already parsed
      // cannot just slice and join parts without munging whitespace in the command
      result.command = (withSeconds ? /^(?:\S+\s+){6}(.*)$/ : /^(?:\S+\s+){5}(.*)$/).exec(str)[1];
    }
  }

  for (let i = withSeconds ? 0 : 1, j = 0; i < fields.length; ++i, ++j) {
    const field = fields[i];
    result[field.id] = parseSequence(field, parts[j]);
  }

  return result;
}

function parseSequence(field, str) {
  const items = str.split(',');
  if (items.length > 1) {
    return {
      sequence: items.map(item => parseStep(field, item))
    };
  }
  return parseStep(field, str);
}

function parseStep(field, str) {
  const items = str.split('/');
  if (items.length > 1) {
    if (items.length > 2) {
      throw new Error(`Invalid step syntax in cron expression: ${str}`);
    }
    let range = parseRange(field, items[0]);
    // handle degenerate steps that have a single value instead of a range or wildcard
    if (typeof range === 'number') {
      range = {
        value: range
      };
    }
    return {
      ...range,
      step: parseNumber(field, items[1])
    };
  }
  return parseRange(field, str);
}

function parseRange(field, str) {
  const items = str.split('-');
  if (items.length > 1) {
    if (items.length > 2) {
      throw new Error(`Invalid range syntax in cron expression: ${str}`);
    }
    const min = parseScalar(field, items[0]);
    const max = parseScalar(field, items[1]);
    const minValue = scalarValue(min);
    const maxValue = scalarValue(max);
    if (minValue > maxValue) {
      throw new Error(`Invalid range values (${minValue}-${maxValue}) in cron expression: ${str}`);
    }
    return {
      min,
      max
    };
  }
  return parseScalarOrWild(field, str);
}

function parseScalarOrWild(field, str) {
  if (str === '*' || str === '?') {
    const { range: [min, max] } = field;
    return {
      wild: str,
      min,
      max
    };
  }
  return parseScalar(field, str);
}

function parseScalar(field, str) {
  const { aliases } = field;
  if (aliases) {
    const value = aliases[str.toLowerCase()];
    if (value !== undefined) {
      return {
        alias: str,
        value
      };
    }
  }
  const value = parseNumber(field, str);
  const { range: [min, max] } = field;
  if (value < min) {
    throw new Error(`Expected minimim value ${min} for ${field.name} field of cron expression but got ${value}`);
  }
  if (value > max) {
    throw new Error(`Expected minimim value ${max} for ${field.name} field of cron expression but got ${value}`);
  }
  return value;
}

function parseNumber(field, str) {
  if (!/^\d\d?$/.test(str)) {
    throw new Error(`One or two digit integer expected in ${field.name} field of cron expression: ${str}`);
  }
  return parseInt(str, 10);
}

function scalarValue(value) {
  // handle aliases
  return typeof value === 'number' ? value : value.value;
}

module.exports = parseCron;
