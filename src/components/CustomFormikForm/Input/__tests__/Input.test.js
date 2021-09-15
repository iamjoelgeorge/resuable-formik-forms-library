import React from 'react';
import { fireEvent, wait, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom/extend-expect';

import renderer from 'react-test-renderer';
import { useField, connect, Formik, Form, Field } from 'formik';
import Input from '../Input.js';
import FormContainer from '../../FormContainer/FormContainer';

jest.mock('formik');

const mockMeta = {
  touched: false,
  error: '',
  initialError: '',
  initialTouched: false,
  initialValue: '',
  value: '',
};

const mockField = {
  value: '',
  checked: false,
  onChange: jest.fn(),
  onBlur: jest.fn(),
  multiple: undefined,
  name: 'test',
};

useField.mockReturnValue([mockField, mockMeta]);

const defaultProps = {
  name: 'name',
  label: 'Name',
  placeholder: '',
  containerClass: '',
  tooltipIconBoxHeading: '',
  tooltipIconBoxDescription: '',
  tooltipIconChildElement: null,
  tooltipLink: '',
  tooltipLinkText: '',
  helpLinkText: '',
  helpLink: '',
  optionalText: '',
  disabled: false,
  isRequired: false,
  formik: {
    ...mockMeta,
    ...mockField,
    values: { name: '' },
    errors: {
      test: '',
    },
  },
};

const initialValues = { age: '' };
const validations = [];
const handleSubmit = jest.fn();

const FormBody = () => (
  <Input
    //   formik={formik}
    type='text'
    name='age'
    label='Age (with placeholder)'
    placeholder='Tell us how old you are'
    tooltipLinkText='This is a Tooltip link?'
    tooltipLink='#'
  />
);

const TestComponent = () => (
  <FormContainer initialValues={initialValues} validations={validations} onSubmit={handleSubmit}>
    <FormBody />
  </FormContainer>
);

afterEach(cleanup);
describe('[Component]: Input', () => {
  //   it('should match the Snapshot', () => {
  //     const component = (
  //       <FormContainer
  //         initialValues={initialValues}
  //         validations={validations}
  //         onSubmit={handleSubmit}
  //       >
  //         <Input
  //           //   formik={formik}
  //           type='text'
  //           name='age'
  //           label='Age (with placeholder)'
  //           placeholder='Tell us how old you are'
  //           tooltipLinkText='This is a Tooltip link?'
  //           tooltipLink='#'
  //         />
  //       </FormContainer>
  //     );
  //     console.log('test component', component);
  //     const tree = renderer.create(component).toJSON();
  //     // console.log(render(<Input {...defaultProps} />));
  //     expect(tree).toMatchSnapshot();
  //   });

  it('should match the Snapshot', () => {
    console.log('test component', <TestComponent />);
    const tree = renderer.create(<TestComponent />).toJSON();
    // console.log(render(<Input {...defaultProps} />));
    expect(tree).toMatchSnapshot();
  });

  //   it('should render the input correctly', () => {
  //     const props = {
  //       ...defaultProps,
  //     };

  //     // const component = (
  //     //   <FormContainer
  //     //     initialValues={initialValues}
  //     //     validations={validations}
  //     //     onSubmit={handleSubmit}
  //     //   >
  //     //     <Input
  //     //       //   formik={formik}
  //     //       type='text'
  //     //       name='age'
  //     //       label='Age (with placeholder)'
  //     //       placeholder='Tell us how old you are'
  //     //       tooltipLinkText='This is a Tooltip link?'
  //     //       tooltipLink='#'
  //     //     />
  //     //   </FormContainer>
  //     // );

  //     // console.log('test component', TestComponent);
  //     render(TestComponent);

  //     // expect(getByTestId('input-license')).toHaveTextContent('submit');
  //   });
});
