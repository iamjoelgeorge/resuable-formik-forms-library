import React from 'react';
import { useSelector } from 'react-redux';
import CustomInput from '../CustomInput/CustomInput';

const CustomForm = (initialValues) => {
  const formData = useSelector((state) => state.form);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput value={initialValues.firstName} name='firstName' label={'Firstname'} />
      <CustomInput value={initialValues.lastName} name='lastName' label='Last Name' />
      <CustomInput value={initialValues.email} name='email' label='Email' />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default CustomForm;
