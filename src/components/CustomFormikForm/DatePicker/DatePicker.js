import React from 'react';
import PropTypes from 'prop-types';

import CalendarDatePicker from './CalendarDatePicker/CalendarDatePicker';
import DropdownDatePicker from './DropdownDatePicker/DropdownDatePicker';

const DatePicker = (props) => {
  const { dropdown = false } = props;

  return <div>{dropdown ? <DropdownDatePicker /> : <CalendarDatePicker {...props} />}</div>;
};

DatePicker.propTypes = {
  dropdown: PropTypes.bool,
};

export default DatePicker;
