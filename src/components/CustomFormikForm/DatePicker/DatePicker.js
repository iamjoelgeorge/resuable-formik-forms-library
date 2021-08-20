import React, { useState, useRef } from 'react';

import { Field } from 'formik';
import Calendar from 'react-calendar';
import moment from 'moment';

import styles from './DatePicker.module.scss';
import SlidingLabel from '../SlidingLabel/SlidingLabel';
import { useLayoutEffect } from 'react';

const DatePicker = (props) => {
  const { name, formik, ...rest } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef();
  const dateFormat = 'ddd, D MMM YYYY';

  useLayoutEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    const calendarNode = calendarRef.current;
    const clickedNode = e.target;

    if (calendarNode?.contains(clickedNode)) return;
    setIsCalendarOpen(false);
  };

  const handleFocus = () => {
    setIsCalendarOpen(true);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen((prevState) => !prevState);
  };

  const renderCalendar = (value, setFieldValue) => (
    <Calendar
      className={styles.calendarContainer}
      showNeighboringMonth={false}
      minDate={new Date()}
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
              {isCalendarOpen && (
                <div ref={calendarRef}>{renderCalendar(value, setFieldValue)}</div>
              )}

              <div
                tabIndex='0'
                className={styles.selectedDateContainer}
                onMouseDown={toggleCalendar}
                onFocus={handleFocus}
              >
                <SlidingLabel
                  label={'Departure Date'}
                  inputEntered={!!value.toString()}
                  htmlFor={'selectedDate'}
                  showErrorStyle={false}
                />
                <p id='selectedDate' className={styles.selectedDate}>
                  {moment(value).format(dateFormat)}
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
