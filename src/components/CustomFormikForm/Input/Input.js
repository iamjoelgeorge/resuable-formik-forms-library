import React from 'react';

import { Field } from 'formik';

import styles from './Input.module.scss';
import { joinClassNames } from '../../../utils/utils';
import ToolTipIcon from '../../../assets/images/help.svg';
import ErrorText from '../ErrorText/ErrorText';
import SlidingLabel from '../SlidingLabel/SlidingLabel';

const Input = (props) => {
  const { label, name, placeholder, formik, showTooltip = false, ...rest } = props;
  const { values } = formik;
  const inputValue = values[name];

  const userHasVisitedTheInputField = formik.touched[name];
  const inputFieldHasErrors = formik.errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const fieldClasses = addErrorClassesToLabelAndInput
    ? joinClassNames([styles.input, styles.inputError])
    : [styles.input];

  return (
    <div className={styles.container}>
      <div className={styles.inputWithTooltipContainer}>
        <Field className={fieldClasses} name={name} id={name} placeholder={placeholder} {...rest} />

        {label && (
          <SlidingLabel
            label={label}
            inputEntered={!!inputValue}
            htmlFor={name}
            showErrorStyle={addErrorClassesToLabelAndInput}
          />
        )}

        {showTooltip && (
          <span className={styles.toolTip}>
            <img src={ToolTipIcon} alt='help icon' />
          </span>
        )}
      </div>
      <div className={styles.errorMessageContainer}>
        <ErrorText fieldName={name} />
      </div>
    </div>
  );
};

export default Input;
