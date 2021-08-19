import React, { useState } from 'react';
import { ErrorMessage, Field } from 'formik';
import Calendar from 'react-calendar';

import styles from './DatePicker.module.scss';

const DatePicker = (props) => {
  const { name, formik, ...rest } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarOpen((prevState) => !prevState);
  };

  const renderCalendar = (value, setFieldValue) => (
    <Calendar
      className={styles.calendarContainer}
      activeStartDate={new Date()}
      value={value}
      onChange={(val) => {
        setFieldValue(name, val);
        toggleCalendar();
      }}
    />
  );

  return (
    <div>
      <Field name={name} {...rest}>
        {({ form, field }) => {
          const { value } = field;
          const { setFieldValue } = form;

          return (
            <div className={styles.container}>
              <p onClick={toggleCalendar}>{value.toString()}</p>
              {isCalendarOpen && renderCalendar(value, setFieldValue)}
            </div>
          );
        }}
      </Field>
      <ErrorMessage name={name} component='p' />
    </div>
  );
};

export default DatePicker;
