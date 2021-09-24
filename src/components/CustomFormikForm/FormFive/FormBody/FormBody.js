import React from 'react';

import Button from '../../Button/Button';
import DatePicker from '../../DatePicker/DatePicker';

const FormBody = (props) => {
  const { formik } = props;

  return (
    <>
      <h1>Form 5</h1>
      <DatePicker
        formik={formik}
        name='departureDate'
        label='Departure Date'
        isDropdown
        minDate={new Date('12 Feb 2000')}
        // maxDate={new Date('12 Feb 2024')}
        maxDaysInTheFuture={365}
        // maxDaysInThePast={400}
        // optionalText='Optional'
        // helpLink='#'
        // helpLinkText='This link is for your help'
        tooltipLink='https://www.google.com'
        tooltipLinkText='Visit Google to know more.'
        // labelTooltipBoxHeading='Permitted with no fee'
        // labelTooltipBoxDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
        // isRequired
        // isDisabled
      />

      <Button formik={formik} type='submit' label='Submit' theme='red' />
    </>
  );
};

export default FormBody;
