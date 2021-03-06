/* eslint-disable */

import React from 'react';

import styles from './FormFour.module.scss';
import FormContainer from '../FormContainer/FormContainer';
import FormBody from './FormBody/FormBody';

const FormFour = () => {
  const initialValues = {
    name: '',
    checkboxGroup: [],
    radioGroup: '',
    // radioGroup: 'three', // Default checked value
    // checkboxGroup: ['two', 'eight'], // Default checked value
  };

  const validations = [
    {
      name: 'checkboxGroup',
      type: 'checkbox_group',
      // isRequired: true,
      isRequiredDependsOnField: 'name',
      message: 'Please select at least one option.',
    },
    {
      name: 'radioGroup',
      type: 'radio_button_group',
      // isRequired: false,
      isRequiredDependsOnField: 'name',
      message: 'Please select an option.',
    },
    {
      name: 'name',
      type: 'string',
      isRequired: false,
      message: 'Please enter your name.',
    },
  ];

  const handleSubmit = (values) => console.log('Form 4 submitted:', values);

  return (
    <FormContainer
      initialValues={initialValues}
      validations={validations}
      containerClass={styles.container}
      onSubmit={handleSubmit}
    >
      <FormBody />
    </FormContainer>
  );
};

export default FormFour;
