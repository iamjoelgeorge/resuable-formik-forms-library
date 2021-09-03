/* eslint-disable */

import React from 'react';

import styles from './FormTwo.module.scss';
import FormContainer from '../FormContainer/FormContainer';
import FormBody from './FormBody/FormBody';

const FormTwo = () => {
  const initialValues = {
    terms: false,
  };

  const validations = [
    {
      name: 'terms',
      type: 'checkbox',
      isRequired: true,
      message: 'You need to agree to our Terms and Conditions.',
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
