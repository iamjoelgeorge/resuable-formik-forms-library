import React, { useState, useRef, useLayoutEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import styles from './Dropdown.module.scss';
import DropdownIcon from '../../assets/images/arrow-next.svg';
import { joinClassNames } from '../../utils/utils';

const Dropdown = (props) => {
  const { value, onClick, dropdownArray, type } = props;
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
          {item}
        </li>
      );
    });

  return (
    <div ref={dropdownContainerRef} className={styles.container} onClick={handleContainerClick}>
      <p className={styles.selectedDate}>
        {value}
        <span className={styles.dropdownIconContainer}>
          <img src={DropdownIcon} alt='Dropdown icon' />
        </span>
      </p>

      {isDropdownOpen && <ul className={styles.dropdownContainer}>{renderDropdownItems()}</ul>}
    </div>
  );
};

export default Dropdown;
