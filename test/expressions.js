module.exports = [
  ['@yearly'],
  ['@annually'],
  ['@monthly'],
  ['@weekly'],
  ['@daily'],
  ['@midnight'],
  ['@hourly'],
  ['@reboot'],
  ['* * * * *'],
  ['* */6 * * *'],
  ['* 12 * * 6'],
  ['*/1 * * * *', '* * * * *'],
  ['*/10 * * * *'],
  ['*/10 13-14 * * *', '*/10 13,14 * * *'],
  ['*/10 13-23 * * 1-5'],
  ['*/10 7-14 * * 1-4'],
  ['*/12 * * * *'],
  ['*/15 * * * *'],
  ['*/15 11-23 * * 1-5'],
  ['*/15 5-10 * * 1-4'],
  ['*/15 7-14 * * 1-4'],
  ['*/17 * * * *'],
  ['*/2 * * * *'],
  ['*/2 * * * 1-6'],
  ['*/2 4-23 * * 1-6'],
  ['*/20 * * * *'],
  ['*/20 5-10 * * 1-4'],
  ['*/20 5-10 * * 1-6'],
  ['*/25 5-9 * * 1-4'],
  ['*/3 * * * *'],
  ['*/30 * * * *'],
  ['*/30 * * * 1-5'],
  ['*/31 * * * *'],
  ['*/5 * * * *'],
  ['*/5 * * * 1-5'],
  ['*/7 * * * *'],
  ['*/8 * * * *'],
  ['0 * * * *'],
  ['0 * * * 0,6', '0 * * * */6'],
  ['0 * * * 1-5'],
  ['0 * * * 6'],
  ['0 */2 * * *'],
  ['0 */4 * * *'],
  ['0 */6 * * 2'],
  ['0 0 * * *'],
  ['0 0 * * 1,4'],
  ['0 0 * * 6'],
  ['0 1 * * *'],
  ['0 1,5,9,13,17,21 * * *', '0 1-21/4 * * *'],
  ['0 10 * * *'],
  ['0 10 * * 1-5'],
  ['0 10 * * 5'],
  ['0 10 1 * *'],
  ['0 10 1,15 * *'],
  ['0 11 * * *'],
  ['0 11 * * 1-5'],
  ['0 11 * * 1'],
  ['0 11 1 * *'],
  ['0 12 * * *'],
  ['0 12 * * 1-5'],
  ['0 12 * * SAT'],
  ['0 13 * * *'],
  ['0 13 * * 1,4'],
  ['0 13 * * MON-FRI'],
  ['0 14 * * 1-5'],
  ['0 14 * * 4'],
  ['0 14,15,16,17,18,19,20 * * *', '0 14-20 * * *'],
  ['0 16 * * *'],
  ['0 16 * * 1-5'],
  ['0 16-21 * * *'],
  ['0 2 * * *'],
  ['0 2 * * 1-5'],
  ['0 2-12 * * 1-5'],
  ['0 22 * * *'],
  ['0 22 * * 0-4'],
  ['0 23 * * *'],
  ['0 3 * * *'],
  ['0 3 * * 1-5'],
  ['0 4 * * *'],
  ['0 4 * * 5'],
  ['0 4 * * 6'],
  ['0 5 * * *'],
  ['0 5,17 * * *'],
  ['0 6 * * *'],
  ['0 6 * * 1-4'],
  ['0 7 * * 1-5'],
  ['0 7 * * 1'],
  ['0 8 * * *'],
  ['0 8,14,17,20,23,3 * * *', '0 3,8,14-23/3 * * *'],
  ['0 9 * * 0'],
  ['0 9 * * MON'],
  ['0 9 1 * *'],
  ['0 9 1 */3 *'],
  ['0 9,12,17 * * 1-5'],
  ['0,30 * * * *', '*/30 * * * *'],
  ['0,30 * * * 1-5', '*/30 * * * 1-5'],
  ['0,5,10,15,20,25,30,35,40,45,50,55 * * * *', '*/5 * * * *'],
  ['0/15 * * * 1-5', '0 * * * 1-5'],
  ['0/15 13-22 * * 1-5', '0 13-22 * * 1-5'],
  ['1 * * * *'],
  ['1 * * * 1,2,3,4,5', '1 * * * 1-5'],
  ['1 1,5,9,13,17,21 * * *', '1 1-21/4 * * *'],
  ['1 7 * * 1-5'],
  ['1 9 * * 1-6'],
  ['1-59/2 * * * *'],
  ['1-59/5 * * * *', '1-56/5 * * * *'],
  ['1,11,21,31,41,51 * * * *', '1-51/10 * * * *'],
  ['1/20 13-23 * * 1-5', '1 13-23 * * 1-5'],
  ['10 * * * *'],
  ['10 10 * * 3,6'],
  ['10 14 * * *'],
  ['10 14 * * 0'],
  ['10 14 * * 1-6'],
  ['10 2 * * *'],
  ['10 4 * * TUE,THU', '10 4 * * 2,4'],
  ['10,40 13-23 * * 1-5'],
  ['11 1/6 * * *', '11 1 * * *'],
  ['11 3 * * *'],
  ['11 3,9,12,15,18,21 * * 1-7', '11 3,9-21/3 * * *'],
  ['12 * * * *'],
  ['12 6,18 * * *'],
  ['12,24,36,48 * * * *', '12-48/12 * * * *'],
  ['13 9 * * 1-5'],
  ['14 * * * *'],
  ['14 10 * * 6'],
  ['14 12 * * 1-5'],
  ['15 * * * *'],
  ['15 * * * 1,2,3,4', '15 * * * 1-4'],
  ['15 */2 * * 1-5'],
  ['15 */4 * * 1-5'],
  ['15 1 * * 1-5'],
  ['15 11 * * *'],
  ['15 11-23 * * 1-5'],
  ['15 12 * * 1-5'],
  ['15 13 * * MON-FRI'],
  ['15 13-22 * * 1-5'],
  ['15 13-23 * * 1-5'],
  ['15 15 * * 1'],
  ['15 20 * * 3'],
  ['15 21 * * 1-5'],
  ['15 7 1 * *'],
  ['15,30,45 4-11 * * 1-4', '15-45/15 4-11 * * 1-4'],
  ['15,35,55 * * * *', '15-55/20 * * * *'],
  ['16 13 * * 1-5'],
  ['16 15 * * 1-5'],
  ['16 16 * * *'],
  ['16 17 * * *'],
  ['17 * * * *'],
  ['17 */8 * * *'],
  ['17 1 * * *'],
  ['17 2 * * 1-5'],
  ['17 3 * * 1-7', '17 3 * * *'],
  ['17 7 * * 1-5'],
  ['17,47 * * * *'],
  ['18 * * * *'],
  ['18 1 * * *'],
  ['18 13-23 * * 1-5'],
  ['19 */8 * * *'],
  ['19 4 * * 1-5'],
  ['2 1,5,9,13,17,21 * * *', '2 1-21/4 * * *'],
  ['2 2 * * 1-5'],
  ['2-59/10 * * * *', '2-52/10 * * * *'],
  ['2,12,22,32,42,52 * * * *', '2-52/10 * * * *'],
  ['2,17,32,47 * * * *', '2-47/15 * * * *'],
  ['20 0-4,10-23/1 * * *', '20 0-4,10-23 * * *'],
  ['20 13-23 * * 1-5'],
  ['20 5 * * 6'],
  ['21 * * * 1,2,3,4,5', '21 * * * 1-5'],
  ['21 8 * * 2-5'],
  ['23 * * * *'],
  ['23 */4 * * *'],
  ['23 12 * * 1,2,3,4,5', '23 12 * * 1-5'],
  ['23 14 * * *'],
  ['23 14 * * 1,2,3,4,5', '23 14 * * 1-5'],
  ['23 6 * * *'],
  ['24 * * * *'],
  ['25 * * * *'],
  ['25 0-5 * * 0-4'],
  ['25,55 * * * *'],
  ['27 * * * *'],
  ['27 10 * * 1-7', '27 10 * * *'],
  ['27 10 1 * *'],
  ['27 3 * * 1-7', '27 3 * * *'],
  ['27 4-9 * * 1-5'],
  ['28 * * * 1,2,3,4,5', '28 * * * 1-5'],
  ['3 * * * 1-5'],
  ['3 */4 * * *'],
  ['3 1,5,9,13,17,21 * * *', '3 1-21/4 * * *'],
  ['3 7 * * *'],
  ['3 8 * * 1-5'],
  ['3-59/10 * * * *', '3-53/10 * * * *'],
  ['3-59/5 * * * *', '3-58/5 * * * *'],
  ['3,13,23,33,43,53 * * * *', '3-53/10 * * * *'],
  ['30 * * * 1,2,3,4,5', '30 * * * 1-5'],
  ['30 */2 * * *'],
  ['30 */6 * * *'],
  ['30 10 * * *'],
  ['30 14 * * 6'],
  ['30 6 * * 1-4'],
  ['30 7 * * 1-4'],
  ['30 9-14 * * 1-5'],
  ['31 1,5,9,13,17,21 * * *', '31 1-21/4 * * *'],
  ['31 10 * * 1-5'],
  ['32 16 * * 2,3,4', '32 16 * * 2-4'],
  ['35 * * * *'],
  ['35 13-18/5 * * MON-FRI', '35 13,18 * * MON-FRI'],
  ['36 13 * * 1,2,3,4,5', '36 13 * * 1-5'],
  ['37 22 * * 1-5'],
  ['38 * * * *'],
  ['4 12,17 * * 1-5'],
  ['4-59/3 * * * *', '4-58/3 * * * *'],
  ['4,14,24,34,44,54 * * * 1-5', '4-54/10 * * * 1-5'],
  ['4,34 9,10,11,14 * * *', '4,34 9-11,14 * * *'],
  ['41 * * * *'],
  ['42 * * * *'],
  ['42 18 * * *'],
  ['42 7,11,13,15,17,19,23 * * *', '42 7,11-19/2,23 * * *'],
  ['43 * * * *'],
  ['45 * * * *'],
  ['45 */5 * * *'],
  ['45 15 * * 3'],
  ['46 * * * *'],
  ['47 * * * *'],
  ['47 */2 * * *'],
  ['47 0 * * *'],
  ['47 1-23/2 * * *'],
  ['47 14 * * 1,2,3,4,5', '47 14 * * 1-5'],
  ['47 23 * * 1-6'],
  ['47 3 * * 1-7', '47 3 * * *'],
  ['47 7 * * 2-5'],
  ['48 * * * *'],
  ['49 * * * *'],
  ['49 13,14,15,16,17,18,19,20,21,22,23,0 * * 1,2,3,4,5', '49 0,13-23 * * 1-5'],
  ['5 * * * *'],
  ['5 10 * * 1'],
  ['5 11 * * *'],
  ['5-59/10 * * * *', '5-55/10 * * * *'],
  ['5-59/15 * * * *', '5-50/15 * * * *'],
  ['5,15,25,35,45,55 * * * *', '5-55/10 * * * *'],
  ['50 12 * * 3,5'],
  ['50 23 * * *'],
  ['50 3 * * *'],
  ['51 8 * * 1-5'],
  ['53 * * * *'],
  ['54,1,7,20,33,42 * * * *', '1,7-33/13,42,54 * * * *'],
  ['55 12 * * 1-5'],
  ['55 13-22 * * 1-5'],
  ['55 14 * * *'],
  ['55 9,21 * * *'],
  ['58 23 * * *'],
  ['59 23 * * *'],
  ['6 11 * * 1,2,3,4,5', '6 11 * * 1-5'],
  ['6 2 * * *'],
  ['6-59/10 * * * *', '6-56/10 * * * *'],
  ['7 * * * *'],
  ['7 10 * * 1-7', '7 10 * * *'],
  ['7 14 * * 1,2,3,4,5', '7 14 * * 1-5'],
  ['7 21 * * 1-6'],
  ['7 3,9,12,15,18,21 * * 1-7', '7 3,9-21/3 * * *'],
  ['7 4 * * 1-7', '7 4 * * *'],
  ['7 5 * * 1-7', '7 5 * * *'],
  ['7 6 * * 1-7', '7 6 * * *'],
  ['7 7 * * 1-7', '7 7 * * *'],
  ['7 8 * * 1-7', '7 8 * * *'],
  ['7 9 * * 1-7', '7 9 * * *'],
  ['7-59/10 * * * *', '7-57/10 * * * *'],
  ['7,37 * * * *'],
  ['9 2 * * 1-5'],
  ['9,19,29,39,49,59 * * * *', '9-59/10 * * * *'],
  ['9,24,39,54 * * * *', '9-54/15 * * * *'],
  ['9,39 * * * 2,3,4', '9,39 * * * 2-4'],
];
