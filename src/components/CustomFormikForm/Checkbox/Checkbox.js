/* eslint-disable */
import React, { useState } from 'react';

import { Field } from 'formik';
import PropTypes from 'prop-types';

import styles from './Checkbox.module.scss';
import { joinClassNames } from '../../../utils/utils';
import ErrorText from '../ErrorText/ErrorText';
import SlidingLabel from '../SlidingLabel/SlidingLabel';
import ToolTip from '../ToolTip/ToolTip';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';

const Checkbox = (props) => {
  const {
    name,
    optionLabel,
    mainLabel,
    formik,
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
    optionLabelTooltipIconChildElement,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const { errors } = formik;

  const userHasVisitedTheInputField = formik.touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const labelTextClasses = isFocused
    ? joinClassNames([styles.labelSpanElement, styles.focused])
    : styles.labelSpanElement;

  const showOptionTooltipIcon =
    optionLabelTooltipBoxHeading ||
    optionLabelTooltipBoxDescription ||
    optionLabelTooltipIconChildElement;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={styles.container}>
      <SlidingLabel
        customClass={styles.componentHeading}
        label={mainLabel}
        inputEntered
        htmlFor={name}
        showErrorStyle={addErrorClassesToLabelAndInput}
        tooltipIconBoxHeading={mainLabelTooltipBoxHeading}
        tooltipIconBoxDescription={mainLabelTooltipBoxDescription}
        tooltipIconChildElement={mainLabelTooltipBoxDescriptionElement}
        inputIsRequired={isRequired}
      />
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
            descriptionElement={optionLabelTooltipIconChildElement}
            containerClass={styles.tooltip}
          />
        )}
      </div>

      {addErrorClassesToLabelAndInput && (
        <ErrorText fieldName={name} containerClass={styles.error} />
      )}

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
  name: PropTypes.string.isRequired,
  optionLabel: PropTypes.string,
  mainLabel: PropTypes.string,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  helpLink: PropTypes.string,
  helpLinkText: PropTypes.string,
  tooltipLink: PropTypes.string,
  tooltipLinkText: PropTypes.string,
  optionalText: PropTypes.string,
  mainLabelTooltipBoxHeading: PropTypes.string,
  mainLabelTooltipBoxDescription: PropTypes.string,
  mainLabelTooltipBoxDescriptionElement: PropTypes.element,
  optionLabelTooltipBoxHeading: PropTypes.string,
  optionLabelTooltipBoxDescription: PropTypes.string,
  optionLabelTooltipIconChildElement: PropTypes.element,
};

Checkbox.defaultProps = {
  optionLabel: '',
  mainLabel: '',
  isRequired: false,
  isDisabled: false,
  helpLink: '',
  helpLinkText: '',
  tooltipLink: '',
  tooltipLinkText: '',
  optionalText: '',
  mainLabelTooltipBoxHeading: '',
  mainLabelTooltipBoxDescription: '',
  optionLabelTooltipBoxHeading: '',
  optionLabelTooltipBoxDescription: '',
};

export default Checkbox;
