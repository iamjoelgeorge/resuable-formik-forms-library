import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Field, useFormikContext } from 'formik';

import inputStyles from '../../Input/Input.module.scss';
import styles from './Dropdown.module.scss';
import { commonProps, commonPropTypes } from '../../../../constants/constants';
import { joinClassNames } from '../../../../utils/utils';
import AdditionalInfo from '../../AdditionalInfo/AdditionalInfo';
import ErrorText from '../../ErrorText/ErrorText';
import SlidingLabel from '../../SlidingLabel/SlidingLabel';
import CustomReactSelect from './CustomReactSelect/CustomReactSelect';

const Dropdown = (props) => {
  const {
    name,
    label,
    dropdownArray,
    placeholder,
    isSearchable,
    containerClass: customContainerClass,
    mainLabelTooltipBoxHeading,
    mainLabelTooltipBoxDescription,
    mainLabelTooltipBoxDescriptionElement,
    optionalText,
    helpLink,
    helpLinkText,
    tooltipLink,
    tooltipLinkText,
    isDisabled,
    isRequired,
  } = props;
  const [slideLabel, setSlideLabel] = useState(false);

  const {
    values,
    errors,
    touched,
    handleBlur: formikHandleBlur,
    setFieldTouched,
  } = useFormikContext();

  const userHasVisitedTheInputField = touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const labelClasses =
    slideLabel || !!placeholder || values[name]
      ? joinClassNames([styles.label, styles.slideLabel])
      : styles.label;

  const handleOptionChange = (value, setFieldValue) => {
    setFieldValue(name, value);
  };

  const handleFocus = () => {
    if (isSearchable) setSlideLabel(true);
  };

  const handleBlur = (e) => {
    if (!values[name]) setSlideLabel(false);

    formikHandleBlur(e);
    setFieldTouched(name, true);
  };

  return (
    <div
      className={joinClassNames([inputStyles.container, styles.container, customContainerClass])}
    >
      <Field name={name}>
        {({ form }) => {
          const { setFieldValue } = form;
          return (
            <CustomReactSelect
              dropdownArray={dropdownArray}
              isDisabled={isDisabled}
              isSearchable={isSearchable}
              placeholder={placeholder}
              onOptionChange={(value) => handleOptionChange(value, setFieldValue)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          );
        }}
      </Field>

      {label && (
        <SlidingLabel
          customClass={labelClasses}
          label={label}
          inputEntered={!!values[name] || !!placeholder || slideLabel}
          htmlFor={name}
          showErrorStyle={addErrorClassesToLabelAndInput}
          inputIsRequired={isRequired}
          inputIsDisabled={isDisabled}
          tooltipBoxHeading={mainLabelTooltipBoxHeading}
          tooltipBoxDescription={mainLabelTooltipBoxDescription}
          tooltipBoxDescriptionElement={mainLabelTooltipBoxDescriptionElement}
        />
      )}
      <ErrorText containerClass={inputStyles.errorContainer} fieldName={name} />

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

Dropdown.propTypes = {
  ...commonPropTypes,
  label: PropTypes.string,
  dropdownArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  placeholder: PropTypes.string,
  isSearchable: PropTypes.bool,
};

Dropdown.defaultProps = {
  ...commonProps,
  placeholder: '',
  isSearchable: false,
};

export default Dropdown;
