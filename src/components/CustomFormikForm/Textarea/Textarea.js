/* eslint-disable */
import { ErrorMessage, Field } from 'formik';
import React from 'react';

import styles from './Textarea.module.scss';

const Textarea = (props) => {
  const { name, label, ...rest } = props;

  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <Field as='textarea' name={name} {...rest} />
      <ErrorMessage name={name} component='p' />
    </div>
  );
};

export default Textarea;
