/* eslint-disable */

import React from 'react';

import styles from './FormTwo.module.scss';
import FormContainer from '../FormContainer/FormContainer';
import FormBody from './FormBody/FormBody';

const FormTwo = () => {
  const initialValues = {
    terms: false,
    // salutation: '',
    other: '',
  };

  const validations = [
    {
      name: 'terms',
      type: 'checkbox',
      isRequired: false,
      message: 'You need to agree to our Terms and Conditions.',
    },
    {
      name: 'other',
      type: 'positive_integer_including_zero',
      dependOn: 'terms',
      isRequired: true,
      message: 'This field is required',
      minChars: { num: 2, message: 'Please enter at least 2' },
      maxChars: { num: 5, message: 'You can only enter upto 5' },
    },
    {
      name: 'salutation',
      type: 'custom_dropdown',
      isRequired: true,
      message: 'Please select how you would like to be addressed.',
    },
  ];

  const handleSubmit = (values) => console.log('Form 2 submitted:', values);

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

export default FormTwo;
