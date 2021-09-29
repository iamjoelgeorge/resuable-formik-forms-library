import React, { Children, cloneElement } from 'react';

import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './FormContainer.module.scss';
import { validateInput } from '../../../utils/validateInput';

const FormContainer = (props) => {
  const { initialValues, children, validations, containerClass, onSubmit, ...rest } = props;

  const validationObject = {};
  validations.forEach((item) => {
    validateInput(item, validationObject);
  });

  const validationSchema = Yup.object().shape(validationObject);

  const renderChildren = (child, formik) => {
    const childOfChild = child.props.children;
    const { className } = child.props;

    if (childOfChild?.props?.children) {
      return renderChildren(childOfChild, formik);
    }

    return (
      <div className={className}>
        {childOfChild?.length
          ? /*
            The error generated because of the key not being added can be ignored in this case
            because these elements will not be deleted/modified. The key is not added the the child
            because it is interfering with the focus event of the input field.
          */
            childOfChild?.map((childElement) => cloneElement(childElement, { formik }))
          : cloneElement(childOfChild, { formik })}
      </div>
    );
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {(formik) => {
        const childrenWithExtraProp = Children.map(children, (child) => {
          return child?.props?.children
            ? renderChildren(child, formik)
            : cloneElement(child, { formik });
        });
        return (
          <Form className={containerClass} {...rest}>
            {childrenWithExtraProp}
          </Form>
        );
      }}
    </Formik>
  );
};

FormContainer.propTypes = {
  initialValues: PropTypes.shape({}),
  children: PropTypes.element,
  validations: PropTypes.array,
  containerClass: PropTypes.string,
  onSubmit: PropTypes.func,
};

FormContainer.defaultProps = {
  initialValues: {},
  children: null,
  validations: [],
  containerClass: '',
  onSubmit: () => {},
};

export default FormContainer;
