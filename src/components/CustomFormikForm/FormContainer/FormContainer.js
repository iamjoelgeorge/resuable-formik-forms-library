import React, { Children, cloneElement } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { validateInput } from '../../../utils/validateInput';

const FormContainer = (props) => {
  const { initialValues, children, validations, containerClass, onSubmit } = props;

  const validationObject = {};
  validations.forEach((item) => {
    validateInput(item, validationObject);
  });

  const validationSchema = Yup.object().shape(validationObject);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {(formik) => {
        const childrenWithExtraProp = Children.map(children, (child) =>
          cloneElement(child, { formik }),
        );
        return <Form className={containerClass}>{childrenWithExtraProp}</Form>;
      }}
    </Formik>
  );
};

export default FormContainer;
