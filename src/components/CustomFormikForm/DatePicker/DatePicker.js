import React from 'react';
import PropTypes from 'prop-types';

import CalendarDatePicker from './CalendarDatePicker/CalendarDatePicker';
import DropdownDatePicker from './DropdownDatePicker/DropdownDatePicker';

const DatePicker = (props) => {
  const { isDropdown } = props;

  return (
    <div>{isDropdown ? <DropdownDatePicker {...props} /> : <CalendarDatePicker {...props} />}</div>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  formik: PropTypes.shape({}),
  isDropdown: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  maxDaysInThePast: PropTypes.number,
  maxDaysInTheFuture: PropTypes.number,
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

DatePicker.defaultProps = {
  label: '',
  formik: {},
  isDropdown: false,
  minDate: null,
  maxDate: new Date('31 Dec 5000'),
  maxDaysInThePast: null,
  maxDaysInTheFuture: null,
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

export default DatePicker;
