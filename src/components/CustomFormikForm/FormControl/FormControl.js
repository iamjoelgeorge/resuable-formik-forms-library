import React from 'react';

import PropTypes from 'prop-types';

import DatePicker from '../DatePicker/DatePicker';
import Checkbox from '../Checkbox/Checkbox';
import FileUploadInput from '../FileUploadInput/FileUploadInput';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';

const FormControl = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case 'input':
      return <Input {...rest} />;

    case 'textarea':
      return <Textarea {...rest} />;

    case 'checkbox':
      return <Checkbox {...rest} />;

    case 'datePicker':
      return <DatePicker {...rest} />;

    case 'file':
      return <FileUploadInput {...rest} />;

    default:
      return <Input {...rest} />;
  }
};

FormControl.propTypes = {
  control: PropTypes.string,
  rest: PropTypes.object,
};

export default FormControl;
