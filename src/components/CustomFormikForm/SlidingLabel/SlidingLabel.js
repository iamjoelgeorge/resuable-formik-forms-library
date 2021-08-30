import React from 'react';

import PropTypes from 'prop-types';

import styles from './SlidingLabel.module.scss';
import { joinClassNames } from '../../../utils/utils';

const SlidingLabel = (props) => {
  const {
    label,
    inputEntered = false,
    htmlFor,
    showErrorStyle,
    customClass,
    inputIsRequired = false,
    ...rest
  } = props;

  const isRequiredStyle = inputIsRequired ? styles.inputIsRequired : '';

  const labelDefaultClasses = inputEntered
    ? joinClassNames([styles.label, isRequiredStyle, customClass, styles.slideLabel])
    : joinClassNames([styles.label, isRequiredStyle, customClass]);

  const labelClasses = showErrorStyle
    ? joinClassNames([labelDefaultClasses, styles.labelError])
    : labelDefaultClasses;

  return (
    <label className={labelClasses} htmlFor={htmlFor} {...rest}>
      {label}
    </label>
  );
};

SlidingLabel.propTypes = {
  label: PropTypes.string.isRequired,
  inputEntered: PropTypes.bool.isRequired,
  htmlFor: PropTypes.string.isRequired,
  showErrorStyle: PropTypes.bool.isRequired,
  customClass: PropTypes.string,
  inputIsRequired: PropTypes.bool,
  rest: PropTypes.object,
};

export default SlidingLabel;
