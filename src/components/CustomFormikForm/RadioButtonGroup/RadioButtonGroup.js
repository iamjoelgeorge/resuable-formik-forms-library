import React from 'react';

import { Field, useFormikContext } from 'formik';
import PropTypes from 'prop-types';

import styles from './RadioButtonGroup.module.scss';
import ErrorText from '../ErrorText/ErrorText';
import SlidingLabel from '../SlidingLabel/SlidingLabel';
import ToolTip from '../ToolTip/ToolTip';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';
import { commonProps, commonPropTypes } from '../../../constants/constants';
import { joinClassNames } from '../../../utils/utils';

const RadioButtonGroup = (props) => {
  const {
    name,
    options,
    containerClass: customContainerClass,
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
    ...rest
  } = props;

  const { values, errors, touched } = useFormikContext();

  const userHasVisitedTheInputField = touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const renderOptions = () =>
    options.map((option, index) => {
      const { tooltip } = option;

      const showOptionTooltipIcon =
        tooltip?.heading || tooltip?.description || tooltip?.customDescriptionElement;

      return (
        <div className={styles.radioButtonWithLabel} key={index}>
          <label className={styles.optionLabel}>
            <Field
              data-testid={`radio-button-${option.label}`}
              className={styles.radioInput}
              type='radio'
              name={name}
              value={option.value}
              disabled={isDisabled}
              checked={values[name]?.includes(option.value)}
              {...rest}
            />

            <span className={styles.presentationalRadioButton}>
              <span className={styles.radioButtonSelected} />
            </span>

            {option.label && <span className={styles.labelSpanElement}>{option.label}</span>}
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
    <div className={joinClassNames([styles.container, customContainerClass])}>
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

      <div className={styles.radioGroup} role='group' aria-labelledby={name}>
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

RadioButtonGroup.propTypes = {
  ...commonPropTypes,
  mainLabel: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      tooltip: PropTypes.shape({
        heading: PropTypes.string,
        description: PropTypes.string,
        customDescriptionElement: PropTypes.element,
      }),
    }),
  ),
};

RadioButtonGroup.defaultProps = {
  ...commonProps,
  options: {},
  mainLabel: '',
};

export default RadioButtonGroup;
