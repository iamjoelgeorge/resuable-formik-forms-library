import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { Field, useFormikContext } from 'formik';

import styles from './Textarea.module.scss';
import { commonProps, commonPropTypes } from '../../../constants/constants';
import { joinClassNames } from '../../../utils/utils';
import SlidingLabel from '../SlidingLabel/SlidingLabel';
import ErrorText from '../ErrorText/ErrorText';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';

const Textarea = (props) => {
  const {
    name,
    label,
    placeholder,
    containerClass: customContainerClass,
    mainLabelTooltipBoxHeading,
    mainLabelTooltipBoxDescription,
    mainLabelTooltipBoxDescriptionElement,
    tooltipLink,
    tooltipLinkText,
    helpLinkText,
    helpLink,
    optionalText,
    isDisabled,
    isRequired,
    ...rest
  } = props;
  const [labelView, showLabelView] = useState(false);
  const [slideLabel, setSlideLabel] = useState(false);
  const textareaRef = useRef();

  const { values, errors, touched, handleBlur: formikHandleBlur } = useFormikContext();
  const inputValue = values[name];

  const userHasVisitedTheInputField = touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const placeholderButtonClasses = joinClassNames([styles.textarea, styles.placeholderButton]);

  const handleBlurOnField = (e) => {
    formikHandleBlur(e);
    setSlideLabel(false);
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
      <button
        type='button'
        data-testid={`label-view-${name}`}
        className={placeholderButtonClasses}
        tabIndex='0'
        onClick={handleClick}
      >
        {placeholder && !inputValue ? placeholder : inputValue}
      </button>
    ) : (
      <Field
        data-testid={`textarea-${name}`}
        innerRef={textareaRef}
        className={styles.textarea}
        as='textarea'
        name={name}
        placeholder={placeholder}
        disabled={isDisabled}
        onBlur={handleBlurOnField}
        {...rest}
      />
    );

  return (
    <div className={joinClassNames([styles.container, customContainerClass])}>
      <div className={styles.fieldContainer}>
        {renderFieldView()}
        {label && (
          <SlidingLabel
            label={label}
            htmlFor={name}
            inputEntered={!!inputValue || !!placeholder || slideLabel}
            inputIsDisabled={isDisabled}
            customClass={styles.label}
            showErrorStyle={addErrorClassesToLabelAndInput}
            tooltipBoxHeading={mainLabelTooltipBoxHeading}
            tooltipBoxDescription={mainLabelTooltipBoxDescription}
            tooltipBoxDescriptionElement={mainLabelTooltipBoxDescriptionElement}
            inputIsRequired={isRequired}
          />
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

Textarea.propTypes = {
  ...commonPropTypes,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

Textarea.defaultProps = {
  label: PropTypes.string,
  placeholder: '',
  ...commonProps,
};

export default Textarea;
