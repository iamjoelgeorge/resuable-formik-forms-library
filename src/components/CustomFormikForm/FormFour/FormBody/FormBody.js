import React from 'react';

import PropTypes from 'prop-types';

import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';
import CheckboxGroup from '../../Checkbox/CheckboxGroup/CheckboxGroup';
import Input from '../../Input/Input';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';
import { STRINGS } from '../../../../constants/strings';

const FormBody = (props) => {
  const { formik } = props;

  const testElement = (
    <p>
      {STRINGS.formOne.customDescription}{' '}
      <a href='https://www.google.com' target='_blank' rel='noreferrer'>
        {STRINGS.formOne.google}
      </a>
    </p>
  );

  const checkboxOptions = [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    {
      label: 'Three',
      value: 'three',
      tooltip: {
        heading: 'Heading',
        customDescriptionElement: testElement,
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
        customDescriptionElement: testElement,
      },
    },
  ];

  const showHiddenCheckbox = formik.values.checkboxGroup.includes('three');

  return (
    <>
      <h1>Form 4</h1>
      <Input type='text' name='name' label='Name' optionalText='Enter your name' isRequired />
      <CheckboxGroup
        name='checkboxGroup'
        options={checkboxOptions}
        mainLabel='Checkbox Group'
        mainLabelTooltipBoxHeading='What is Lorem Ipsum?'
        mainLabelTooltipBoxDescription='Lorem Ipsum is simply dummy text.'
        optionalText='This is a very important step that you are taking!'
        isRequired
      />

      <RadioButtonGroup
        name='radioGroup'
        options={radioOptions}
        mainLabel='Radio Group'
        mainLabelTooltipBoxHeading='What is Lorem Ipsum?'
        mainLabelTooltipBoxDescription='Lorem Ipsum is simply dummy text.'
        tooltipLink='https://www.google.com'
        tooltipLinkText='Visit Google to know more.'
        isRequired
      />

      {showHiddenCheckbox && (
        <Checkbox name='testCheckbox' optionLabel='Test Checkbox' mainLabel='Test Label' />
      )}

      <Button label='Submit' />
    </>
  );
};

FormBody.propTypes = {
  formik: PropTypes.shape({
    values: PropTypes.shape({}),
  }),
};

FormBody.defaultProps = {
  formik: {
    values: {},
  },
};

export default FormBody;
