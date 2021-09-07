/* eslint-disable */

import React from 'react';

import styles from './FormFour.module.scss';
import FormContainer from '../FormContainer/FormContainer';
import FormBody from './FormBody/FormBody';

const FormFour = () => {
  const initialValues = {
    // checkboxGroup: [],
    name: '',
    testCheckbox: false,
    checkboxGroup: ['two'],
  };

  const validations = [
    // {
    //   name: 'checkboxGroup',
    //   type: 'checkbox',
    //   isRequired: true,
    //   message: 'You need to agree to our Terms and Conditions.',
    // },
    {
      name: 'name',
      type: 'string',
      isRequired: true,
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
