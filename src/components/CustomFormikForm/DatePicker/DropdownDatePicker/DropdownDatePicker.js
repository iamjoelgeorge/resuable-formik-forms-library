import { Field } from 'formik';
import React from 'react';

const DropdownDatePicker = (props) => {
  const { name, label, ...rest } = props;

  return (
    <div>
      <Field name={name} {...rest}>
        {({ form, field }) => {
          const { value } = field;
          const { setFieldValue } = form;

          return <div>test</div>;
        }}
      </Field>
    </div>
  );
};

export default DropdownDatePicker;
