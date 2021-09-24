import React from 'react';

import { names } from './constants';
import styles from '../FormTwo/FormTwo.module.scss';
import FormContainer from '../FormContainer/FormContainer';
import FormBody from './FormBody/FormBody';

const FormFive = () => {
  const initialValues = {
    [names.departureDate]: null,
    [names.testDate]: null,
    // [names.departureDate]: new Date('31 feb 2018'),
    // [names.testDate]: new Date(),
  };

  const validations = [
    {
      name: names.departureDate,
      type: 'dropdown_datepicker',
      isRequired: true,
      message: 'Please select a date.',
      minDate: {
        date: new Date('12 Feb 2000'),
        message: 'Please select a date after 12 Feb 2000',
      },
      maxDate: {
        date: new Date('13 Feb 2024'),
        message: 'Please select a valid date before 12 Feb 2024',
      },
      minDaysInTheFuture: { num: 2, message: 'Please select a valid date' },
      maxDaysInTheFuture: { num: 2, message: 'Please select a valid date' },
    },
    // {
    //   name: names.testDate,
    //   type: 'calendar_datepicker',
    //   isRequired: true,
    //   message: 'Please select a date.',
    //   minDate: {
    //     date: new Date(),
    //     message: 'Please select a date after 12 Feb 2000',
    //   },
    //   maxDate: {
    //     date: new Date('29 Oct 2021'),
    //     message: 'Please select a valid date before 12 Feb 2024',
    //   },
    //   minDaysInTheFuture: { num: 2, message: 'Please select a valid date' },
    //   maxDaysInTheFuture: { num: 2, message: 'Please select a valid date' },
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
