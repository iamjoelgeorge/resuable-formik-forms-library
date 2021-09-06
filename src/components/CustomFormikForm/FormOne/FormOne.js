/* eslint-disable */

import React from 'react';

import styles from './FormOne.module.scss';
import Checkbox from '../Checkbox/Checkbox';
import DatePicker from '../DatePicker/DatePicker';
import FileUploadInput from '../FileUploadInput/FileUploadInput';
import FormContainer from '../FormContainer/FormContainer';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import FormBody from './FormBody/FormBody';

const FormOne = (props) => {
  const initialValues = {
    name: '',
    email: '',
    age: '',
    test: '',
    description: '',
    license: false,
    idProofs: [],
    departureDate: new Date(),
    returnDate: new Date(),
  };

  const validations = [
    {
      name: 'email',
      type: 'email',
      isRequired: true,
      message: 'Enter the correct email id',
    },
    // {
    //   name: 'description',
    //   type: 'string',
    //   isRequired: false,
    //   message: 'Test error message description',
    // },
    // {
    //   name: 'age',
    //   type: 'number',
    //   isRequired: true,
    //   message: 'Tell us your age',
    // },
    // {
    //   name: 'idProofs',
    //   type: 'file',
    //   isRequired: true,
    //   message: 'You can only upload png images.',
    // },
    // {
    //   name: 'description',
    //   type: 'string',
    //   isRequired: true,
    //   message: 'Please add a comment.',
    // },
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
