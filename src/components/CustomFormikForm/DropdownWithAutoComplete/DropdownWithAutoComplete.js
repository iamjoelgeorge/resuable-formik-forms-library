import React, { useState } from 'react';

import styles from './DropdownWithAutoComplete.module.scss';
import { names } from '../FormFive/constants';
import Input from '../Input/Input';
import { useFormikContext } from 'formik';

const DropdownWithAutoComplete = (props) => {
  const {
    name,
    label,
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
  const { errors, touched, values } = useFormikContext();

  console.log(values[names.autoComplete]);

  const [suggestions, setSuggestions] = useState([]);

  return (
    <div {...rest}>
      <Input
        data-testid='name'
        type='text'
        name={names.autoComplete}
        label='Autocomplete Dropdown'
        containerClass={styles.input}
        optionalText='Optional Text'
        mainLabelTooltipBoxHeading='test'
        mainLabelTooltipBoxDescription='test'
        isRequired
      />
      <p>hi there</p>
    </div>
  );
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
