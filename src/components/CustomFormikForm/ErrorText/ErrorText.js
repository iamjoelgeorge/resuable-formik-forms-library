import React from 'react';

import { ErrorMessage } from 'formik';
import styles from './ErrorText.module.scss';

const ErrorText = (props) => {
  const { fieldName, ...rest } = props;

  return (
    <p className={styles.errorMessage} {...rest}>
      <ErrorMessage name={fieldName} />
    </p>
  );
};

export default ErrorText;
