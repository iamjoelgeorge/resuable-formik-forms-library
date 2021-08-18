import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../redux/formSlice';

const CustomInput = (props) => {
  const { value, name, label } = props;

  const [input, setInput] = useState(value);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const data = {};
    data[name] = e.target.value;
    setInput(e.target.value);

    dispatch(setFormData(data));
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input name={name} type='text' id={name} value={input} onChange={handleChange} />
    </div>
  );
};

export default CustomInput;
