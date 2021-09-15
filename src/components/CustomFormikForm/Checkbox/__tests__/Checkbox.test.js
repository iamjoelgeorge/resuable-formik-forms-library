import React from 'react';
import { fireEvent, wait, render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from 'react-test-renderer';
import { useField } from 'formik';

import Checkbox from '../Checkbox';

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
  name: 'license',
  isRequired: false,
  isDisabled: false,
  optionLabel: 'Do you have a license?',
  mainLabel: 'License',
  helpLink: '#',
  helpLinkText: 'This link is for your help',
  tooltipLink: '',
  tooltipLinkText: '',
  optionalText: '',
  mainLabelTooltipBoxHeading: '',
  mainLabelTooltipBoxDescription: '',
  optionLabelTooltipBoxHeading: '',
  optionLabelTooltipBoxDescription: '',
  formik: {
    ...mockMeta,
    ...mockField,
    errors: {
      test: '',
    },
  },
};

afterEach(cleanup);
describe('[Component]: Checkbox', () => {
  //   it('should match the Snapshot', () => {
  //     const tree = renderer.create(<Checkbox {...defaultProps} />).toJSON();
  //     // console.log(render(<Checkbox {...defaultProps} />));
  //     expect(tree).toMatchSnapshot();
  //   });
  it('should render the checkbox correctly', () => {
    const props = {
      ...defaultProps,
    };
    const { getByTestId } = render(<Checkbox {...props} />);
    expect(getByTestId('checkbox-license')).toHaveTextContent('submit');
  });
});
