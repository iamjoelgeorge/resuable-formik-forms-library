/* eslint-disable */
import React, { useState } from 'react';

import { Field } from 'formik';
import PropTypes from 'prop-types';

import styles from './Checkbox.module.scss';
import { joinClassNames } from '../../../utils/utils';
import ErrorText from '../ErrorText/ErrorText';
import SlidingLabel from '../SlidingLabel/SlidingLabel';
import Link from '../Link/Link';

const Checkbox = (props) => {
  const {
    name,
    optionLabel,
    mainLabel,
    formik,
    mainLabelTooltipBoxHeading,
    mainLabelTooltipBoxDescription,
    mainLabelTooltipIconChildElement,
    isRequired = false,
    helpLink,
    helpLinkText,
    tooltipLink,
    tooltipLinkText,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const { errors } = formik;

  const userHasVisitedTheInputField = formik.touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

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
      <SlidingLabel
        customClass={styles.componentHeading}
        label={mainLabel}
        inputEntered
        htmlFor={name}
        showErrorStyle={addErrorClassesToLabelAndInput}
        tooltipIconBoxHeading={mainLabelTooltipBoxHeading}
        tooltipIconBoxDescription={mainLabelTooltipBoxDescription}
        tooltipIconChildElement={mainLabelTooltipIconChildElement}
        inputIsRequired={isRequired}
      />

      <label className={styles.optionLabel}>
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
        {optionLabel && <span className={styles.labelSpanElement}>{optionLabel}</span>}
      </label>

      {addErrorClassesToLabelAndInput && (
        <ErrorText fieldName={name} containerClass={styles.error} />
      )}

      {helpLinkText && (
        <Link containerClass={styles.optionalText} label={helpLinkText} link={helpLink} />
      )}

      {tooltipLinkText && (
        <Link
          containerClass={styles.optionalText}
          label={tooltipLinkText}
          link={tooltipLink}
          isTooltip
        />
      )}
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  optionLabel: PropTypes.string,
  mainLabel: PropTypes.string,
  mainLabelTooltipBoxHeading: PropTypes.string,
  mainLabelTooltipBoxDescription: PropTypes.string,
  mainLabelTooltipIconChildElement: PropTypes.element,
  isRequired: PropTypes.bool,
  helpLink: PropTypes.string,
  helpLinkText: PropTypes.string,
  tooltipLink: PropTypes.string,
  tooltipLinkText: PropTypes.string,
};

export default Checkbox;
