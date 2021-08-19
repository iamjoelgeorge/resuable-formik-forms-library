import React, { useState } from 'react';

import { ErrorMessage, Field } from 'formik';
import Calendar from 'react-calendar';
import moment from 'moment';

import styles from './DatePicker.module.scss';
import SlidingLabel from '../SlidingLabel/SlidingLabel';
import ErrorText from '../../ErrorText/ErrorText';

const DatePicker = (props) => {
  const { name, formik, ...rest } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const momentFormat = 'ddd, D MMM YYYY';

  const toggleCalendar = () => {
    setIsCalendarOpen((prevState) => !prevState);
  };

  const renderCalendar = (value, setFieldValue) => (
    <Calendar
      className={styles.calendarContainer}
      // activeStartDate={new Date()}
      value={value}
      onChange={(val) => {
        setFieldValue(name, val);
        toggleCalendar();
      }}
    />
  );

  return (
    <div className={styles.container}>
      <Field name={name} {...rest}>
        {({ form, field }) => {
          const { value } = field;
          const { setFieldValue } = form;

          return (
            <div>
              {isCalendarOpen && renderCalendar(value, setFieldValue)}

              <div className={styles.selectedDateContainer} onClick={toggleCalendar}>
                <SlidingLabel
                  label={'Departure Date'}
                  inputEntered={!!value.toString()}
                  htmlFor={'selectedDate'}
                  showErrorStyle={false}
                />
                <p id='selectedDate' className={styles.selectedDate}>
                  {moment(value).format(momentFormat)}
                </p>
              </div>
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default DatePicker;
