import { months } from '../constants/constants';

/**
 * Joins an array of classnames with a space
 *
 * @param {Array} classesArray
 * Array of classnames (e.g. [classOne, classTwo])
 */
export const joinClassNames = (classesArray) => classesArray.join(' ');

/**
 *
 * @param {string} month The first three letters of the month (e.g. Jan)
 * @param {number} year A year (e.g. 2021)
 * @returns the number of days in a month for valid inputs, else -1.
 */
export const getNumOfDaysInAMonth = (month, year) => {
  let numOfDays;
  let monthNumber;

  if (!month) return -1;

  const index = months.findIndex(
    (item) => item.name.trim().toLowerCase() === month?.trim().toLowerCase(),
  );

  if (index < 0) {
    return -1;
  }

  monthNumber = index + 1;

  numOfDays = new Date(year, monthNumber, 0).getDate();
  return numOfDays;
};

/**
 *
 * @param {number} minYear The year to start from (e.g. 2021).
 * @param {number} numOfYears Number of years from the minYear (e.g. 10 would return an array of years between 2021 and 2031).
 * @returns An array of years starting from minYear.
 */
export const getArrayOfYearsBetweenTwoYears = (minYear, numOfYears = 10) => {
  let yearsArray = [];
  const maxYear = minYear + numOfYears;

  for (let i = minYear; i <= maxYear; i++) {
    yearsArray.push({ name: i, isDisabled: false });
  }

  return yearsArray.reverse();
};

/**
 *
 * @param {Date} fromDate The year to start from (e.g. 2021).
 * @param {Number} numOfDays Number of days to move through (e.g. 50).
 * @param {Boolean} inTheFuture Indicates whether to move forwards or backwards
 * @returns A date in the future or in the past.
 */
export const getDate = (fromDate, numOfDays, inTheFuture = true) => {
  const newDate = new Date(fromDate);

  if (inTheFuture) {
    newDate.setDate(newDate.getDate() + numOfDays);
  } else {
    newDate.setDate(newDate.getDate() - numOfDays);
  }

  return new Date(newDate);
};
