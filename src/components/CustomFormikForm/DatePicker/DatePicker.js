import React, { useState, useRef, useLayoutEffect } from 'react';

import { Field } from 'formik';
import Calendar from 'react-calendar';
import moment from 'moment';

import styles from './DatePicker.module.scss';
import SlidingLabel from '../SlidingLabel/SlidingLabel';

const DatePicker = (props) => {
  const { name, formik, ...rest } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef();
  const dateFormat = 'ddd, D MMM YYYY';

  useLayoutEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);

  const handleClickOutside = (e) => {
    const calendarNode = calendarRef.current;
    const clickedNode = e.target;

    if (calendarNode?.contains(clickedNode)) return;
    setIsCalendarOpen(false);
  };

  const handleEscKeyPress = (e) => {
    if (e.keyCode === 27) {
      setIsCalendarOpen(false);
    }
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
    <div className={styles.container} ref={calendarRef}>
      <Field name={name} {...rest}>
        {({ form, field }) => {
          const { value } = field;
          const { setFieldValue } = form;

          return (
            <div>
              {isCalendarOpen && <div>{renderCalendar(value, setFieldValue)}</div>}

              <button className={styles.selectedDateContainer} onClick={toggleCalendar}>
                <SlidingLabel
                  label={'Departure Date'}
                  inputEntered={!!value.toString()}
                  htmlFor={'selectedDate'}
                  showErrorStyle={false}
                />
                <p id='selectedDate' className={styles.selectedDate}>
                  {moment(value).format(dateFormat)}
                </p>
              </button>
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default DatePicker;
