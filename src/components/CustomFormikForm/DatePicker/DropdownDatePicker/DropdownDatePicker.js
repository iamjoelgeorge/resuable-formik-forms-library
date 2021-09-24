import React, { useState, useEffect } from 'react';

import { Field } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './DropdownDatePicker.module.scss';
import { months as defaultMonths } from '../../../../constants/constants';
import {
  getSmartMonths,
  getArrayOfYearsBetweenTwoYearsAsObjectsWithADisabledProperty,
  getFullDate,
  getNumOfDaysInAMonth,
  getSmartDayNumbers,
  joinClassNames,
} from '../../../../utils/utils';
import AdditionalInfo from '../../AdditionalInfo/AdditionalInfo';
import DateDropdown from './DateDropdown/DateDropdown';
import ErrorText from '../../ErrorText/ErrorText';
import SlidingLabel from '../../SlidingLabel/SlidingLabel';

const DropdownDatePicker = (props) => {
  const {
    name,
    label,
    formik,
    minDate,
    maxDate,
    maxDaysInThePast,
    maxDaysInTheFuture,
    containerClass: customContainerClass,
    labelTooltipBoxHeading,
    labelTooltipBoxDescription,
    labelTooltipBoxDescriptionElement,
    tooltipLink,
    tooltipLinkText,
    helpLinkText,
    helpLink,
    optionalText,
    isDisabled = false,
    isRequired,
    ...rest
  } = props;

  const { errors, values } = formik;

  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [datesInAMonthArray, setDatesInAMonthArray] = useState([]);

  const [dateObj, setDateObj] = useState({
    date: '',
    month: '',
    year: '',
  });

  const containerClasses = joinClassNames([styles.container, customContainerClass]);

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

  const minDayNumber = startDate.getDate();
  const maxDayNumber = endDate.getDate();
  const minMonthIndex = startDate.getMonth();
  const maxMonthIndex = endDate.getMonth();
  const selectedMonthIndex = defaultMonths.findIndex((month) => month.name === dateObj.month);
  const selectedYear = dateObj?.year;

  const dateFormat = 'D MMM YYYY';
  const initialDate = values[name] ? values[name] : new Date();
  const formattedDate = moment(initialDate).format(dateFormat);

  const userHasVisitedTheInputField = formik.touched[name];
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
    const selectedDayNumber = parseInt(dateObj.date);

    if (type.toLowerCase() === 'month' || type.toLowerCase() === 'year') {
      const numOfDaysInSelectedMonth =
        type.toLowerCase() === 'month'
          ? getNumOfDaysInAMonth(item.name, dateObj.year)
          : getNumOfDaysInAMonth(dateObj.month, item.name);

      if (selectedDayNumber > numOfDaysInSelectedMonth) {
        setDateObj({
          ...dateObj,
          [type]: item.name,
          date: 1,
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
    const { setFieldValue } = formik;
    const { date, month, year } = dateObj;

    const dateString = `${date} ${month}, ${year}`;
    const selectedDate = date && month && year ? moment(dateString).format(dateFormat) : '';

    if (!!selectedDate && !(selectedDate === formattedDate)) {
      const date = getFinalDateToSetTheField(selectedDate);

      setFieldValue(name, date);
    }

    if (date && month && year && values[name] === null) {
      const date = getFinalDateToSetTheField(selectedDate);

      setFieldValue(name, date);
    }
  }, [dateObj, formik, name, formattedDate, values]);

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
    <div className={containerClasses}>
      <SlidingLabel
        label={label}
        inputEntered
        htmlFor={'selectedDate'}
        customClass={labelClasses}
        showErrorStyle={addErrorClassesToLabelAndInput}
        tooltipBoxHeading={labelTooltipBoxHeading}
        tooltipBoxDescription={labelTooltipBoxDescription}
        tooltipBoxDescriptionElement={labelTooltipBoxDescriptionElement}
        inputIsRequired={isRequired}
      />

      <Field name={name} {...rest}>
        {({ form, field }) => {
          const { date, month, year } = dateObj;

          return (
            <div className={styles.dateContainer}>
              <div className={styles.date}>
                <DateDropdown
                  value={date}
                  dropdownArray={datesInAMonthArray}
                  onClick={handleDropdownItemClick}
                  type='date'
                  isDisabled={isDisabled}
                />
              </div>
              <div className={styles.month}>
                <DateDropdown
                  value={month}
                  dropdownArray={months}
                  onClick={handleDropdownItemClick}
                  type='month'
                  isDisabled={isDisabled}
                />
              </div>
              <div className={styles.year}>
                <DateDropdown
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

      {errors[name] && formik.touched[name] && (
        <ErrorText containerClass={styles.errorContainer} fieldName={name} />
      )}

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
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  formik: PropTypes.shape({}),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  maxDaysInThePast: PropTypes.number,
  maxDaysInTheFuture: PropTypes.number,
  containerClass: PropTypes.string,
  labelTooltipBoxHeading: PropTypes.string,
  labelTooltipBoxDescription: PropTypes.string,
  labelTooltipBoxDescriptionElement: PropTypes.element,
  tooltipLink: PropTypes.string,
  tooltipLinkText: PropTypes.string,
  helpLinkText: PropTypes.string,
  helpLink: PropTypes.string,
  optionalText: PropTypes.string,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
};

DropdownDatePicker.defaultProps = {
  label: '',
  formik: {},
  minDate: null,
  maxDate: new Date(),
  maxDaysInThePast: null,
  maxDaysInTheFuture: null,
  labelTooltipBoxHeading: '',
  containerClass: '',
  labelTooltipBoxDescription: '',
  labelTooltipBoxDescriptionElement: null,
  tooltipLink: '',
  tooltipLinkText: '',
  helpLinkText: '',
  helpLink: '',
  optionalText: '',
  isDisabled: false,
  isRequired: false,
};

export default DropdownDatePicker;
