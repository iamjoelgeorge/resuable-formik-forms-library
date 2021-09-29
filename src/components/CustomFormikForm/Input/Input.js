import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { Field, useFormikContext } from 'formik';

import styles from './Input.module.scss';
import { commonProps, commonPropTypes } from '../../../constants/constants';
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
    containerClass: customContainerClass,
    mainLabelTooltipBoxHeading,
    mainLabelTooltipBoxDescription,
    mainLabelTooltipBoxDescriptionElement,
    tooltipBoxBesideInputHeading,
    tooltipBoxBesideInputDescription,
    tooltipBoxBesideInputDescriptionElement,
    tooltipLink,
    tooltipLinkText,
    helpLinkText,
    helpLink,
    optionalText,
    isDisabled = false,
    isRequired,
    ...rest
  } = props;
  const { values, errors, touched, handleBlur: formikHandleBlur } = useFormikContext();
  const inputValue = values[name];

  const [labelView, showLabelView] = useState(false);
  const [slideLabel, setSlideLabel] = useState(false);
  const inputRef = useRef();

  const userHasVisitedTheInputField = touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const showTooltipIcon =
    tooltipBoxBesideInputHeading ||
    tooltipBoxBesideInputDescription ||
    tooltipBoxBesideInputDescriptionElement;

  const fieldClasses = addErrorClassesToLabelAndInput
    ? joinClassNames([styles.input, styles.inputError])
    : [styles.input];

  const placeholderButtonClasses = joinClassNames([fieldClasses, styles.placeholderButton]);

  const handleFocus = () => {
    setSlideLabel(true);
  };

  const handleBlur = (e) => {
    formikHandleBlur(e);

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
    <div className={joinClassNames([styles.container, customContainerClass])}>
      <div className={styles.inputWithTooltipContainer}>
        {renderFieldView()}

        {label && (
          <SlidingLabel
            label={label}
            inputEntered={!!inputValue || !!placeholder || slideLabel}
            htmlFor={name}
            showErrorStyle={addErrorClassesToLabelAndInput}
            inputIsRequired={isRequired}
            tooltipBoxHeading={mainLabelTooltipBoxHeading}
            tooltipBoxDescription={mainLabelTooltipBoxDescription}
            tooltipBoxDescriptionElement={mainLabelTooltipBoxDescriptionElement}
          />
        )}

        {showTooltipIcon && (
          <div className={styles.toolTipWithImage}>
            <ToolTip
              heading={tooltipBoxBesideInputHeading}
              description={tooltipBoxBesideInputDescription}
              descriptionElement={tooltipBoxBesideInputDescriptionElement}
            />
          </div>
        )}
      </div>

      <ErrorText containerClass={styles.errorContainer} fieldName={name} />

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
  ...commonPropTypes,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  tooltipBoxBesideInputHeading: PropTypes.string,
  tooltipBoxBesideInputDescription: PropTypes.string,
  tooltipBoxBesideInputDescriptionElement: PropTypes.element,
};

Input.defaultProps = {
  ...commonProps,
  label: '',
  placeholder: '',
  tooltipBoxBesideInputHeading: '',
  tooltipBoxBesideInputDescription: '',
  tooltipBoxBesideInputDescriptionElement: null,
};

export default Input;
