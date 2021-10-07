import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Select from 'react-select';

import { customStylesForDropdown } from '../config';
import { keyCodes } from '../../../../../constants/constants';
import TextHighlighter from '../../TextHighlighter/TextHighlighter';
import DropdownIcon from '../../../Checkbox/DropdownIcon/DropdownIcon';

const CustomReactSelect = (props) => {
  const {
    dropdownArray,
    defaultValue,
    isDisabled,
    isSearchable,
    placeholder,
    onOptionChange,
    onInputChange,
    onFocus,
    onBlur,
    onKeyDown,
    inputId,
    ...rest
  } = props;

  const [enteredInput, setEnteredInput] = useState('');
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const formatOptionLabel = ({ label }) => (
    <TextHighlighter textToCompare={label} patternToMatch={enteredInput} />
  );

  const handleInputChange = (value) => {
    onInputChange(value);
    setEnteredInput(value);
  };

  const handleOptionChange = (value) => {
    onOptionChange(value);
    setDropdownIsOpen(false);
  };

  const handleFocus = (e) => {
    onFocus(e);
    setDropdownIsOpen(true);
  };

  const handleBlur = (e) => {
    onBlur(e);
    setDropdownIsOpen(false);
  };

  const handleKeyPress = (e) => {
    onKeyDown(e);
    switch (e.keyCode) {
      case keyCodes.arrowDown:
      case keyCodes.arrowUp:
        setDropdownIsOpen(true);
        break;

      case keyCodes.esc:
        setDropdownIsOpen(false);
        break;

      default:
        break;
    }
  };

  const IndicatorsContainer = () => (
    <DropdownIcon isOpen={dropdownIsOpen} isDisabled={isDisabled} />
  );

  return (
    <Select
      inputId={inputId}
      styles={customStylesForDropdown}
      formatOptionLabel={formatOptionLabel}
      options={dropdownArray}
      defaultValue={defaultValue}
      onInputChange={handleInputChange}
      onChange={(value) => handleOptionChange(value)}
      placeholder={placeholder}
      components={{ IndicatorsContainer }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      isDisabled={isDisabled}
      onKeyDown={handleKeyPress}
      isSearchable={isSearchable}
      {...rest}
    />
  );
};

CustomReactSelect.propTypes = {
  inputId: PropTypes.string,
  dropdownArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  defaultValue: PropTypes.shape({}),
  isDisabled: PropTypes.bool,
  isSearchable: PropTypes.bool,
  placeholder: PropTypes.string,
  onOptionChange: PropTypes.func,
  onInputChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
};

CustomReactSelect.defaultProps = {
  inputId: '',
  defaultValue: null,
  isDisabled: false,
  isSearchable: false,
  placeholder: '',
  onOptionChange: () => {},
  onInputChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onKeyDown: () => {},
};

export default CustomReactSelect;
