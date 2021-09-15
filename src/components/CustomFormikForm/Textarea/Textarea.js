import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { Field } from 'formik';

import styles from './Textarea.module.scss';
import { joinClassNames } from '../../../utils/utils';
import SlidingLabel from '../SlidingLabel/SlidingLabel';
import ErrorText from '../ErrorText/ErrorText';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';

const Textarea = (props) => {
  const {
    name,
    label,
    placeholder,
    formik,
    containerClass: customContainerClass,
    labelTooltipBoxHeading,
    labelTooltipBoxDescription,
    labelTooltipBoxDescriptionElement,
    tooltipLink,
    tooltipLinkText,
    helpLinkText,
    helpLink,
    optionalText,
    isDisabled = false,
    isRequired,
    ...rest
  } = props;
  const [labelView, showLabelView] = useState(false);
  const [slideLabel, setSlideLabel] = useState(false);
  const textareaRef = useRef();

  const { values, errors } = formik;
  const inputValue = values[name];

  const userHasVisitedTheInputField = formik.touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const placeholderButtonClasses = joinClassNames([styles.textarea, styles.placeholderButton]);
  const containerClasses = joinClassNames([styles.container, customContainerClass]);

  const handleBlurOnField = () => {
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
      <button className={placeholderButtonClasses} tabIndex='0' onClick={handleClick}>
        {placeholder && !inputValue ? placeholder : inputValue}
      </button>
    ) : (
      <Field
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
    <div className={containerClasses}>
      <div className={styles.fieldContainer}>
        {renderFieldView()}
        {label && (
          <SlidingLabel
            label={label}
            htmlFor={name}
            inputEntered={!!inputValue || !!placeholder || slideLabel}
            customClass={styles.label}
            showErrorStyle={addErrorClassesToLabelAndInput}
            tooltipIconBoxHeading={labelTooltipBoxHeading}
            tooltipIconBoxDescription={labelTooltipBoxDescription}
            tooltipIconChildElement={labelTooltipBoxDescriptionElement}
            inputIsRequired={isRequired}
          />
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

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  formik: PropTypes.shape({}),
  containerClass: PropTypes.string,
  labelTooltipBoxHeading: PropTypes.string,
  labelTooltipBoxDescription: PropTypes.string,
  labelTooltipBoxDescriptionElement: PropTypes.element,
  tooltipLink: PropTypes.string,
  tooltipLinkText: PropTypes.string,
  helpLinkText: PropTypes.string,
  helpLink: PropTypes.string,
  optionalText: PropTypes.string,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
};

export default Textarea;
