import React from 'react';
import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';
import CheckboxGroup from '../../Checkbox/CheckboxGroup/CheckboxGroup';
import Input from '../../Input/Input';

const FormBody = (props) => {
  const { formik } = props;

  //   console.log(formik);
  const checkboxOptions = [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    {
      label: 'Three',
      value: 'three',
      tooltip: {
        heading: 'Heading',
        customDescriptionElement: (
          <p>
            I'm a custom description Element. Look me up on{' '}
            <a href='https://www.google.com'>Google</a>
          </p>
        ),
      },
    },
  ];

  const showHiddenCheckbox = formik.values['checkboxGroup'].includes('three');

  return (
    <>
      <h1>Form 4</h1>
      <Input
        formik={formik}
        type='text'
        name='name'
        label='Name'
        optionalText='Enter your name'
        isRequired
      />
      <CheckboxGroup
        name='checkboxGroup'
        options={checkboxOptions}
        formik={formik}
        mainLabel='Checkbox Group'
        mainLabelTooltipBoxHeading='What is Lorem Ipsum?'
        mainLabelTooltipBoxDescription='Lorem Ipsum is simply dummy text.'
        tooltipLink='#'
        tooltipLinkText='This link is a tooltip, haha!'
        isRequired
      />

      {showHiddenCheckbox && (
        <Checkbox
          formik={formik}
          name='testCheckbox'
          optionLabel='Test Checkbox'
          mainLabel='Test Label'
        />
      )}

      <Button label='Submit' formik={formik} />
    </>
  );
};

export default FormBody;
