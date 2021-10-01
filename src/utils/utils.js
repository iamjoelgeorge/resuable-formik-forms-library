import { months } from '../constants/constants';

/**
 * Joins an array of classnames with a space
 *
 * @param {Array} classesArray
 * Array of classnames (e.g. [classOne, classTwo])
 */
export const joinClassNames = (classesArray) => classesArray.join(' ');

/**
 * Use this function to replace any click handlers when the component is disabled
 */
export const functionThatDoesNothing = () => {};

/**
 *
 * @param {Date} fromDate The year to start from (e.g. 2021).
 * @param {Number} numOfDays Number of days to move through (e.g. 50).
 * @param {Boolean} inTheFuture Indicates whether to move forwards or backwards. This is true by default.
 * @returns
 * A date in the future or in the past.
 */
export const getFullDate = (fromDate, numOfDays, inTheFuture = true) => {
  const newDate = new Date(fromDate);

  if (inTheFuture) {
    newDate.setDate(newDate.getDate() + numOfDays);
  } else {
    newDate.setDate(newDate.getDate() - numOfDays);
  }

  return new Date(newDate);
};

/**
 *
 * @param {string} month The first three letters of the month (e.g. Jan)
 * @param {number} year A year (e.g. 2021)
 * @returns
 * The number of days in a month for valid inputs, else -1.
 */
export const getNumOfDaysInAMonth = (month, year) => {
  if (!month) return -1;

  const index = months.findIndex(
    (item) => item.name.trim().toLowerCase() === month?.trim().toLowerCase(),
  );

  if (index < 0) {
    return -1;
  }

  const monthNumber = index + 1;

  const numOfDays = new Date(year, monthNumber, 0).getDate();
  return numOfDays;
};

/**
 *
 * @param {Number} dayNumber Number denoting the number of the day in the month. (e.g. 2, which will be the second day of the month)
 * @returns
 * A number (of type String) that has 0 prepended to it if the input number is less than 10.
 */
export const prependZeroToDayNumber = (dayNumber) => {
  return ('0' + dayNumber).slice(-2);
};

/**
 *
 * @param {String} month The month for which to generate the dates.
 * @param {Number} year The year for which to generate the dates
 * @param {Number} selectedYear The year that has been selected
 * @param {Number} startYear The year to start from. (e.g. 2000)
 * @param {Number} endYear The year to end at. (e.g. 2021)
 * @param {Number} selectedMonthIndex The index of the selected month. Ranges from 0-11; 0 - Jan, 1 - Feb, and so on.
 * @param {Number} minMonthIndex The index of the month to start from. Ranges from 0-11; 0 - Jan, 1 - Feb, and so on.
 * @param {Number} maxMonthIndex The index of the month to end at. Ranges from 0-11; 0 - Jan, 1 - Feb, and so on.
 * @param {Number} minDayNumber The number of a particular day in the month to start from.
 * @param {Number} maxDayNumber The number of a particular day in the month to end at.
 * @returns
 * An array of dates (only the numbers of the days in the month) as objects with a disabled property.
 * It automatically disables the dates depending on the arguments provided.
 * (e.g. [{name: 1, isDisabled: false},{name: 2, isDisabled: false}, . . . ] )
 */
export const getSmartDayNumbers = (
  month,
  year,
  selectedYear,
  startYear,
  endYear,
  selectedMonthIndex,
  minMonthIndex,
  maxMonthIndex,
  minDayNumber,
  maxDayNumber,
) => {
  const numOfDays = getNumOfDaysInAMonth(month, year);

  const datesInAMonthArray = [
    ...Array.from({ length: numOfDays }, (_, index) => {
      let isDisabled = false;

      if (selectedYear && selectedYear <= startYear) {
        if (selectedMonthIndex < minMonthIndex) {
          isDisabled = true;
        } else if (selectedMonthIndex === minMonthIndex) {
          if (index + 1 < minDayNumber) {
            isDisabled = true;
          }
        }
      }

      if (selectedYear && selectedYear >= endYear) {
        if (selectedMonthIndex > maxMonthIndex) {
          isDisabled = true;
        } else if (selectedMonthIndex === maxMonthIndex) {
          if (index + 1 > maxDayNumber) {
            isDisabled = true;
          }
        }
      }

      const dayNumber = prependZeroToDayNumber(index + 1);

      return { name: dayNumber, isDisabled };
    }),
  ];

  return datesInAMonthArray;
};

/**
 *
 * @param {number} minYear The year to start from (e.g. 2021).
 * @param {number} numOfYears Number of years from the minYear (e.g. 10 would return an array of years between 2021 and 2031).
 * @returns
 * An array of years starting from minYear.
 */
export const getArrayOfYearsBetweenTwoYearsAsObjectsWithADisabledProperty = (
  minYear,
  numOfYears = 10,
) => {
  const yearsArray = [];
  const maxYear = minYear + numOfYears;

  // eslint-disable-next-line no-plusplus
  for (let i = minYear; i <= maxYear; i++) {
    yearsArray.push({ name: i, isDisabled: false });
  }

  return yearsArray.reverse();
};

/**
 *
 * @param {Number} selectedYear The selected year to compare with.
 * @param {Number} startYear The year to start from. (e.g. 2000)
 * @param {Number} endYear The year to end at. (e.g. 2021)
 * @param {Number} minMonthIndex The index of the month to start from. Ranges from 0-11; 0 - Jan, 1 - Feb, and so on.
 * @param {Number} maxMonthIndex The index of the month to end at. Ranges from 0-11; 0 - Jan, 1 - Feb, and so on.
 * @returns
 * An array of months as objects with a disabled property.
 * It automatically disables the months depending on the arguments provided.
 * (e.g. [{name: 'Jan, isDisabled: false},{name: 'Feb', isDisabled: false}, . . . ] )
 */
export const getSmartMonths = (selectedYear, startYear, endYear, minMonthIndex, maxMonthIndex) => {
  const updatedMonths = [...months];

  if (selectedYear && selectedYear <= startYear) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < months.length; i++) {
      if (i >= minMonthIndex) {
        updatedMonths[i] = { ...updatedMonths[i], isDisabled: false };
      } else {
        updatedMonths[i] = { ...updatedMonths[i], isDisabled: true };
      }
    }
  }

  if (selectedYear && selectedYear >= endYear) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < months.length; i++) {
      if (i <= maxMonthIndex) {
        updatedMonths[i] = { ...updatedMonths[i], isDisabled: false };
      } else {
        updatedMonths[i] = { ...updatedMonths[i], isDisabled: true };
      }
    }
  }

  return updatedMonths;
};
