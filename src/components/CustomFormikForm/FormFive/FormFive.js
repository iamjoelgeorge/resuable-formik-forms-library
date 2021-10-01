import React from 'react';

import { names } from './constants';
import styles from '../FormTwo/FormTwo.module.scss';
import FormContainer from '../FormContainer/FormContainer';
import FormBody from './FormBody/FormBody';

const FormFive = () => {
  const initialValues = {
    [names.departureDate]: null,
    [names.calendarDate]: null,
    [names.autoComplete]: '',
    // [names.departureDate]: new Date('31 feb 2018'),
    // [names.testDate]: new Date(),
  };

  const validations = [
    {
      name: names.autoComplete,
      type: 'dropdown',
      isRequired: true,
      message: 'Please select an option',
    },
    {
      name: names.departureDate,
      type: 'dropdown_datepicker',
      isRequired: true,
      message: 'Please select a date.',
      // minDate: {
      //   date: new Date('12 Feb 2022'),
      //   message: 'Please select a date after 12 Feb 2000',
      // },
      // maxDate: {
      //   date: new Date('13 Feb 2021'),
      //   message: 'Please select a valid date before 12 Feb 2024',
      // },
      // maxDaysInThePast: { num: 2, message: 'Please select a valid date: past' },
      // maxDaysInTheFuture: { num: 2, message: 'Please select a valid date: future' },
    },
    {
      name: names.calendarDate,
      type: 'calendar_datepicker',
      isRequired: true,
      message: 'Please select a date.',
      // minDate: {
      //   date: new Date('12 Feb 2021'),
      //   message: 'Please select a date after 12 Feb 2021',
      // },
      // maxDate: {
      //   date: new Date('29 Oct 2021'),
      //   message: 'Please select a valid date before 29 Oct 2021',
      // },
      // maxDaysInThePast: { num: 2, message: 'Please select a valid date: past' },
      // maxDaysInTheFuture: { num: 2, message: 'Please select a valid date: future' },
    },
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
