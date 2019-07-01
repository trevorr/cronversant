const { parseCron, formatCron } = require('../src');
const expressions = require('./expressions');
const chai = require('chai');
const expect = chai.expect;

describe('parseCron/formatCron round-trip', () => {
  it('supports seconds', () => {
    const options = { withSeconds: true };
    let cron = roundtrip('0 * * * * *', options);
    expect(cron.seconds).to.equal(0);
    cron = roundtrip('*/15 * * * * *', options);
    expect(cron.seconds.wild).to.equal('*');
    expect(cron.seconds.step).to.equal(15);
  });
  it('preserves spaces in commands', () => {
    roundtrip('@reboot a\t  b');
    roundtrip('* * * * * a\t  b');
  });
  it('round-trips real-world expressions', () => {
    for (const [expr] of expressions) {
      roundtrip(expr);
    }
  });
});

function roundtrip(expr, options) {
  const cron = parseCron(expr, options);
  const str = formatCron(cron, options);
  expect(str).to.equal(expr);
  return cron;
}
