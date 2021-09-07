/* eslint-disable */
import React, { useState, Fragment } from 'react';

import { Field } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import styles from '../Checkbox.module.scss';
import checkBoxGroupStyles from './CheckboxGroup.module.scss';
import { joinClassNames } from '../../../../utils/utils';
import ErrorText from '../../ErrorText/ErrorText';
import SlidingLabel from '../../SlidingLabel/SlidingLabel';
import ToolTip from '../../ToolTip/ToolTip';
import AdditionalInfo from '../../AdditionalInfo/AdditionalInfo';

const CheckboxGroup = (props) => {
  const {
    name,
    options,
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
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const { errors, values } = formik;

  const userHasVisitedTheInputField = formik.touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const labelTextClasses = isFocused
    ? joinClassNames([styles.labelSpanElement, styles.focused])
    : styles.labelSpanElement;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const renderOptions = () =>
    options.map((option, index) => {
      const { tooltip } = option;

      const showOptionTooltipIcon =
        tooltip?.heading || tooltip?.description || tooltip?.customDescriptionElement;

      return (
        <div className={checkBoxGroupStyles.checkBoxWithLabel} key={index}>
          <label className={styles.optionLabel}>
            <Field
              className={styles.checkboxInput}
              type='checkbox'
              name={name}
              value={option.value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={isDisabled}
              checked={values[name]?.includes(option.value)}
              {...rest}
            />

            <span className={styles.presentationalCheckbox}>
              <span className={styles.checkboxChecked} />
            </span>

            {option.label && <span className={labelTextClasses}>{option.label}</span>}
          </label>

          {showOptionTooltipIcon && (
            <ToolTip
              heading={tooltip?.heading}
              description={tooltip?.description}
              descriptionElement={tooltip?.customDescriptionElement}
              containerClass={styles.tooltip}
            />
          )}
        </div>
      );
    });

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

      <div className={checkBoxGroupStyles.checkboxGroup} role='group' aria-labelledby={name}>
        {renderOptions()}
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

CheckboxGroup.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
      tooltip: PropTypes.shape({
        heading: PropTypes.string,
        description: PropTypes.string,
        customDescriptionElement: PropTypes.element,
      }),
    }),
  ),
  mainLabel: PropTypes.string,
  formik: PropTypes.shape({}),
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  helpLink: PropTypes.string,
  helpLinkText: PropTypes.string,
  tooltipLink: PropTypes.string,
  tooltipLinkText: PropTypes.string,
  optionalText: PropTypes.string,
  mainLabelTooltipBoxHeading: PropTypes.string,
  mainLabelTooltipBoxDescription: PropTypes.string,
  mainLabelTooltipBoxDescriptionElement: PropTypes.string,
};

CheckboxGroup.defaultProps = {
  name: '',
  options: {},
  mainLabel: '',
  formik: {},
  isRequired: false,
  isDisabled: false,
  helpLink: '',
  helpLinkText: '',
  tooltipLink: '',
  tooltipLinkText: '',
  optionalText: '',
  mainLabelTooltipBoxHeading: '',
  mainLabelTooltipBoxDescription: '',
  mainLabelTooltipBoxDescriptionElement: null,
};

export default CheckboxGroup;
