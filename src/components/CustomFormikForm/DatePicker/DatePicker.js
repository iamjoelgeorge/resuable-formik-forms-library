import React from 'react';
import PropTypes from 'prop-types';

import CalendarDatePicker from './CalendarDatePicker/CalendarDatePicker';
import DropdownDatePicker from './DropdownDatePicker/DropdownDatePicker';
import { commonProps, commonPropTypes } from '../../../constants/constants';

const DatePicker = (props) => {
  const { isDropdown } = props;

  return (
    <div>{isDropdown ? <DropdownDatePicker {...props} /> : <CalendarDatePicker {...props} />}</div>
  );
};

CalendarDatePicker.propTypes = {
  ...commonPropTypes,
  label: PropTypes.string,
  isDropdown: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  maxDaysInThePast: PropTypes.number,
  maxDaysInTheFuture: PropTypes.number,
};

CalendarDatePicker.defaultProps = {
  ...commonProps,
  label: '',
  isDropdown: false,
  minDate: null,
  maxDate: new Date('31 Dec 5000'),
  maxDaysInThePast: null,
  maxDaysInTheFuture: null,
};

export default DatePicker;
