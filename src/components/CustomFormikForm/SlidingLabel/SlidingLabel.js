import React from 'react';

import PropTypes from 'prop-types';

import styles from './SlidingLabel.module.scss';
import { joinClassNames } from '../../../utils/utils';

const SlidingLabel = (props) => {
  const { label, inputEntered = false, htmlFor, showErrorStyle, ...rest } = props;

  const labelDefaultClasses = inputEntered
    ? joinClassNames([styles.label, styles.slideLabel])
    : styles.label;

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
  rest: PropTypes.object,
};

export default SlidingLabel;