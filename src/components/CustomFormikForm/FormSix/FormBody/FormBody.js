import React from 'react';

import Button from '../../Button/Button';
import Input from '../../Input/Input';

const FormBody = (props) => {
  const { formik } = props;

  const handleBlur = () => {
    // console.log('blur');

    setTimeout(() => {
      if (formik.values['test'] === 'blur') {
        formik.setFieldTouched('test');
        formik.setFieldError('test', 'custom error on blur');
      }
    }, 1000);
  };

  const handleClick = () => {
    // console.log('clicked');
    // console.log(formik.values['test']);

    setTimeout(() => {
      if (formik.values['test'] === 'click') {
        formik.setFieldTouched('test');
        formik.setFieldError('test', 'custom error haha');
      }
    }, 1000);
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
        autoComplete='off'
        customBlurFn={handleBlur}
      />

      <Button type='submit' label='Submit' theme='red' />
      <Button onClick={handleClick} type='button' label='CLick' theme='red' />
    </>
  );
};

export default FormBody;
