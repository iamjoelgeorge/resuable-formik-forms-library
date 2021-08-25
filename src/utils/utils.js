import { months } from './constants';

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
