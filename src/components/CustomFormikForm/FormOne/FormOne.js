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
    testCheckbox: false,
    license: false,
    idProofs: [],
    formOneRadioGroup: 'two',
    departureDate: null,
    returnDate: null,
    // departureDate: new Date(),
    // returnDate: new Date('29 feb 2018'),
  };

  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
  const fileSizeErrorMessage = `Only the following formats are allowed: ${SUPPORTED_FORMATS.join(
    ', ',
  )}`;

  const validations = [
    {
      name: 'name',
      type: 'string',
      isRequired: true,
      message: 'Enter your name',
      minChars: { num: 2, message: 'Please enter at least 2 characters' },
    },
    {
      name: 'email',
      type: 'email',
      isRequired: true,
      message: 'Enter the correct email id',
      minChars: { num: 2, message: 'Please enter at least 2 characters' },
      maxChars: { num: 150, message: 'You can only enter upto 150 characters' },
    },
    {
      name: 'testCheckbox',
      type: 'checkbox',
      isRequired: false,
      message: 'This is a required field',
    },
    {
      name: 'license',
      type: 'checkbox',
      isRequiredDependsOnField: 'testCheckbox',
      message: 'Do you have a license?',
    },
    {
      name: 'departureDate',
      type: 'calendar_datepicker',
      isRequired: true,
      message: 'Please select a date',
    },
    {
      name: 'description',
      type: 'string',
      // isRequired: true,
      isRequiredDependsOnField: 'testCheckbox',
      message: 'Please add a comment.',
      minChars: { num: 2, message: 'Please enter at least 2 characters' },
      maxChars: { num: 5, message: 'You can only enter upto 5 characters' },
    },
    {
      name: 'age',
      type: 'number',
      isRequired: true,
      message: 'Tell us your age',
    },
    {
      name: 'idProofs',
      type: 'file',
      isRequired: true,
      // isRequiredDependsOnField: 'testCheckbox',
      message: 'Please upload a file',
      formats: {
        formats: SUPPORTED_FORMATS,
        message: fileSizeErrorMessage,
      },
      maxSize: 217100001,
    },
  ];

  const handleSubmit = (values, formikMethods) => {
    // formikMethods.resetForm();
    console.log('Form 1 submitted:', values);
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

export default FormOne;
