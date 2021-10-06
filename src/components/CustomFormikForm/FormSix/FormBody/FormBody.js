import React from 'react';

import Button from '../../Button/Button';
import Input from '../../Input/Input';

const FormBody = (props) => {
  const { formik } = props;

  const handleKeyDown = (e) => {
    console.log(formik);
    formik.validateField('test');
    formik.setFieldError('test', 'custom error');
  };

  const handleClick = () => {
    console.log('clicked');
    formik.setFieldTouched('test');
    formik.setFieldError('test', 'custom error');
    formik.validateField('test');
    formik.setErrors({
      test: 'test error',
    });
  };

  return (
    <>
      <h1>Form 6</h1>
      <Input
        type='string'
        name='test'
        label='Test Input'
        optionalText='Optional'
        tooltipBoxBesideInputHeading='Permitted with no fee'
        tooltipBoxBesideInputDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
        onKeyDown={handleKeyDown}
      />

      <Button type='submit' label='Submit' theme='red' />
      <Button onClick={handleClick} type='button' label='CLick' theme='red' />
    </>
  );
};

export default FormBody;
