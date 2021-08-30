/* eslint-disable */
import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { Field } from 'formik';

import styles from './Textarea.module.scss';
import { joinClassNames } from '../../../utils/utils';
import SlidingLabel from '../SlidingLabel/SlidingLabel';

const Textarea = (props) => {
  const { name, label, formik, ...rest } = props;
  const [labelView, showLabelView] = useState(false);
  const textareaRef = useRef();

  const { values } = formik;
  const inputValue = values[name];

  const placeholderButtonClasses = joinClassNames([styles.textarea, styles.placeholderButton]);

  const handleBlurOnField = () => {
    if (inputValue) showLabelView(true);
  };

  const handleClick = () => {
    showLabelView(false);

    setTimeout(() => {
      textareaRef?.current?.focus();
    }, 0);
  };

  const renderFieldView = () =>
    labelView && inputValue ? (
      <button className={placeholderButtonClasses} tabIndex='0' onClick={handleClick}>
        {inputValue}
      </button>
    ) : (
      <Field
        innerRef={textareaRef}
        className={styles.textarea}
        as='textarea'
        name={name}
        onBlur={handleBlurOnField}
        {...rest}
      />
    );

  return (
    <div className={styles.container}>
      <div className={styles.fieldContainer}>
        {renderFieldView()}
        {label && (
          <SlidingLabel
            label={label}
            htmlFor={name}
            inputEntered={!!inputValue}
            showErrorStyle={false}
            customClass={styles.label}
          />
        )}
      </div>
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  formik: PropTypes.object,
};

export default Textarea;
