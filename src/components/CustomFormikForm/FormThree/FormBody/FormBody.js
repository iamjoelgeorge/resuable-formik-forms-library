import React from 'react';
import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';

const FormBody = (props) => {
  const { formik } = props;

  const isDisabled = !formik.values['newTab'];

  return (
    <>
      <h1>Form 3</h1>
      <Checkbox
        formik={formik}
        name='newTab'
        optionLabel='Checking this box will open the link in a new tab.'
        mainLabel='Test Label'
        isRequired
        tooltipLink='#'
        tooltipLinkText='This link is a tooltip, haha!'
      />

      <Button
        formik={formik}
        label='Open link in a new tab'
        variant='link'
        href='https://virginaustralia.com/'
        theme='red'
        isDisabled={isDisabled}
        showExternalLinkIcon
      />

      <Button
        formik={formik}
        label='Button as a link'
        variant='link_as_button'
        href='https://virginaustralia.com/'
        showExternalLinkIcon
      />

      <Button formik={formik} label='Submit' />
    </>
  );
};

export default FormBody;
