import React from 'react';

import PropTypes from 'prop-types';
import { ErrorMessage, useFormikContext } from 'formik';

import styles from './ErrorText.module.scss';
import { joinClassNames } from '../../../utils/utils';

const ErrorText = (props) => {
  const { fieldName, containerClass: customContainerClass, ...rest } = props;
  const { errors } = useFormikContext();

  const containerClasses = joinClassNames([styles.errorMessage, customContainerClass]);

  const renderErrorComponent = () => {
    // [To Do]: This code must be optimized to be more generic
    if (errors[fieldName]) {
      return errors[fieldName].value ? (
        <ErrorMessage name={fieldName}>
          {(error) => (
            <p data-testid={`error-${fieldName}`} className={containerClasses} {...rest}>
              {error.value}
            </p>
          )}
        </ErrorMessage>
      ) : (
        <ErrorMessage
          name={fieldName}
          data-testid={`error-${fieldName}`}
          className={containerClasses}
          {...rest}
          component='p'
        />
      );
    }
    return null;
  };

  return <>{renderErrorComponent()}</>;
};

ErrorText.propTypes = {
  fieldName: PropTypes.string.isRequired,
  containerClass: PropTypes.string,
};

ErrorText.defaultProps = {
  containerClass: '',
};

export default ErrorText;
