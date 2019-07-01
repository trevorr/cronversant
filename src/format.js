const fields = require('./fields');

function formatCron(cron, options = {}) {
  const { withCommand = true, withMacros = true, withSeconds = false } = options;
  let result;
  if (cron.macro && (withMacros || cron.macro === 'reboot')) {
    result = `@${cron.macro}`;
  } else {
    result = (withSeconds ? fields : fields.slice(1)).map(field => formatSequence(cron[field.id] || field.range[0], options)).join(' ');
  }
  if (cron.command && withCommand) {
    result += ' ' + cron.command;
  }
  return result;
}

function formatSequence(value, options) {
  const { sequence } = value;
  return sequence != null ? sequence.map(v => formatStep(v, options)).join(',') : formatStep(value, options);
}

function formatStep(value, options) {
  const { step } = value;
  return step != null ? `${formatRange(value, options)}/${step}` : formatRange(value, options);
}

function formatRange(value, options) {
  const { wild, min, max } = value;
  if (wild != null) {
    return wild;
  }
  return min != null ? `${formatScalar(min, options)}-${formatScalar(max, options)}` : formatScalar(value, options);
}

function formatScalar(value, options) {
  const { alias } = value;
  if (alias && options.withAliases !== false) {
    return alias;
  }
  const { values } = value;
  if (values) {
    return values.join(',');
  }
  const scalar = value.value;
  if (scalar != null) {
    return scalar.toString();
  }
  return value.toString();
}

module.exports = formatCron;
