const { parseCron, formatCron } = require('../src');
const chai = require('chai');
const expect = chai.expect;

describe('formatCron', () => {
  it('supports disabling macros', () => {
    const options = { withMacros: false };
    roundtrip('@hourly', '0 * * * *', options);
    roundtrip('@yearly', '0 0 1 1 *', options);
    roundtrip('@reboot', '@reboot', options);
  });
  it('supports disabling aliases', () => {
    const options = { withAliases: false };
    roundtrip('* * * * MON-FRI', '* * * * 1-5', options);
    roundtrip('* * * MAR-OCT/3 *', '* * * 3-10/3 *', options);
  });
});

function roundtrip(expr, expected, options) {
  const cron = parseCron(expr);
  const str = formatCron(cron, options);
  expect(str).to.equal(expected);
  return cron;
}
