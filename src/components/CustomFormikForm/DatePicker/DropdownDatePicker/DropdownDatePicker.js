import React, { useState, useEffect } from 'react';

import { Field, useFormikContext } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './DropdownDatePicker.module.scss';
import {
  commonProps,
  commonPropTypes,
  months as defaultMonths,
} from '../../../../constants/constants';
import {
  getSmartMonths,
  getArrayOfYearsBetweenTwoYearsAsObjectsWithADisabledProperty,
  getFullDate,
  getNumOfDaysInAMonth,
  getSmartDayNumbers,
  joinClassNames,
  prependZeroToDayNumber,
} from '../../../../utils/utils';
import AdditionalInfo from '../../AdditionalInfo/AdditionalInfo';
import DateDropdown from './DateDropdown/DateDropdown';
import ErrorText from '../../ErrorText/ErrorText';
import SlidingLabel from '../../SlidingLabel/SlidingLabel';

const DropdownDatePicker = (props) => {
  const {
    name,
    label,
    minDate,
    maxDate,
    maxDaysInThePast,
    maxDaysInTheFuture,
    containerClass: customContainerClass,
    mainLabelTooltipBoxHeading,
    mainLabelTooltipBoxDescription,
    mainLabelTooltipBoxDescriptionElement,
    tooltipLink,
    tooltipLinkText,
    helpLinkText,
    helpLink,
    optionalText,
    isDisabled,
    isRequired,
    ...rest
  } = props;

  const { errors, setFieldValue, touched, values } = useFormikContext();

  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [datesInAMonthArray, setDatesInAMonthArray] = useState([]);

  const [dateObj, setDateObj] = useState({
    date: '',
    month: '',
    year: '',
  });

  const labelClasses = isDisabled
    ? joinClassNames([styles.label, styles.disabledLabel])
    : styles.label;

  const today = new Date();
  const startDate = maxDaysInThePast
    ? getFullDate(today, maxDaysInThePast, false)
    : minDate
    ? new Date(minDate)
    : new Date((today.getFullYear() - 100).toString());

  const endDate = maxDaysInTheFuture
    ? getFullDate(today, maxDaysInTheFuture)
    : maxDate
    ? new Date(maxDate)
    : today;

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const MAX_NUM_OF_YEARS = endYear - startYear;

  const minDayNumber = prependZeroToDayNumber(startDate.getDate());
  const maxDayNumber = prependZeroToDayNumber(endDate.getDate());
  const minMonthIndex = startDate.getMonth();
  const maxMonthIndex = endDate.getMonth();
  const selectedMonthIndex = defaultMonths.findIndex((month) => month.name === dateObj.month);
  const selectedYear = dateObj?.year;

  const dateFormat = 'DD MMM YYYY';
  const initialDate = values[name] ? values[name] : new Date();
  const formattedDate = moment(initialDate).format(dateFormat);

  const userHasVisitedTheInputField = touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const getDateObj = (formattedDate) => {
    const dateArray = formattedDate.split(' ');

    const date = dateArray[0];
    const month = dateArray[1];
    const year = dateArray[2];

    return {
      date,
      month,
      year,
    };
  };

  const handleDropdownItemClick = (item, type) => {
    const selectedDayNumber = parseInt(dateObj.date, 10);

    if (type.toLowerCase() === 'month' || type.toLowerCase() === 'year') {
      const numOfDaysInSelectedMonth =
        type.toLowerCase() === 'month'
          ? getNumOfDaysInAMonth(item.name, dateObj.year)
          : getNumOfDaysInAMonth(dateObj.month, item.name);

      if (selectedDayNumber > numOfDaysInSelectedMonth) {
        setDateObj({
          ...dateObj,
          [type]: item.name,
          date: '01',
        });
      } else {
        setDateObj({
          ...dateObj,
          [type]: item.name,
        });
      }
    } else {
      setDateObj({
        ...dateObj,
        [type]: item.name,
      });
    }
  };

  // Set the value for the dateObj.
  useEffect(() => {
    const initialDateObj = getDateObj(formattedDate);
    setDateObj(initialDateObj);
  }, [name, formattedDate]);

  // Set the array values for years, months, and dates.
  useEffect(() => {
    const yearsArray = getArrayOfYearsBetweenTwoYearsAsObjectsWithADisabledProperty(
      startYear,
      MAX_NUM_OF_YEARS,
    );
    const monthsArray = getSmartMonths(
      selectedYear,
      startYear,
      endYear,
      minMonthIndex,
      maxMonthIndex,
    );
    const datesInAMonthArray = getSmartDayNumbers(
      dateObj.month,
      dateObj.year,
      selectedYear,
      startYear,
      endYear,
      selectedMonthIndex,
      minMonthIndex,
      maxMonthIndex,
      minDayNumber,
      maxDayNumber,
    );

    setDatesInAMonthArray(datesInAMonthArray);
    setMonths(monthsArray);
    setYears(yearsArray);
  }, [
    dateObj.month,
    dateObj.year,
    selectedYear,
    startYear,
    endYear,
    selectedMonthIndex,
    minMonthIndex,
    maxMonthIndex,
    minDayNumber,
    maxDayNumber,
    MAX_NUM_OF_YEARS,
  ]);

  const getFinalDateToSetTheField = (selectedDate) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const time = `${hours}:${minutes}:${seconds}`;
    const date = new Date(`${selectedDate} ${time}`);

    return date;
  };

  // Set the final value (selected date) of the component.
  useEffect(() => {
    const { date, month, year } = dateObj;

    const dateString = `${date} ${month}, ${year}`;
    const selectedDate =
      date && month && year ? moment(new Date(dateString)).format(dateFormat) : '';

    if (!!selectedDate && !(selectedDate === formattedDate)) {
      const date = getFinalDateToSetTheField(selectedDate);

      setFieldValue(name, date);
    }

    if (date && month && year && values[name] === null) {
      const date = getFinalDateToSetTheField(selectedDate);

      setFieldValue(name, date);
    }
  }, [dateObj, setFieldValue, name, formattedDate, values]);

  // Reset the selected value if it is out of the specified range.
  useEffect(() => {
    const selectedYear = dateObj.year;
    const selectedDayNumber = dateObj.date;

    const selectedDateIsLessThanOrEqualToMinDate =
      selectedYear &&
      selectedYear <= startYear &&
      selectedMonthIndex <= minMonthIndex &&
      datesInAMonthArray[selectedDayNumber - 1]?.isDisabled;

    const selectedDateIsGreaterThanOrEqualToMaxDate =
      selectedYear &&
      selectedYear >= endYear &&
      selectedMonthIndex >= maxMonthIndex &&
      datesInAMonthArray[selectedDayNumber]?.isDisabled;

    if (selectedDateIsLessThanOrEqualToMinDate) {
      setDateObj((prevState) => ({
        ...prevState,
        date: minDayNumber,
        month: months[minMonthIndex]?.name,
        year: startYear,
      }));
    } else if (selectedDateIsGreaterThanOrEqualToMaxDate) {
      setDateObj((prevState) => ({
        ...prevState,
        date: maxDayNumber,
        month: months[maxMonthIndex]?.name,
        year: endYear,
      }));
    }
  }, [
    dateObj.year,
    dateObj.month,
    dateObj.date,
    minDayNumber,
    minMonthIndex,
    maxDayNumber,
    maxMonthIndex,
    selectedMonthIndex,
    startYear,
    endYear,
    months,
    datesInAMonthArray,
  ]);

  return (
    <div className={joinClassNames([styles.container, customContainerClass])}>
      <SlidingLabel
        label={label}
        inputEntered
        htmlFor='selectedDate'
        customClass={labelClasses}
        showErrorStyle={addErrorClassesToLabelAndInput}
        tooltipBoxHeading={mainLabelTooltipBoxHeading}
        tooltipBoxDescription={mainLabelTooltipBoxDescription}
        tooltipBoxDescriptionElement={mainLabelTooltipBoxDescriptionElement}
        inputIsRequired={isRequired}
      />

      <Field name={name} {...rest}>
        {() => {
          const { date, month, year } = dateObj;

          return (
            <div data-testid={`${name}-dropdown-datepicker`} className={styles.dateContainer}>
              <div className={styles.date}>
                <DateDropdown
                  data-testid={`${name}-date-dropdown`}
                  value={date}
                  dropdownArray={datesInAMonthArray}
                  onClick={handleDropdownItemClick}
                  type='date'
                  isDisabled={isDisabled}
                />
              </div>
              <div className={styles.month}>
                <DateDropdown
                  data-testid={`${name}-month-dropdown`}
                  value={month}
                  dropdownArray={months}
                  onClick={handleDropdownItemClick}
                  type='month'
                  isDisabled={isDisabled}
                />
              </div>
              <div className={styles.year}>
                <DateDropdown
                  data-testid={`${name}-year-dropdown`}
                  value={year}
                  dropdownArray={years}
                  onClick={handleDropdownItemClick}
                  type='year'
                  isDisabled={isDisabled}
                />
              </div>
            </div>
          );
        }}
      </Field>

      <ErrorText containerClass={styles.errorContainer} fieldName={name} />

      <AdditionalInfo
        optionalText={optionalText}
        helpLinkText={helpLinkText}
        helpLink={helpLink}
        tooltipLinkText={tooltipLinkText}
        tooltipLink={tooltipLink}
      />
    </div>
  );
};

DropdownDatePicker.propTypes = {
  ...commonPropTypes,
  label: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  maxDaysInThePast: PropTypes.number,
  maxDaysInTheFuture: PropTypes.number,
};

DropdownDatePicker.defaultProps = {
  ...commonProps,
  label: '',
  minDate: null,
  maxDate: new Date(),
  maxDaysInThePast: null,
  maxDaysInTheFuture: null,
};

export default DropdownDatePicker;
