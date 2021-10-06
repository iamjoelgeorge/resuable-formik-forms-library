import React from 'react';

import styles from '../FormTwo/FormTwo.module.scss';
import FormBody from './FormBody/FormBody';
import FormContainer from '../FormContainer/FormContainer';

const FormSix = () => {
  const initialValues = {
    test: '',
  };

  const validations = [
    {
      name: 'test',
      type: 'string',
      isRequired: true,
      message: 'Please select an option',
    },
  ];

  const handleSubmit = (values, formikMethods) => {
    console.log(formikMethods);
    console.log('Form 5 submitted:', values);

    setTimeout(() => {
      if (values['test'] === 'a') {
        formikMethods.setFieldError('test', 'custom error after submit');
      }
    }, 1000);
  };

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

export default FormSix;
