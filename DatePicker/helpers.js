export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const shortMonths = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12"
};

export const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
export const classList = (...classes) =>
  classes.filter(item => !!item).join(" ");

export const getDaysOfMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const dateFormats = {
  "mm/dd/yyyy": {
    regex: /^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/,
    separator: "/"
  },
  "dd/mm/yyyy": {
    regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
    separator: "/"
  },
  "dd-mm-yyyy": {
    regex: /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/,
    separator: "-"
  },
  "yyyy-mm-dd": {
    regex: /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/,
    separator: "-"
  }
};

export const formatDate = (date, format, separator) => {
  // const separator = dateFormats[format].separator;
  const splitDateArray = date;
  const splitFormat = format.split(separator);
  let formattedDate = "";
  splitFormat.forEach((value, index) => {
    if (value.includes("m")) {
      formattedDate = formattedDate + shortMonths[splitDateArray[1]];
    } else if (value.includes("d")) {
      formattedDate = formattedDate + splitDateArray[2];
    } else {
      formattedDate = formattedDate + splitDateArray[3];
    }
    index !== splitFormat.length - 1 && (formattedDate += separator);
  });
  return formattedDate;
};

export const ISOFormat = (date, format, separator) => {
  // const separator = dateFormats[format].separator;
  const splitDateArray = date.toString().split(separator);
  const splitFormat = format.split(separator);
  const day = splitDateArray[splitFormat.findIndex(item => item.includes("d"))];
  const month =
    splitDateArray[splitFormat.findIndex(item => item.includes("m"))];
  const year =
    splitDateArray[splitFormat.findIndex(item => item.includes("y"))];
  return `${year}${separator}${month}${separator}${day}`;
};

export const checkIfDateObject = date => {
  if (date && typeof date.getMonth === "function") {
    date.setHours(0, 0, 0, 0);
    return date;
  }
  return false;
};

// console.log(ISOFormat('31/12/2020', 'dd/mm/yyyy'))
// console.log(ISOFormat('31-12-2020', 'dd-mm-yyyy'))
// console.log(ISOFormat('12/31/2020', 'mm/dd/yyyy'))
// console.log(ISOFormat('2020-12-31', 'yyyy-mm-dd'))

// formatDate(new Date('2020-12-15').toString().split(' '), 'yyyy-mm-dd')
// formatDate(new Date('12/27/2025').toString().split(' '))
