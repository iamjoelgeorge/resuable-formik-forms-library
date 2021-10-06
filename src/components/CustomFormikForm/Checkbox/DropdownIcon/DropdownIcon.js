import React from 'react';

import PropTypes from 'prop-types';

import styles from './DropdownIcon.module.scss';
import { joinClassNames } from '../../../../utils/utils';

const DropdownIcon = (props) => {
  const { isOpen, isDisabled } = props;

  const defaultClasses = joinClassNames([styles.dropdownIcon, isDisabled ? styles.isDisabled : '']);

  const dropdownIconClasses = !isOpen
    ? defaultClasses
    : joinClassNames([defaultClasses, styles.rotateDropdownIcon]);
  return (
    <>
      <span className={dropdownIconClasses}>
        <span className={joinClassNames([styles.line, styles.lineLeft])}></span>
        <span className={joinClassNames([styles.line, styles.lineRight])}></span>
      </span>
    </>
  );
};

DropdownIcon.propTypes = {
  isOpen: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

DropdownIcon.defaultProps = {
  isOpen: false,
  isDisabled: false,
};

export default DropdownIcon;
