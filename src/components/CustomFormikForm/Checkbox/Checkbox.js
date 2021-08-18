/* eslint-disable */
import { Field } from 'formik';
import React from 'react';

const Checkbox = (props) => {
  const { name, label, ...rest } = props;

  return (
    <div>
      <Field type='checkbox' name={name} id={name} {...rest} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Checkbox;
