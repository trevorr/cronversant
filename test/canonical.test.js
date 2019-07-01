const { parseCron, formatCron, canonicalCron } = require('../src');
const expressions = require('./expressions');
const chai = require('chai');
const expect = chai.expect;

describe('canonicalCron', () => {
  it('canonicalizes sequences to wildcard steps', () => {
    const { minutes } = canonicalize('0,5,10,15,20,25,30,35,40,45,50,55 * * * *', '*/5 * * * *');
    expect(minutes.wild).to.equal('*');
    expect(minutes.step).to.equal(5);
    expect(minutes.periods).to.equal(12);
    expect(minutes.regular).to.be.true;
  });
  it('canonicalizes sequences to non-wildcard steps', () => {
    const { minutes } = canonicalize('9,19,29,39,49,59 * * * *', '9-59/10 * * * *');
    expect(minutes.wild).to.be.undefined;
    expect(minutes.step).to.equal(10);
    expect(minutes.periods).to.equal(6);
    expect(minutes.regular).to.be.true;
  });
  it('canonicalizes subsequences to steps', () => {
    canonicalize('3,9,12,15,21 * * * *', '3,9-15/3,21 * * * *');
  });
  it('canonicalizes two-value steps to sequences', () => {
    canonicalize('35 13-18/5 * * MON-FRI', '35 13,18 * * MON-FRI');
  });
  it('canonicalizes single-value steps to single values', () => {
    canonicalize('0/15 * * * *', '0 * * * *');
  });
  it('canonicalizes day-of-week 7 to 0', () => {
    canonicalize('* * * * 0-7', '* * * * *');
    canonicalize('* * * * 1-7', '* * * * *');
    canonicalize('* * * * 4-7', '* * * * 0,4-6');
    const { daysOfWeek } = canonicalize('* * * * 4,7', '* * * * */4');
    expect(daysOfWeek.periods).to.equal(1.75);
    expect(daysOfWeek.regular).to.be.false;
  });
  it('canonicalizes real-world expressions', () => {
    for (const [expr, canonical = expr] of expressions) {
      const result = formatCron(canonicalCron(parseCron(expr)));
      expect(result).to.equal(canonical);
    }
  });
});

function canonicalize(expr, expected) {
  const cron = parseCron(expr);
  const canonical = canonicalCron(cron);
  const canonicalStr = formatCron(canonical);
  expect(canonicalStr).to.equal(expected);
  return canonical;
}
