import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import './TestForm.css';

const initialValues = {
  name: '',
  age: '',
  year: '',
};

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = Yup.object({
  name: Yup.string().required('Enter your name, dude!'),
  age: Yup.number().min(20).required('You must be older than 20.'),
  year: Yup.number().min(2000).required('Enter a year after 2000'),
});

const validate = (values) => {
  const { name, age, year } = values;
  let errors = {};

  if (!name) errors.name = 'Please enter your name.';
  if (age < 20) errors.age = 'You must be older that 20 years.';
  if (year < 2000) errors.year = 'Enter a year after 2000.';

  return errors;
};

const TestForm = () => {
  return (
    <div className='form-container'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='form'>
          <label htmlFor='name'>Name</label>
          <Field type='text' id='name' name='name' />
          <ErrorMessage className='error' name='name' component="p" />

          <label htmlFor='age'>Age</label>
          <Field type='text' id='age' name='age' />
          <ErrorMessage className='error' name='age' component="p" />

          <label htmlFor='year'>year</label>
          <Field type='text' id='year' name='year' />
          <ErrorMessage className='error' name='year' component="p" />

          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default TestForm;
