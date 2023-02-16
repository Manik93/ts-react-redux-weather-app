const dayInAWeek: number = new Date().getDay();
const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

//suspend exec
export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });

export const dayOfTheWeek = () => {
  return weekDays[dayInAWeek - 1].toLocaleUpperCase();
};

export const weekDaysFromCurrent = () => {
  return weekDays
    .slice(dayInAWeek, weekDays.length)
    .concat(weekDays.slice(0, dayInAWeek));
};

export const formattedDate = (format: string) => {
  let formattedDate: string = '';
  const date = new Date();
  const year: string = date.getFullYear().toString();

  const monthShort = [
    'Jan.',
    'Feb.',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];

  let month: number = date.getMonth();
  let day: any = date.getDate();

  if (day < 10) {
    day = '0' + day;
  }

  switch (format) {
    case 'en':
      formattedDate = monthShort[month] + ' ' + day + ' ' + year;
      break;
    case 'ru':
      formattedDate = day + ' ' + monthShort[month] + ', ' + year;
      break;
    //
    default:
      formattedDate = day + ' ' + monthShort[month] + ', ' + year;
      break;
  }

  return formattedDate;
};
