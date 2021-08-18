/* eslint-disable */
import React from 'react';
import Button from '../../Button/Button';
import FormContainer from '../FormContainer/FormContainer';
import FormControl from '../FormControl/FormControl';

import styles from './FormOne.module.scss';

const FormOne = () => {
  const initialValues = {
    name: '',
    email: '',
    age: '',
    test: '',
    description: '',
    license: false,
    idProof: '',
    date: new Date(),
  };
  const validations = [
    {
      name: 'email',
      type: 'email',
      isRequired: true,
      message: 'Enter the correct email id',
    },
    {
      name: 'age',
      type: 'number',
      isRequired: true,
      message: 'Please enter your age',
    },
    {
      name: 'description',
      type: 'string',
      isRequired: false,
      message: 'Test error message description',
    },
  ];

  const handleSubmit = (values) => console.log('Test Submit', values);

  return (
    <FormContainer
      initialValues={initialValues}
      validations={validations}
      containerClass={styles.container}
      onSubmit={handleSubmit}
    >
      <FormControl control='input' type='name' name='name' label='Name' />
      <FormControl
        control='input'
        type='email'
        name='email'
        label='Email (with tooltip)'
        showTooltip
      />
      <FormControl
        control='input'
        type='text'
        name='age'
        label='Age (with placeholder)'
        placeholder='Tell us how old you are'
      />
      <FormControl control='input' type='test' name='test' label='Disabled Input' disabled />
      <FormControl control='textarea' name='description' label='Description' />
      <FormControl control='checkbox' name='license' label='Do you have a license?' />
      <FormControl control='file' name='idProof' />
      <FormControl control='datePicker' name='date' />

      <Button type='submit' />
    </FormContainer>
  );
};

export default FormOne;
