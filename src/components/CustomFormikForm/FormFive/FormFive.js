/* eslint-disable */

import React from 'react';

import styles from '../FormTwo/FormTwo.module.scss';
import FormContainer from '../FormContainer/FormContainer';
import FormBody from './FormBody/FormBody';

const FormFive = () => {
  const initialValues = {
    departureDate: null,
  };

  const validations = [
    // {
    //   name: 'terms',
    //   type: 'checkbox',
    //   isRequired: true,
    //   message: 'You need to agree to our Terms and Conditions.',
    // },
  ];

  const handleSubmit = (values) => console.log('Form 5 submitted:', values);

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

export default FormFive;
