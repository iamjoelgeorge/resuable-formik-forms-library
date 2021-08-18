import React from 'react';
import { useFormik } from 'formik';
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
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className='form-container'>
      <form className='form' onSubmit={formik.handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' {...formik.getFieldProps('name')} />
        {formik.errors.name && formik.touched.name ? (
          <p style={{ color: 'red' }}>{formik.errors.name}</p>
        ) : null}

        <label htmlFor='age'>Age</label>
        <input type='text' id='age' name='age' {...formik.getFieldProps('age')} />
        {formik.errors.age && formik.touched.age ? (
          <p style={{ color: 'red' }}>{formik.errors.age}</p>
        ) : null}

        <label htmlFor='year'>year</label>
        <input type='text' id='year' name='year' {...formik.getFieldProps('year')} />
        {formik.errors.year && formik.touched.year ? (
          <p style={{ color: 'red' }}>{formik.errors.year}</p>
        ) : null}

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default TestForm;
