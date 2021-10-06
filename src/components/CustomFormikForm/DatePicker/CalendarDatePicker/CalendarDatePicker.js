import React, { useRef } from 'react';

import Calendar from 'react-calendar';
import { Field, useFormikContext } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './CalendarDatePicker.module.scss';
import { commonProps, commonPropTypes } from '../../../../constants/constants';
import { getFullDate, joinClassNames } from '../../../../utils/utils';
import { ArrowNext } from '../../../../constants/icons';
import { useToggleDropdown } from '../../../../hooks/useToggleDropdown';
import AdditionalInfo from '../../AdditionalInfo/AdditionalInfo';
import ErrorText from '../../ErrorText/ErrorText';
import SlidingLabel from '../../SlidingLabel/SlidingLabel';
import DropdownIcon from '../../Checkbox/DropdownIcon/DropdownIcon';

const CalendarDatePicker = (props) => {
  const {
    name,
    label,
    minDate,
    maxDate,
    maxDaysInThePast,
    maxDaysInTheFuture,
    containerClass: customContainerClass,
    mainLabelTooltipBoxHeading,
    mainLabelTooltipBoxDescription,
    mainLabelTooltipBoxDescriptionElement,
    tooltipLink,
    tooltipLinkText,
    helpLinkText,
    helpLink,
    optionalText,
    isDisabled,
    isRequired,
    ...rest
  } = props;

  const { errors, touched } = useFormikContext();

  const calendarRef = useRef();
  const [isCalendarOpen, setIsCalendarOpen, toggleCalendar] = useToggleDropdown(calendarRef);
  const dateFormat = 'ddd, D MMM YYYY';

  const today = new Date();
  const startDate = maxDaysInThePast ? getFullDate(today, maxDaysInThePast, false) : minDate;
  const endDate = maxDaysInTheFuture ? getFullDate(today, maxDaysInTheFuture) : maxDate;

  const userHasVisitedTheInputField = touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

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
    <div
      data-testid={`${name}-calendar-datepicker`}
      id='custom-calendar-date-picker'
      className={joinClassNames([styles.container, customContainerClass])}
      ref={calendarRef}
    >
      <Field name={name} {...rest}>
        {({ form, field }) => {
          const { value } = field;
          const { setFieldValue } = form;

          return (
            <div>
              {isCalendarOpen && (
                <div data-testid={`${name}-calendar`} className={styles.calendarContainer}>
                  {renderCalendar(value, setFieldValue)}
                </div>
              )}

              <button
                data-testid={`${name}-calendar-toggle-button`}
                type='button'
                className={styles.selectedDateContainer}
                onClick={toggleCalendar}
                disabled={isDisabled}
              >
                <SlidingLabel
                  label={label}
                  inputEntered={!!value?.toString() ?? value}
                  inputIsDisabled={isDisabled}
                  htmlFor={`${name}-selectedDate`}
                  showErrorStyle={addErrorClassesToLabelAndInput}
                  tooltipBoxHeading={mainLabelTooltipBoxHeading}
                  tooltipBoxDescription={mainLabelTooltipBoxDescription}
                  tooltipBoxDescriptionElement={mainLabelTooltipBoxDescriptionElement}
                  inputIsRequired={isRequired}
                />
                <p
                  data-testid={`${name}-selectedDate`}
                  id={`${name}-selectedDate`}
                  className={styles.selectedDate}
                >
                  {value !== null && value !== '' && moment(value).format(dateFormat)}
                  <DropdownIcon isOpen={isCalendarOpen} isDisabled={isDisabled} />
                </p>
              </button>
            </div>
          );
        }}
      </Field>

      <ErrorText containerClass={styles.errorContainer} fieldName={name} />

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
  ...commonPropTypes,
  label: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  maxDaysInThePast: PropTypes.number,
  maxDaysInTheFuture: PropTypes.number,
};

CalendarDatePicker.defaultProps = {
  ...commonProps,
  label: '',
  minDate: null,
  maxDate: new Date('31 Dec 5000'),
  maxDaysInThePast: null,
  maxDaysInTheFuture: null,
};

export default CalendarDatePicker;
