import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Field, useFormikContext } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import DateDropdownStyles from '../DatePicker/DropdownDatePicker/DateDropdown/DateDropdown.module.scss';
import styles from './DropdownWithAutoComplete.module.scss';
import { functionThatDoesNothing, joinClassNames } from '../../../utils/utils';
import { useToggleDropdown } from '../../../hooks/useToggleDropdown';
import Input from '../Input/Input';
import ErrorText from '../ErrorText/ErrorText';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';
import TextHighlighter from './TextHighlighter/TextHighlighter';

const DropdownWithAutoComplete = (props) => {
  const {
    name,
    label,
    dropdownArray,
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
    ...rest
  } = props;
  const { handleBlur: formikHandleBlur, values, setFieldError, setFieldValue } = useFormikContext();

  const dropdownContainerRef = useRef();
  const dropdownListRef = useRef();

  const [suggestions, setSuggestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [triggerBlurEvent, setTriggerBlurEvent] = useState(true);
  const [cursor, setCursor] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen, toggleDropdown] =
    useToggleDropdown(dropdownContainerRef);

  const inputValue = values[name];

  useEffect(() => {
    const enteredInput = inputValue;

    // console.log('inside effect one');

    let suggestions = [];
    if (enteredInput.length > 0) {
      setIsDropdownOpen(true);
      // const regex = new RegExp(enteredInput, 'gi');

      suggestions = dropdownArray.filter((item) => {
        // const itemName = item.name.trim().toLowerCase();
        // const itemCode = item.code ? item.code.trim().toLowerCase() : '';
        // // const fullItem = `${itemName} (${itemCode})`;

        return item.label.trim().toLowerCase().includes(inputValue.trim().toLowerCase());
        // regex.test(item.name);
      });
    }

    setSuggestions(suggestions);
  }, [inputValue]);

  useEffect(() => {
    // console.log('inside effect two');
    if (suggestions.length === 0) setIsDropdownOpen(false);
  }, [suggestions]);

  useLayoutEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    // document.addEventListener('keydown', function (e) {
    //   handleEscKeyPress(e);
    //   // handleTabAndEnterKeyPress(e);
    // });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // document.removeEventListener('keydown', function (e) {
      //   handleEscKeyPress(e);
      //   // handleTabAndEnterKeyPress(e);
      // });
    };
  }, [inputValue]);

  const handleClickOutside = (e) => {
    const node = dropdownContainerRef.current;
    const clickedNode = e.target;

    if (node?.contains(clickedNode)) return;

    resetField();
  };

  const resetField = () => {
    if (inputValue.length > 0) {
      if (
        !selectedOption ||
        (selectedOption && inputValue.trim().toLowerCase() !== selectedOption.trim().toLowerCase())
      ) {
        setFieldValue(name, '');
        setFieldError(name, 'Please select an option haha');
        setSelectedOption('');
      }
    }
  };

  const handleClickOnItem = (item, setFieldValue) => {
    // const itemTextToDisplay = `${item.name}${item.code ? ` (${item.code})` : ''}`;

    setFieldValue(name, item);
    setSelectedOption(item.label);
    setSuggestions([]);
  };

  const handleBlur = () => {
    console.log('blur event occured');
    resetField();
  };

  const handleKeyPress = (e, item, setFieldValue) => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      handleClickOnItem(item, setFieldValue);
    }
  };

  const handleKeyboardNavigation = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        console.log('haha');
        console.log(dropdownListRef.current);
        isDropdownOpen
          ? setCursor((c) => (c < suggestions.length - 1 ? c + 1 : c))
          : setSuggestions([]);
        break;
      case 'ArrowUp':
        break;

      default:
        break;
    }
  };

  const renderDropdownItems = (setFieldValue) =>
    suggestions?.map((item) => {
      const dropdownItemClasses =
        String(item.name).trim().toLowerCase() === selectedOption.trim().toLowerCase()
          ? joinClassNames([
              DateDropdownStyles.dropdownItem,
              styles.dropdownItem,
              DateDropdownStyles.selected,
            ])
          : joinClassNames([DateDropdownStyles.dropdownItem, styles.dropdownItem]);

      return (
        <li key={item.name} className={dropdownItemClasses}>
          <button
            data-testid={`${name}-dropdown-item`}
            type='button'
            onKeyDown={(e) => handleKeyPress(e, item, setFieldValue)}
            onMouseDown={() => handleClickOnItem(item, setFieldValue)}
          >
            <TextHighlighter textToCompare={item.label} patternToMatch={inputValue} />
          </button>
        </li>
      );
    });

  return (
    <div
      ref={dropdownContainerRef}
      className={joinClassNames([DateDropdownStyles.container, styles.container])}
      {...rest}
    >
      <Input
        type='text'
        name={name}
        label={label}
        containerClass={styles.input}
        optionalText={optionalText}
        mainLabelTooltipBoxHeading={mainLabelTooltipBoxHeading}
        mainLabelTooltipBoxDescription={mainLabelTooltipBoxDescription}
        isRequired={isRequired}
        isDisabled={isDisabled}
        handleBlur={handleBlur}
        autoComplete='off'
        onKeyDown={handleKeyboardNavigation}
      />
      {isDropdownOpen && suggestions.length > 0 && (
        <ul
          ref={dropdownListRef}
          className={joinClassNames([
            DateDropdownStyles.dropdownContainer,
            styles.dropdownContainer,
          ])}
        >
          {renderDropdownItems(setFieldValue)}
        </ul>
      )}
    </div>
  );

  // return (
  //   <div
  //     ref={dropdownContainerRef}
  //     // onBlur={handleBlur}
  //     className={joinClassNames([DateDropdownStyles.container, styles.container])}
  //     {...rest}
  //   >
  //     <Field
  //       name={name}
  //       onBlur={handleBlur}
  //       autoComplete='off'
  //       onKeyDown={handleKeyboardNavigation}
  //     />
  //     {/* <Field name={name} /> */}
  //     <ErrorText containerClass={styles.errorContainer} fieldName={name} />

  //     <AdditionalInfo
  //       optionalText={optionalText}
  //       helpLinkText={helpLinkText}
  //       helpLink={helpLink}
  //       tooltipLinkText={tooltipLinkText}
  //       tooltipLink={tooltipLink}
  //     />
  //     {isDropdownOpen && suggestions.length > 0 && (
  //       <ul
  //         className={joinClassNames([
  //           DateDropdownStyles.dropdownContainer,
  //           styles.dropdownContainer,
  //         ])}
  //       >
  //         {renderDropdownItems(setFieldValue)}
  //       </ul>
  //     )}
  //   </div>
  // );
};

export default DropdownWithAutoComplete;

// "geographicalRegions": [
//     {
//     "regionName": "Australia",
//     "regionCode": "AU",
//     "order": 1,
//     "airports": [
//     {
//     "enabled": true,
//     "code": "ADL",
//     "name": "Adelaide",
//     "soundex": "Adelaide",
//     "stateCode": "SA",
//     "countryCode": "AU",
//     "countryName": "Australia",
//     "geoLocation": {
//     "latitude": "-34.95",
//     "longitude": "138.533333"
//     },
//     "timeZone": "Australia/Adelaide",
//     "icaoCode": "YPAD",
//     "effectiveFromDateTime": "2020-03-25T05:37:34.789Z",
//     "effectiveToDateTime": "2025-03-25T05:38:36.034Z",
//     "metaData": {
//     "acceptPointPlusPay": true
//     }
//     },
//     ]
//     }
//     ]
