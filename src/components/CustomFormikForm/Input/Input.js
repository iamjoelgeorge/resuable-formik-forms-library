import React from 'react';

import PropTypes from 'prop-types';
import { Field } from 'formik';

import styles from './Input.module.scss';
import { joinClassNames } from '../../../utils/utils';
import ToolTipIcon from '../../../assets/images/help.svg';
import ErrorText from '../ErrorText/ErrorText';
import SlidingLabel from '../SlidingLabel/SlidingLabel';
import Link from '../Link/Link';

const Input = (props) => {
  const {
    label,
    name,
    placeholder,
    formik,
    containerClass: customContainerClass,
    showTooltipImage = false,
    tooltipLink,
    tooltipLinkText,
    helpLinkText,
    helpLink,
    isRequired,
    ...rest
  } = props;
  const { values, errors } = formik;
  const inputValue = values[name];

  const userHasVisitedTheInputField = formik.touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const containerClasses = joinClassNames([styles.container, customContainerClass]);

  const fieldClasses = addErrorClassesToLabelAndInput
    ? joinClassNames([styles.input, styles.inputError])
    : [styles.input];

  return (
    <div className={containerClasses}>
      <div className={styles.inputWithTooltipContainer}>
        <Field className={fieldClasses} name={name} id={name} placeholder={placeholder} {...rest} />

        {label && (
          <SlidingLabel
            label={label}
            inputEntered={!!inputValue}
            htmlFor={name}
            showErrorStyle={addErrorClassesToLabelAndInput}
            inputIsRequired={isRequired}
          />
        )}

        {showTooltipImage && (
          <span className={styles.toolTip}>
            <img src={ToolTipIcon} alt='help icon' />
          </span>
        )}
      </div>

      {errors[name] && (
        <div className={styles.errorContainer}>
          <ErrorText fieldName={name} />
        </div>
      )}

      {helpLinkText && <Link label={helpLinkText} link={helpLink} />}

      {tooltipLinkText && <Link label={tooltipLinkText} link={tooltipLink} isTooltip />}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  formik: PropTypes.object,
  containerClass: PropTypes.string,
  showTooltipImage: PropTypes.bool,
  tooltipLink: PropTypes.string,
  tooltipLinkText: PropTypes.string,
  helpLinkText: PropTypes.string,
  helpLink: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Input;
