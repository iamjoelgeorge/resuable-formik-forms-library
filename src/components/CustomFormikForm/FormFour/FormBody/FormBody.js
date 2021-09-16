import React from 'react';
import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';
import CheckboxGroup from '../../Checkbox/CheckboxGroup/CheckboxGroup';
import Input from '../../Input/Input';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';

const FormBody = (props) => {
  const { formik } = props;

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
    { label: 'four', value: 'four' },
    { label: 'five', value: 'five' },
    { label: 'six', value: 'six' },
    { label: 'seven', value: 'seven' },
    {
      label: 'eight',
      value: 'eight',
      tooltip: {
        heading: 'Heading',
        description: 'Test Description',
      },
    },
  ];

  const radioOptions = [
    { label: 'One Radio', value: 'one' },
    { label: 'Two Radio', value: 'two' },
    {
      label: 'Three Radio',
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
        optionalText='This is a very important step that you are taking!'
        isRequired
      />

      <RadioButtonGroup
        name='radioGroup'
        options={radioOptions}
        formik={formik}
        mainLabel='Radio Group'
        mainLabelTooltipBoxHeading='What is Lorem Ipsum?'
        mainLabelTooltipBoxDescription='Lorem Ipsum is simply dummy text.'
        tooltipLink='https://www.google.com'
        tooltipLinkText='Visit Google to know more.'
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
