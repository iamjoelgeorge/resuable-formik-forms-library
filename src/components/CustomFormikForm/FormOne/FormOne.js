/* eslint-disable */

import React from 'react';

import styles from './FormOne.module.scss';
import Button from '../../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import DatePicker from '../DatePicker/DatePicker';
import FileUploadInput from '../FileUploadInput/FileUploadInput';
import FormContainer from '../FormContainer/FormContainer';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import Test from '../Test/Test';

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

  const checkBoxOption = [{ label: 'Do you have a license? haha.', value: false }];

  const handleSubmit = (values) => console.log('Test Submit', values);

  return (
    <FormContainer
      initialValues={initialValues}
      validations={validations}
      containerClass={styles.container}
      onSubmit={handleSubmit}
    >
      {/* <Test /> */}
      <Input type='test' name='test' label='Disabled Input' disabled />
      <div>
        <div className={styles.testContainer}>
          <Input type='name' name='name' label='Name' />
          <Input
            type='text'
            name='age'
            label='Age (with placeholder)'
            placeholder='Tell us how old you are'
            tooltipLinkText='This is a Tooltip link?'
            tooltipLink='#'
          />
        </div>
      </div>

      <Input
        type='email'
        name='email'
        label='Email'
        helpLink='#'
        helpLinkText='This is a Help link?'
        isRequired
        showTooltipIcon
        tooltipIconHeading='Permitted with no fee'
        tooltipIconContent='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
      />
      <DatePicker name='departureDate' label='Departure Date' />
      <DatePicker name='returnDate' dropdown label='Return Date' />
      <Input type='test' name='test' label='Test Input' />
      <Textarea name='description' label='Additional Details' />
      <Checkbox name='license' label='Do you have a license?' options={checkBoxOption} />
      <FileUploadInput name='idProofs' label='Upload your documents' />

      <Button type='submit' />
    </FormContainer>
  );
};

export default FormOne;
