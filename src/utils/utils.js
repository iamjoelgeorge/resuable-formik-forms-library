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
    (item) => item.trim().toLowerCase() === month?.trim().toLowerCase(),
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
    yearsArray.push(i);
  }

  return yearsArray.reverse();
};
