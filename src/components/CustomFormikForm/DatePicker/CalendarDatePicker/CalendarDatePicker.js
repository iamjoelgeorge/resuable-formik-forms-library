import React, { useLayoutEffect, useRef, useState } from 'react';

import Calendar from 'react-calendar';
import { Field } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './CalendarDatePicker.module.scss';
import SlidingLabel from '../../SlidingLabel/SlidingLabel';
import { joinClassNames } from '../../../../utils/utils';
import { ArrowNext } from '../../../../constants/icons';

const CalendarDatePicker = (props) => {
  const { name, label, formik, ...rest } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dateFormat = 'ddd, D MMM YYYY';
  const calendarRef = useRef();

  const dropdownIconClasses = !isCalendarOpen
    ? styles.dropdownIcon
    : joinClassNames([styles.dropdownIcon, styles.rotateDropdownIcon]);

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
    <div id='custom-calendar-date-picker' className={styles.container} ref={calendarRef}>
      <Field name={name} {...rest}>
        {({ form, field }) => {
          const { value } = field;
          const { setFieldValue } = form;

          return (
            <div>
              {isCalendarOpen && (
                <div className={styles.calendarContainer}>
                  {renderCalendar(value, setFieldValue)}
                </div>
              )}

              <button
                type='button'
                className={styles.selectedDateContainer}
                onClick={toggleCalendar}
              >
                <SlidingLabel
                  label={label}
                  inputEntered={!!value.toString()}
                  htmlFor={'selectedDate'}
                  showErrorStyle={false}
                />
                <p id='selectedDate' className={styles.selectedDate}>
                  {moment(value).format(dateFormat)}
                  <span className={dropdownIconClasses}>
                    <img src={ArrowNext} alt='Dropdown icon' />
                  </span>
                </p>
              </button>
            </div>
          );
        }}
      </Field>
    </div>
  );
};

CalendarDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  rest: PropTypes.object,
};

export default CalendarDatePicker;
