import React, { useLayoutEffect, useRef, useState } from 'react';

import Calendar from 'react-calendar';
import { Field } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './CalendarDatePicker.module.scss';
import SlidingLabel from '../../SlidingLabel/SlidingLabel';
import { joinClassNames } from '../../../../utils/utils';
import { ArrowNext } from '../../../../constants/icons';
import AdditionalInfo from '../../AdditionalInfo/AdditionalInfo';
import ErrorText from '../../ErrorText/ErrorText';

const CalendarDatePicker = (props) => {
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
    isDisabled,
    isRequired,
    ...rest
  } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dateFormat = 'ddd, D MMM YYYY';
  const calendarRef = useRef();

  const { errors } = formik;

  const userHasVisitedTheInputField = formik.touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

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
                disabled={isDisabled}
              >
                <SlidingLabel
                  label={label}
                  inputEntered={!!value?.toString() ?? value}
                  htmlFor={'selectedDate'}
                  showErrorStyle={addErrorClassesToLabelAndInput}
                  tooltipBoxHeading={labelTooltipBoxHeading}
                  tooltipBoxDescription={labelTooltipBoxDescription}
                  tooltipBoxDescriptionElement={labelTooltipBoxDescriptionElement}
                  inputIsRequired={isRequired}
                />
                <p id='selectedDate' className={styles.selectedDate}>
                  {value !== null && value !== '' && moment(value).format(dateFormat)}
                  <span className={dropdownIconClasses}>
                    <img src={ArrowNext} alt='Dropdown icon' />
                  </span>
                </p>
              </button>
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

CalendarDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  formik: PropTypes.shape({}),
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

CalendarDatePicker.defaultProps = {
  label: PropTypes.string,
  placeholder: '',
  formik: {},
  containerClass: '',
  labelTooltipBoxHeading: '',
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

export default CalendarDatePicker;
