import React, { useRef } from 'react';

import { Field, useFormikContext } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import styles from './DropdownWithoutAutoComplete.module.scss';
import { ArrowNext } from '../../../constants/icons';
import { joinClassNames } from '../../../utils/utils';
import { useToggleDropdown } from '../../../hooks/useToggleDropdown';
import SlidingLabel from '../SlidingLabel/SlidingLabel';
import ErrorText from '../ErrorText/ErrorText';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';
import { commonProps, commonPropTypes } from '../../../constants/constants';

const DropdownWithoutAutoComplete = (props) => {
  const {
    name,
    label,
    dropdownArray,
    containerClass: customContainerClass,
    mainLabelTooltipBoxHeading,
    mainLabelTooltipBoxDescription,
    mainLabelTooltipBoxDescriptionElement,
    tooltipLink,
    tooltipLinkText,
    helpLinkText,
    helpLink,
    optionalText,
    isRequired,
    isDisabled,
    ...rest
  } = props;

  const { errors, touched, values } = useFormikContext();

  const dropdownContainerRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen, toggleDropdown] =
    useToggleDropdown(dropdownContainerRef);

  const userHasVisitedTheInputField = touched[name];
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
    <Field name={name}>
      {({ form, field }) => {
        const { setFieldValue } = form;

        return (
          <div data-testid={`${name}-dropdown-component`} className={containerClasses} {...rest}>
            {label && (
              <SlidingLabel
                label={label}
                inputEntered={!!field.value}
                htmlFor={'selectedDate'}
                showErrorStyle={addErrorClassesToLabelAndInput}
                tooltipBoxHeading={mainLabelTooltipBoxHeading}
                tooltipBoxDescription={mainLabelTooltipBoxDescription}
                tooltipBoxDescriptionElement={mainLabelTooltipBoxDescriptionElement}
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
      }}
    </Field>
  );
};

DropdownWithoutAutoComplete.propTypes = {
  ...commonPropTypes,
  label: PropTypes.string,
  dropdownArray: PropTypes.array.isRequired,
};

DropdownWithoutAutoComplete.defaultProps = {
  ...commonProps,
  label: '',
  dropdownArray: [],
};

export default DropdownWithoutAutoComplete;
