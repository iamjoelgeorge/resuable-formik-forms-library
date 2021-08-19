import React, { useState } from 'react';
import { ErrorMessage, Field } from 'formik';
import Calendar from 'react-calendar';

import styles from './DatePicker.module.scss';
import SlidingLabel from '../SlidingLabel/SlidingLabel';

const DatePicker = (props) => {
  const { name, formik, ...rest } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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

              <div className={styles.selectedDateContainer}>
                {/* <label htmlFor={'selectedDate'}>Departure Date</label> */}
                <SlidingLabel
                  label={'Departure Date'}
                  inputEntered={!!value.toString()}
                  htmlFor={'selectedDate'}
                  showErrorStyle={false}
                />
                <p id='selectedDate' className={styles.selectedDate} onClick={toggleCalendar}>
                  {value.toString()}
                </p>
              </div>
            </div>
          );
        }}
      </Field>
      <ErrorMessage name={name} component='p' />
    </div>
  );
};

export default DatePicker;
