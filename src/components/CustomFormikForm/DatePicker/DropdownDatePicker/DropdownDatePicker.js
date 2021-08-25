import React, { useState } from 'react';

import { Field } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './DropdownDatePicker.module.scss';
import { months } from '../../../../utils/constants';
import { useEffect } from 'react';
import Dropdown from '../../../Dropdown/Dropdown';
import { getNumOfDaysInAMonth } from '../../../../utils/utils';

const DropdownDatePicker = (props) => {
  const { name, label, formik, ...rest } = props;
  const [dateObj, setDateObj] = useState({
    date: '',
    month: '',
    year: '',
  });

  const MAX_NUM_OF_YEARS = 10;
  const dateFormat = 'D MMM YYYY';
  const initialDate = formik.values[name] ? formik.values[name] : new Date();
  const formattedDate = moment(initialDate).format(dateFormat);
  let datesInAMonthArray = [];

  const getYearsArray = (minYear, numOfYears = MAX_NUM_OF_YEARS) => {
    let yearsArray = [];
    const maxYear = minYear + numOfYears;

    for (let i = minYear; i <= maxYear; i++) {
      yearsArray.push(i);
    }

    return yearsArray;
  };

  let yearsArray = getYearsArray(new Date().getFullYear());
  let numOfDays = getNumOfDaysInAMonth(dateObj.month, dateObj.year);
  datesInAMonthArray = [...Array.from({ length: numOfDays }, (_, i) => i + 1)];

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
      const date = new Date(`${selectedDate} 11:00:01`);
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
      {label && <p className={styles.label}>{label}</p>}
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
                />
              </div>
              <div className={styles.month}>
                <Dropdown
                  value={month}
                  dropdownArray={months}
                  onClick={handleDropdownItemClick}
                  type='month'
                />
              </div>
              <div className={styles.year}>
                <Dropdown
                  value={year}
                  dropdownArray={yearsArray}
                  onClick={handleDropdownItemClick}
                  type='year'
                />
              </div>
            </div>
          );
        }}
      </Field>
    </div>
  );
};

DropdownDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rest: PropTypes.string,
};

export default DropdownDatePicker;
