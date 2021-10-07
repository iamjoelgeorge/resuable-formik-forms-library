import React from 'react';

import Button from '../../Button/Button';
import DatePicker from '../../DatePicker/DatePicker';
import Dropdown from '../../DropdownWithAutoComplete/Dropdown/Dropdown';
import DropdownWithAutoComplete from '../../DropdownWithAutoComplete/DropdownWithAutoComplete';

import { names } from '../constants';

const FormBody = (props) => {
  const { formik } = props;

  // const dropdownArray = [
  //   {
  //     name: 'Hamilton Island',
  //     code: 'HTI',
  //   },
  //   {
  //     name: 'Rockhampton',
  //     code: 'ROK',
  //   },
  //   {
  //     name: 'Hamilton',
  //     code: 'HLZ',
  //   },
  //   {
  //     name: 'Adelaide',
  //     code: 'ADL',
  //   },
  //   {
  //     name: 'Texas',
  //     code: 'TXS',
  //   },
  //   {
  //     id: '',
  //     label: '',
  //     value: '',
  //   }
  // ];

  const dropdownArray = [
    {
      label: 'Hamilton Island (HTI)',
      value: 'Hamilton Island (HTI)',
    },
    {
      label: 'Rockhampton (ROK)',
      value: 'Rockhampton (ROK)',
    },
    {
      label: 'Hamilton (HLZ)',
      value: 'Hamilton (HLZ)',
    },
    {
      label: 'Adelaide (ADL)',
      value: 'Adelaide (ADL)',
    },
    {
      label: 'Texas (TXS)',
      value: 'Texas (TXS)',
    },
    {
      label: 'Bangalore (BNR)',
      value: 'Bangalore (BNR)',
    },
    {
      label: 'Los Angeles (LAX)',
      value: 'Los Angeles (LAX)',
    },
    {
      label: 'Nowhere (NWR)',
      value: 'Nowhere (NWR)',
    },
    {
      label: 'Somewhere (SWR)',
      value: 'Somewhere (SWR)',
    },
    {
      label: 'Home (HME)',
      value: 'Home (HME)',
    },
  ];

  return (
    <>
      <h1>Form 5</h1>
      {/* <DatePicker
        name={names.calendarDate}
        label='Test Date'
        // minDate={new Date('3 Aug 2021')}
        // maxDate={new Date('29 Oct 2021')}
        // maxDaysInTheFuture={5}
        // maxDaysInThePast={10}
        optionalText='Optional'
        // helpLink='#'
        // helpLinkText='This link is for your help'
        // tooltipLink='https://www.google.com'
        // tooltipLinkText='Visit Google to know more.'
        // mainLabelTooltipBoxHeading='Permitted with no fee'
        // mainLabelTooltipBoxDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
        // isRequired
        // isDisabled
      />
      <DatePicker
        name={names.departureDate}
        label='Departure Date'
        isDropdown
        minDate={new Date('3 Feb 2000')}
        // maxDate={new Date('12 Feb 2024')}
        // maxDaysInTheFuture={365}
        // maxDaysInThePast={900}
        // optionalText='Optional'
        // helpLink='#'
        // helpLinkText='This link is for your help'
        tooltipLink='https://www.google.com'
        tooltipLinkText='Visit Google to know more.'
        mainLabelTooltipBoxHeading='Permitted with no fee'
        mainLabelTooltipBoxDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
        isRequired
        // isDisabled
      /> */}

      {/* <DropdownWithAutoComplete
        name={names.autoComplete}
        label='Autocomplete'
        dropdownArray={dropdownArray}
        optionalText='Optional test'
        isRequired
        // mainLabelTooltipBoxHeading='Permitted with no fee'
        // mainLabelTooltipBoxDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
      /> */}

      <Dropdown
        label='Region Autocomplete'
        name={names.autoComplete}
        dropdownArray={dropdownArray}
        defaultValue={dropdownArray[4]}
        isRequired
        // isDisabled
        // placeholder='Please select your region'
        optionalText='Optional test'
        isSearchable
        // mainLabelTooltipBoxHeading='Permitted with no fee'
        // mainLabelTooltipBoxDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
      />

      <Button type='submit' label='Submit' theme='red' />
    </>
  );
};

export default FormBody;
