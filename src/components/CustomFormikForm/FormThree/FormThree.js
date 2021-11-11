/* eslint-disable */

import React from 'react';

import styles from './FormThree.module.scss';
import FormContainer from '../FormContainer/FormContainer';
import FormBody from './FormBody/FormBody';
import { getDateAsString } from '../../../utils/utils';

const FormThree = () => {
  const initialValues = {
    newTab: false,
  };

  const validations = [
    {
      name: 'newTab',
      type: 'checkbox',
      isRequired: true,
      message: 'You need to agree to our Terms and Conditions.',
    },
  ];

  const handleSubmit = (values) => console.log('Form 3 submitted:', values);
  console.log(getDateAsString(new Date()))
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

export default FormThree;
