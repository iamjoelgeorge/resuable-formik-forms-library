import React from 'react';

import styles from './FormOne.module.scss';
import FormContainer from '../FormContainer/FormContainer';
import FormBody from './FormBody/FormBody';

const FormOne = () => {
  const initialValues = {
    name: '',
    email: '',
    age: '',
    test: '',
    description: '',
    license: false,
    idProofs: [],
    formOneRadioGroup: 'two',
    departureDate: new Date(),
    returnDate: new Date(),
  };

  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
  const fileSizeErrorMessage = `Only the following formats are allowed: ${SUPPORTED_FORMATS.join(
    ', ',
  )}`;

  const validations = [
    {
      name: 'name',
      type: 'string',
      isRequired: false,
      message: 'Enter your name',
      minChars: { num: 2, message: 'Please enter at least 2 characters' },
    },
    // {
    //   name: 'email',
    //   type: 'email',
    //   isRequired: true,
    //   message: 'Enter the correct email id',
    // },
    // {
    //   name: 'description',
    //   type: 'string',
    //   isRequired: false,
    //   message: 'Please add a comment.',
    //   minChars: { num: 2, message: 'Please enter at least 2 characters' },
    //   maxChars: { num: 5, message: 'You can only enter upto 5 characters' },
    // },
    // {
    //   name: 'age',
    //   type: 'number',
    //   isRequired: true,
    //   message: 'Tell us your age',
    // },
    {
      name: 'idProofs',
      type: 'file',
      isRequired: true,
      message: 'Please upload a file',
      formats: {
        formats: SUPPORTED_FORMATS,
        message: fileSizeErrorMessage,
      },
      maxSize: 217100001,
    },
  ];

  const handleSubmit = (values) => console.log('Form 1 submitted:', values);

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

export default FormOne;
