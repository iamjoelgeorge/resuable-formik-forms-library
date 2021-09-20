import React, { useState, useRef, useLayoutEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import styles from './Dropdown.module.scss';
import { joinClassNames } from '../../../utils/utils';
import { ArrowNext } from '../../../constants/icons';
import { Field } from 'formik';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownContainerRef = useRef();

  useLayoutEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    document.addEventListener('keydown', handleEscKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);

  const handleClickOutSide = (e) => {
    const dropdownContainerNode = dropdownContainerRef.current;
    const clickedNode = e.target;

    if (dropdownContainerNode?.contains(clickedNode)) return;
    setIsDropdownOpen(false);
  };

  const handleEscKeyPress = (e) => {
    if (e.keyCode === 27) {
      setIsDropdownOpen(false);
    }
  };

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
