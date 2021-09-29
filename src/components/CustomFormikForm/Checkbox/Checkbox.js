import React, { useState } from 'react';

import { Field, useFormikContext } from 'formik';
import PropTypes from 'prop-types';

import styles from './Checkbox.module.scss';
import { commonProps, commonPropTypes } from '../../../constants/constants';
import { joinClassNames } from '../../../utils/utils';
import ErrorText from '../ErrorText/ErrorText';
import SlidingLabel from '../SlidingLabel/SlidingLabel';
import ToolTip from '../ToolTip/ToolTip';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';

const Checkbox = (props) => {
  const {
    name,
    containerClass: customContainerClass,
    optionLabel,
    mainLabel,
    isRequired,
    isDisabled,
    helpLink,
    helpLinkText,
    tooltipLink,
    tooltipLinkText,
    optionalText,
    mainLabelTooltipBoxHeading,
    mainLabelTooltipBoxDescription,
    mainLabelTooltipBoxDescriptionElement,
    optionLabelTooltipBoxHeading,
    optionLabelTooltipBoxDescription,
    optionLabelTooltipBoxDescriptionElement,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const { errors, touched, handleBlur: formikHandleBlur } = useFormikContext();

  const userHasVisitedTheInputField = touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const labelTextClasses = isFocused
    ? joinClassNames([styles.labelSpanElement, styles.focused])
    : styles.labelSpanElement;

  const showOptionTooltipIcon =
    optionLabelTooltipBoxHeading ||
    optionLabelTooltipBoxDescription ||
    optionLabelTooltipBoxDescriptionElement;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    formikHandleBlur(e);
    setIsFocused(false);
  };

  return (
    <div className={joinClassNames([styles.container, customContainerClass])}>
      {mainLabel && (
        <SlidingLabel
          customClass={styles.componentHeading}
          label={mainLabel}
          inputEntered
          htmlFor={name}
          showErrorStyle={addErrorClassesToLabelAndInput}
          tooltipBoxHeading={mainLabelTooltipBoxHeading}
          tooltipBoxDescription={mainLabelTooltipBoxDescription}
          tooltipBoxDescriptionElement={mainLabelTooltipBoxDescriptionElement}
          inputIsRequired={isRequired}
        />
      )}
      <div className={styles.optionWithTooltip}>
        <label className={styles.optionLabel}>
          <Field
            data-testid={`checkbox-${name}`}
            className={styles.checkboxInput}
            type='checkbox'
            name={name}
            {...rest}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isDisabled}
          />

          <span className={styles.presentationalCheckbox}>
            <span className={styles.checkboxChecked} />
          </span>

          {optionLabel && <span className={labelTextClasses}>{optionLabel}</span>}
        </label>

        {showOptionTooltipIcon && (
          <ToolTip
            heading={optionLabelTooltipBoxHeading}
            description={optionLabelTooltipBoxDescription}
            descriptionElement={optionLabelTooltipBoxDescriptionElement}
            containerClass={styles.tooltip}
          />
        )}
      </div>

      <ErrorText fieldName={name} containerClass={styles.error} />

      <AdditionalInfo
        optionalText={optionalText}
        helpLinkText={helpLinkText}
        helpLink={helpLink}
        tooltipLinkText={tooltipLinkText}
        tooltipLink={tooltipLink}
        customClass={styles.optionalText}
      />
    </div>
  );
};

Checkbox.propTypes = {
  ...commonPropTypes,
  optionLabel: PropTypes.string,
  mainLabel: PropTypes.string,
  optionLabelTooltipBoxHeading: PropTypes.string,
  optionLabelTooltipBoxDescription: PropTypes.string,
  optionLabelTooltipBoxDescriptionElement: PropTypes.element,
};

Checkbox.defaultProps = {
  ...commonProps,
  mainLabel: '',
  optionLabel: '',
  optionLabelTooltipBoxHeading: '',
  optionLabelTooltipBoxDescription: '',
  optionLabelTooltipBoxDescriptionElement: null,
};

export default Checkbox;
