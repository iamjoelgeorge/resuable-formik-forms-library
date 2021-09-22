import React, { useRef } from 'react';

import Calendar from 'react-calendar';
import { Field } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './CalendarDatePicker.module.scss';
import { getDate, joinClassNames } from '../../../../utils/utils';
import { ArrowNext } from '../../../../constants/icons';
import { useToggleDropdown } from '../../../../hooks/useToggleDropdown';
import AdditionalInfo from '../../AdditionalInfo/AdditionalInfo';
import ErrorText from '../../ErrorText/ErrorText';
import SlidingLabel from '../../SlidingLabel/SlidingLabel';

const CalendarDatePicker = (props) => {
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
    isDisabled,
    isRequired,
    ...rest
  } = props;

  const { errors } = formik;

  const calendarRef = useRef();
  const [isCalendarOpen, setIsCalendarOpen, toggleCalendar] = useToggleDropdown(calendarRef);
  const dateFormat = 'ddd, D MMM YYYY';

  const today = new Date();
  const startDate = maxDaysInThePast ? getDate(today, maxDaysInThePast, false) : minDate;
  const endDate = maxDaysInTheFuture ? getDate(today, maxDaysInTheFuture) : maxDate;

  const userHasVisitedTheInputField = formik.touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const containerClasses = joinClassNames([styles.container, customContainerClass]);

  const dropdownIconClasses = !isCalendarOpen
    ? styles.dropdownIcon
    : joinClassNames([styles.dropdownIcon, styles.rotateDropdownIcon]);

  const renderCalendar = (value, setFieldValue) => (
    <Calendar
      showNeighboringMonth={false}
      minDate={startDate}
      maxDate={endDate}
      value={value}
      onChange={(val) => {
        setFieldValue(name, val);
        toggleCalendar();
      }}
    />
  );

  return (
    <div id='custom-calendar-date-picker' className={containerClasses} ref={calendarRef}>
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
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  maxDaysInThePast: PropTypes.number,
  maxDaysInTheFuture: PropTypes.number,
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

CalendarDatePicker.defaultProps = {
  label: '',
  formik: {},
  minDate: null,
  maxDate: new Date('31 Dec 5000'),
  maxDaysInThePast: null,
  maxDaysInTheFuture: null,
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
