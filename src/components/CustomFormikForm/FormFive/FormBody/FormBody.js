import React from 'react';

import Button from '../../Button/Button';
import DatePicker from '../../DatePicker/DatePicker';
import DropdownWithAutoComplete from '../../DropdownWithAutoComplete/DropdownWithAutoComplete';
import { names } from '../constants';

const FormBody = (props) => {
  const { formik } = props;

  return (
    <>
      <h1>Form 5</h1>
      <DatePicker
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
        isRequired
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
      />

      <DropdownWithAutoComplete
        name={names.autoComplete}
        mainLabelTooltipBoxHeading='test'
        mainLabelTooltipBoxDescription='test'
      />

      <Button type='submit' label='Submit' theme='red' />
    </>
  );
};

export default FormBody;
