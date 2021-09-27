/* eslint-disable */
import React from 'react';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import renderer from 'react-test-renderer';

import FormContainer from '../../FormContainer/FormContainer';
import DatePicker from '../DatePicker';

const defaultProps = {
  name: 'departureDate',
  label: 'Departure Date',
  isDropdown: false,
};

const initialValues = {
  departureDate: null,
};

const defaultValidations = [];
const handleSubmit = jest.fn();

afterEach(cleanup);

describe('[Component]: DatePicker', () => {
  it('should match the Snapshot', () => {
    const tree = renderer
      .create(
        <FormContainer
          initialValues={initialValues}
          validations={defaultValidations}
          onSubmit={handleSubmit}
        >
          <DatePicker {...defaultProps} />
        </FormContainer>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the Calendar Date Picker', () => {
    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <DatePicker {...defaultProps} />
      </FormContainer>,
    );

    expect(getByTestId('departureDate-calendar-datepicker')).toBeTruthy();
  });

  it('should render the Dropdown Date Picker', () => {
    const props = {
      ...defaultProps,
      isDropdown: true,
    };
    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <DatePicker {...props} />
      </FormContainer>,
    );

    expect(getByTestId('departureDate-dropdown-datepicker')).toBeTruthy();
  });
});
