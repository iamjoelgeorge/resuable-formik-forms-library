import React from 'react';

import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

import styles from './ErrorText.module.scss';
import { joinClassNames } from '../../../utils/utils';

const ErrorText = (props) => {
  const { fieldName, containerClass: customContainerClass, ...rest } = props;

  const containerClasses = joinClassNames([styles.errorMessage, customContainerClass]);

  return (
    <p className={containerClasses} {...rest}>
      <ErrorMessage name={fieldName} />
    </p>
  );
};

ErrorText.propTypes = {
  fieldName: PropTypes.string.isRequired,
  containerClass: PropTypes.string,
};

export default ErrorText;
