const fields = [
  {
    id: 'seconds',
    name: 'seconds',
    range: [0, 59]
  },
  {
    id: 'minutes',
    name: 'minutes',
    range: [0, 59]
  },
  {
    id: 'hours',
    name: 'hours',
    range: [0, 23]
  },
  {
    id: 'daysOfMonth',
    name: 'days of month',
    range: [1, 31]
  },
  {
    id: 'months',
    name: 'months',
    range: [1, 12],
    aliases: {
      jan: 1,
      feb: 2,
      mar: 3,
      apr: 4,
      may: 5,
      jun: 6,
      jul: 7,
      aug: 8,
      sep: 9,
      oct: 10,
      nov: 11,
      dec: 12
    }
  },
  {
    id: 'daysOfWeek',
    name: 'days of week',
    range: [0, 7],
    canonicalRange: [0, 6],
    aliases: {
      sun: 0,
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6
    }
  }
];

module.exports = fields;
