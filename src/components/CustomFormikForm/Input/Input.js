import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { Field } from 'formik';

import styles from './Input.module.scss';
import { joinClassNames } from '../../../utils/utils';
import ErrorText from '../ErrorText/ErrorText';
import SlidingLabel from '../SlidingLabel/SlidingLabel';
import ToolTip from '../ToolTip/ToolTip';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';

const Input = (props) => {
  const {
    label,
    name,
    placeholder,
    formik,
    containerClass: customContainerClass,
    tooltipBoxHeading,
    tooltipBoxDescription,
    tooltipBoxDescriptionElement,
    tooltipLink,
    tooltipLinkText,
    helpLinkText,
    helpLink,
    optionalText,
    isDisabled = false,
    isRequired,
    ...rest
  } = props;
  const { values, errors } = formik;
  const inputValue = values[name];

  const [labelView, showLabelView] = useState(false);
  const [slideLabel, setSlideLabel] = useState(false);
  const inputRef = useRef();

  const userHasVisitedTheInputField = formik.touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const showTooltipIcon =
    tooltipBoxHeading || tooltipBoxDescription || tooltipBoxDescriptionElement;

  const containerClasses = joinClassNames([styles.container, customContainerClass]);

  const fieldClasses = addErrorClassesToLabelAndInput
    ? joinClassNames([styles.input, styles.inputError])
    : [styles.input];

  const placeholderButtonClasses = joinClassNames([fieldClasses, styles.placeholderButton]);

  const handleFocus = () => {
    setSlideLabel(true);
  };

  const handleBlur = () => {
    setSlideLabel(false);
    if (inputValue) showLabelView(true);
  };

  const handleClick = () => {
    showLabelView(false);

    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  };

  const renderFieldView = () =>
    labelView && !isDisabled && inputValue ? (
      <button
        type='button'
        data-testid={`label-view-${name}`}
        className={placeholderButtonClasses}
        onClick={handleClick}
      >
        {placeholder && !inputValue ? placeholder : inputValue}
      </button>
    ) : (
      <Field
        data-testid={`input-${name}`}
        innerRef={inputRef}
        className={fieldClasses}
        name={name}
        id={name}
        placeholder={placeholder}
        disabled={isDisabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    );

  return (
    <div className={containerClasses}>
      <div className={styles.inputWithTooltipContainer}>
        {renderFieldView()}

        {label && (
          <SlidingLabel
            label={label}
            inputEntered={!!inputValue || !!placeholder || slideLabel}
            htmlFor={name}
            showErrorStyle={addErrorClassesToLabelAndInput}
            inputIsRequired={isRequired}
          />
        )}

        {showTooltipIcon && (
          <div className={styles.toolTipWithImage}>
            <ToolTip
              heading={tooltipBoxHeading}
              description={tooltipBoxDescription}
              descriptionElement={tooltipBoxDescriptionElement}
            />
          </div>
        )}
      </div>

      {errors[name] && formik.touched[name] && (
        <ErrorText containerClass={styles.errorContainer} fieldName={name} />
      )}

      <AdditionalInfo
        optionalText={optionalText}
        helpLinkText={helpLinkText}
        helpLink={helpLink}
        tooltipLinkText={tooltipLinkText}
        tooltipLink={tooltipLink}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  formik: PropTypes.shape({}),
  containerClass: PropTypes.string,
  tooltipBoxHeading: PropTypes.string,
  tooltipBoxDescription: PropTypes.string,
  tooltipBoxDescriptionElement: PropTypes.element,
  tooltipLink: PropTypes.string,
  tooltipLinkText: PropTypes.string,
  helpLinkText: PropTypes.string,
  helpLink: PropTypes.string,
  optionalText: PropTypes.string,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: '',
  formik: {},
  containerClass: '',
  tooltipBoxHeading: '',
  tooltipBoxDescription: '',
  tooltipBoxDescriptionElement: null,
  tooltipLink: '',
  tooltipLinkText: '',
  helpLinkText: '',
  helpLink: '',
  optionalText: '',
  isDisabled: false,
  isRequired: false,
};

export default Input;
