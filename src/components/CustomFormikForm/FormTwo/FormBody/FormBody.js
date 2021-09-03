import React from 'react';
import Button from '../../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';

const FormBody = (props) => {
  const { formik } = props;

  return (
    <>
      <h1>Form 2</h1>
      <Checkbox
        formik={formik}
        name='terms'
        optionLabel='I agree to the Terms and Conditions.'
        mainLabel='Terms and Conditions'
        mainLabelTooltipBoxHeading='What is Lorem Ipsum?'
        mainLabelTooltipBoxDescription='Lorem Ipsum is simply dummy text.'
        isRequired
        tooltipLink='#'
        tooltipLinkText='This link is a tooltip, haha!'
      />
      <Button type='submit' disabled={!(formik.dirty && formik.isValid)} />
    </>
  );
};

export default FormBody;
