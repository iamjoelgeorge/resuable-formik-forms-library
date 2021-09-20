import React, { useState, useEffect } from 'react';

import { Field } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './DropdownDatePicker.module.scss';
import { months } from '../../../../constants/constants';
import {
  getArrayOfYearsBetweenTwoYears,
  getNumOfDaysInAMonth,
  joinClassNames,
} from '../../../../utils/utils';
import Dropdown from '../../Dropdown/Dropdown';
import SlidingLabel from '../../SlidingLabel/SlidingLabel';
import AdditionalInfo from '../../AdditionalInfo/AdditionalInfo';
import ErrorText from '../../ErrorText/ErrorText';

const DropdownDatePicker = (props) => {
  const {
    name,
    label,
    formik,
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
  const [dateObj, setDateObj] = useState({
    date: '',
    month: '',
    year: '',
  });

  const { errors, values } = formik;

  const labelClasses = isDisabled
    ? joinClassNames([styles.label, styles.disabledLabel])
    : styles.label;

  const startYear = '1930';
  const MAX_NUM_OF_YEARS = new Date().getFullYear() - new Date(startYear).getFullYear();
  const dateFormat = 'D MMM YYYY';
  const initialDate = values[name] ? values[name] : new Date();
  const formattedDate = moment(initialDate).format(dateFormat);

  let yearsArray = getArrayOfYearsBetweenTwoYears(
    new Date(startYear).getFullYear(),
    MAX_NUM_OF_YEARS,
  );
  let numOfDays = getNumOfDaysInAMonth(dateObj.month, dateObj.year);
  let datesInAMonthArray = [...Array.from({ length: numOfDays }, (_, i) => i + 1)];

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

  const handleDropdownItemClick = (desc, type) => {
    const selectedDate = parseInt(dateObj.date);

    if (type.toLowerCase() === 'month' || type.toLowerCase() === 'year') {
      const numOfDaysInSelectedMonth =
        type.toLowerCase() === 'month'
          ? getNumOfDaysInAMonth(desc, dateObj.year)
          : getNumOfDaysInAMonth(dateObj.month, desc);

      if (selectedDate > numOfDaysInSelectedMonth) {
        setDateObj({
          ...dateObj,
          [type]: desc,
          date: 1,
        });
      } else {
        setDateObj({
          ...dateObj,
          [type]: desc,
        });
      }
    } else {
      setDateObj({
        ...dateObj,
        [type]: desc,
      });
    }
  };

  return (
    <div className={styles.container}>
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
                <Dropdown
                  value={date}
                  dropdownArray={datesInAMonthArray}
                  onClick={handleDropdownItemClick}
                  type='date'
                  isDisabled={isDisabled}
                  disableFormik
                />
              </div>
              <div className={styles.month}>
                <Dropdown
                  value={month}
                  dropdownArray={months}
                  onClick={handleDropdownItemClick}
                  type='month'
                  isDisabled={isDisabled}
                  disableFormik
                />
              </div>
              <div className={styles.year}>
                <Dropdown
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
  rest: PropTypes.string,
};

export default DropdownDatePicker;
