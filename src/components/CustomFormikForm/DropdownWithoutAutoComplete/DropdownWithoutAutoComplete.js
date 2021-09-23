import React, { useRef } from 'react';

import { Field } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import styles from './DropdownWithoutAutoComplete.module.scss';
import { ArrowNext } from '../../../constants/icons';
import { joinClassNames } from '../../../utils/utils';
import { useToggleDropdown } from '../../../hooks/useToggleDropdown';
import SlidingLabel from '../SlidingLabel/SlidingLabel';
import ErrorText from '../ErrorText/ErrorText';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';

const DropdownWithoutAutoComplete = (props) => {
  const {
    name,
    label,
    dropdownArray,
    containerClass: customContainerClass,
    labelTooltipBoxHeading,
    labelTooltipBoxDescription,
    labelTooltipBoxDescriptionElement,
    tooltipLink,
    tooltipLinkText,
    helpLinkText,
    helpLink,
    optionalText,
    isRequired,
    isDisabled,
    formik,
    ...rest
  } = props;

  const { errors, values } = formik;

  const dropdownContainerRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen, toggleDropdown] =
    useToggleDropdown(dropdownContainerRef);

  const userHasVisitedTheInputField = formik.touched[name];
  const inputFieldHasErrors = errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const containerClasses = isDisabled
    ? joinClassNames([styles.container, styles.isDisabled, customContainerClass])
    : joinClassNames([styles.container, customContainerClass]);

  const renderDropdownItems = (setFieldValue) =>
    dropdownArray?.map((item) => {
      const dropdownItemClasses =
        String(item).trim().toLowerCase() === values[name].trim().toLowerCase()
          ? joinClassNames([styles.dropdownItem, styles.selected])
          : styles.dropdownItem;

      return (
        <li key={uuidv4()} className={dropdownItemClasses}>
          <button
            data-testid={`${name}-dropdown-item`}
            type='button'
            onClick={() => setFieldValue(name, item)}
          >
            {item}
          </button>
        </li>
      );
    });

  return (
    <Field name={name} {...rest}>
      {({ form, field }) => {
        const { setFieldValue } = form;

        return (
          <div data-testid={`${name}-dropdown-component`} className={containerClasses}>
            {label && (
              <SlidingLabel
                label={label}
                inputEntered={!!field.value}
                htmlFor={'selectedDate'}
                showErrorStyle={addErrorClassesToLabelAndInput}
                tooltipBoxHeading={labelTooltipBoxHeading}
                tooltipBoxDescription={labelTooltipBoxDescription}
                tooltipBoxDescriptionElement={labelTooltipBoxDescriptionElement}
                inputIsRequired={isRequired}
              />
            )}
            <div
              role='button'
              data-testid={`${name}-dropdown-button`}
              tabIndex={!isDisabled ? '0' : ''}
              ref={dropdownContainerRef}
              className={styles.dropdownContainer}
              onClick={!isDisabled ? toggleDropdown : () => {}}
            >
              {field?.value}

              <span className={styles.dropdownIconContainer}>
                <img src={ArrowNext} alt='Dropdown icon' />
              </span>

              {isDropdownOpen && (
                <ul data-testid={`${name}-dropdown-list`} className={styles.dropdownList}>
                  {renderDropdownItems(setFieldValue)}
                </ul>
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
      }}
    </Field>
  );
};

DropdownWithoutAutoComplete.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  dropdownArray: PropTypes.array.isRequired,
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

DropdownWithoutAutoComplete.defaultProps = {
  label: '',
  formik: {},
  containerClass: '',
  labelTooltipBoxHeading: '',
  labelTooltipBoxDescription: '',
  labelTooltipBoxDescriptionElement: null,
  tooltipLink: '',
  tooltipLinkText: '',
  helpLinkText: '',
  helpLink: '',
  optionalText: '',
  isDisabled: false,
  isRequired: false,
};

export default DropdownWithoutAutoComplete;
