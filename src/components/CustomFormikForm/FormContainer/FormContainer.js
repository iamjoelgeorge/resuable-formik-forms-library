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

  const renderChildren = (child, formik) => {
    const childOfChild = child.props.children;
    const className = child.props.className;

    if (childOfChild?.props?.children) {
      return renderChildren(childOfChild, formik);
    }

    return (
      <div className={className}>
        {childOfChild.map((child) => {
          /*
              The error generated because of the key not being added can be ignored in this case
              because these elements will not be deleted/modified. The key is not added the the child
              because it is interfering with the focus event of the input field.
            */
          return cloneElement(child, { formik });
        })}
      </div>
    );
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {(formik) => {
        const childrenWithExtraProp = Children.map(children, (child) => {
          return child.props.children
            ? renderChildren(child, formik)
            : cloneElement(child, { formik });
        });
        return <Form className={containerClass}>{childrenWithExtraProp}</Form>;
      }}
    </Formik>
  );
};

export default FormContainer;
