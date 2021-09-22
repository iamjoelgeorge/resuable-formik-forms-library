import React, { useState, useEffect } from 'react';

import { Field } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './DropdownDatePicker.module.scss';
import { months } from '../../../../constants/constants';
import {
  getArrayOfYearsBetweenTwoYears,
  getDate,
  getNumOfDaysInAMonth,
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
    ? getDate(today, maxDaysInThePast, false)
    : minDate
    ? new Date(minDate)
    : new Date((today.getFullYear() - 100).toString());

  const endDate = maxDaysInTheFuture
    ? getDate(today, maxDaysInTheFuture)
    : maxDate
    ? new Date(maxDate)
    : today;

  // console.log('today:', today);
  // console.log('maxDate:', maxDate);

  // console.log('start: ', startDate);
  // console.log('end', endDate);

  // console.log('----------------');

  // const startYear = minYear
  //   ? new Date(minYear.toString()).getFullYear()
  //   : new Date().getFullYear() - 100;
  // const endYear = maxYear ? new Date(maxYear.toString()).getFullYear() : new Date().getFullYear();
  // const MAX_NUM_OF_YEARS = endYear - startYear;

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const MAX_NUM_OF_YEARS = endYear - startYear;

  const dateFormat = 'D MMM YYYY';
  const initialDate = values[name] ? values[name] : new Date();
  const formattedDate = moment(initialDate).format(dateFormat);

  let yearsArray = getArrayOfYearsBetweenTwoYears(startYear, MAX_NUM_OF_YEARS);
  let numOfDays = getNumOfDaysInAMonth(dateObj.month, dateObj.year);
  let datesInAMonthArray = [
    ...Array.from({ length: numOfDays }, (_, i) => {
      const minDayDate = startDate.getDate();
      const minYear = startDate.getFullYear();
      const minMonthIndex = startDate.getMonth();
      console.log(months[minMonthIndex].name.toLowerCase());

      const currentMonthIndex = months.findIndex((month) => month.name === dateObj.month);
      console.log(currentMonthIndex);

      // console.log(dateObj);
      let isDisabled = false;

      if (currentMonthIndex < minMonthIndex) {
        isDisabled = true;
      } else if (currentMonthIndex === minMonthIndex) {
        if (i + 1 < minDayDate) {
          isDisabled = true;
        }
      }
      return { name: i + 1, isDisabled: isDisabled };
    }),
  ];

  const userHasVisitedTheInputField = formik.touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  useEffect(() => {
    const initialDateObj = getDateObj(formattedDate);
    setDateObj(initialDateObj);
  }, [name, formattedDate]);

  useEffect(() => {
    const { setFieldValue } = formik;
    const { date, month, year } = dateObj;

    const dateString = `${date} ${month}, ${year}`;
    const selectedDate = date && month && year ? moment(dateString).format(dateFormat) : '';

    if (!!selectedDate && !(selectedDate === formattedDate)) {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const time = `${hours}:${minutes}:${seconds}`;
      const date = new Date(`${selectedDate} ${time}`);

      setFieldValue(name, date);
    }
  }, [dateObj, formik, name, formattedDate]);

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
    const selectedDate = parseInt(dateObj.date);

    if (type.toLowerCase() === 'month' || type.toLowerCase() === 'year') {
      const numOfDaysInSelectedMonth =
        type.toLowerCase() === 'month'
          ? getNumOfDaysInAMonth(item.name, dateObj.year)
          : getNumOfDaysInAMonth(dateObj.month, item.name);

      if (selectedDate > numOfDaysInSelectedMonth) {
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
                  disableFormik
                />
              </div>
              <div className={styles.month}>
                <DateDropdown
                  value={month}
                  dropdownArray={months}
                  onClick={handleDropdownItemClick}
                  type='month'
                  isDisabled={isDisabled}
                  disableFormik
                />
              </div>
              <div className={styles.year}>
                <DateDropdown
                  value={year}
                  dropdownArray={yearsArray}
                  onClick={handleDropdownItemClick}
                  type='year'
                  isDisabled={isDisabled}
                  disableFormik
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
