import React, { useRef } from 'react';

import { Field } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import styles from './Dropdown.module.scss';
import { ArrowNext } from '../../../constants/icons';
import { joinClassNames } from '../../../utils/utils';
import { useClickOutsideAndEscKeyPress } from '../../../hooks/useClickOutsideAndEscKeyPress';

const Dropdown = (props) => {
  const {
    name,
    value,
    onClick,
    dropdownArray,
    isDisabled = false,
    disableFormik = false,
    type,
    ...rest
  } = props;
  const dropdownContainerRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useClickOutsideAndEscKeyPress(dropdownContainerRef);

  const handleContainerClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const renderDropdownItems = () =>
    dropdownArray?.map((item) => {
      const dropdownItemClasses =
        String(item) === value
          ? joinClassNames([styles.dropdownItem, styles.selected])
          : styles.dropdownItem;

      return (
        <li key={uuidv4()} onClick={() => onClick(item, type)} className={dropdownItemClasses}>
          <button type='button'>{item}</button>
        </li>
      );
    });

  return (
    <Field name={name} {...rest}>
      {(form, field) => {
        return (
          <button
            type='button'
            ref={dropdownContainerRef}
            className={styles.container}
            onClick={handleContainerClick}
            disabled={isDisabled}
          >
            {disableFormik ? value : field.value}

            <span className={styles.dropdownIconContainer}>
              <img src={ArrowNext} alt='Dropdown icon' />
            </span>

            {isDropdownOpen && (
              <ul className={styles.dropdownContainer}>{renderDropdownItems()}</ul>
            )}
          </button>
        );
      }}
    </Field>
  );
};

export default Dropdown;
