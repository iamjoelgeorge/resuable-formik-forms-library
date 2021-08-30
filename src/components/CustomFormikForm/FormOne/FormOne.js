/* eslint-disable */
import { Field } from 'formik';
import React from 'react';
import Button from '../../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import DatePicker from '../DatePicker/DatePicker';
import FileUploadInput from '../FileUploadInput/FileUploadInput';
import FormContainer from '../FormContainer/FormContainer';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';

import styles from './FormOne.module.scss';

const FormOne = () => {
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

  const handleSubmit = (values) => console.log('Test Submit', values);

  return (
    <FormContainer
      initialValues={initialValues}
      validations={validations}
      containerClass={styles.container}
      onSubmit={handleSubmit}
    >
      <Input type='test' name='test' label='Disabled Input' disabled />
      <div>
        <div className={styles.testContainer}>
          <div>
            <div>
              <Input type='name' name='name' label='Name' />
              <Input type='email' name='email' label='Email (with tooltip)' showTooltip />
            </div>
          </div>
        </div>
      </div>

      <Input
        type='text'
        name='age'
        label='Age (with placeholder)'
        placeholder='Tell us how old you are'
      />
      <DatePicker name='departureDate' label='Departure Date' />
      <DatePicker name='returnDate' dropdown label='Return Date' />
      <Textarea name='description' label='Description' />
      <Checkbox name='license' label='Do you have a license?' />
      <FileUploadInput name='idProofs' label='Upload your documents' />

      <Button type='submit' />
    </FormContainer>
  );
};

export default FormOne;
