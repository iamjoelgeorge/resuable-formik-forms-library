import React, { useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import styles from './DateDropdown.module.scss';
import { ArrowNext } from '../../../../../constants/icons';
import { functionThatDoesNothing, joinClassNames } from '../../../../../utils/utils';
import { useToggleDropdown } from '../../../../../hooks/useToggleDropdown';

const DateDropdown = (props) => {
  const { value, onClick, dropdownArray, isDisabled = false, type, ...rest } = props;
  const dropdownContainerRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen, toggleDropdown] =
    useToggleDropdown(dropdownContainerRef);

  const containerClasses = isDisabled
    ? joinClassNames([styles.container, styles.disabled])
    : styles.container;

  const renderDropdownItems = () =>
    dropdownArray?.map((item) => {
      const dropdownItemClasses =
        String(item.name).toString() === value.toString()
          ? joinClassNames([styles.dropdownItem, styles.selected])
          : styles.dropdownItem;

      return (
        <li key={uuidv4()} className={dropdownItemClasses}>
          <button
            data-testid='dropdown-item-button'
            disabled={item.isDisabled}
            type='button'
            onClick={!item.isDisabled ? () => onClick(item, type) : functionThatDoesNothing}
          >
            {item.name}
          </button>
        </li>
      );
    });

  return (
    <div
      className={containerClasses}
      role='button'
      tabIndex={!isDisabled ? '0' : ''}
      ref={dropdownContainerRef}
      onClick={!isDisabled ? toggleDropdown : functionThatDoesNothing}
      {...rest}
    >
      {value}

      <span className={styles.dropdownIconContainer}>
        <img src={ArrowNext} alt='Dropdown icon' />
      </span>

      {isDropdownOpen && (
        <ul data-testid='date-dropdown' className={styles.dropdownContainer}>
          {renderDropdownItems()}
        </ul>
      )}
    </div>
  );
};

DateDropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  dropdownArray: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      isDisabled: PropTypes.bool,
    }),
  ),
  isDisabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

DateDropdown.defaultProps = {
  value: '',
  onClick: () => {},
  dropdownArray: [],
  isDisabled: false,
};

export default DateDropdown;
