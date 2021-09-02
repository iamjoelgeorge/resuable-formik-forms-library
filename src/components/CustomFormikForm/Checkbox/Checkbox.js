/* eslint-disable */
import React, { useState } from 'react';

import { Field } from 'formik';
import PropTypes from 'prop-types';

import styles from './Checkbox.module.scss';
import { joinClassNames } from '../../../utils/utils';

const Checkbox = (props) => {
  const { name, label, formik, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const presentationalCheckboxClasses = isFocused
    ? joinClassNames([styles.presentationalCheckbox, styles.focused])
    : styles.presentationalCheckbox;

  return (
    <div className={styles.container}>
      <label>
        <Field
          className={styles.checkboxInput}
          type='checkbox'
          name={name}
          {...rest}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span className={presentationalCheckboxClasses}>
          <span className={styles.checkboxChecked} />
        </span>
        {label && <span className={styles.labelSpanElement}>{label}</span>}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default Checkbox;
