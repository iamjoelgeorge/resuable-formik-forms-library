import React from 'react';

import { render, cleanup, getNodeText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FormContainer from '../../../FormContainer/FormContainer';
import DropdownDatePicker from '../DropdownDatePicker';

const defaultProps = {
  name: 'departureDate',
  label: 'Departure Date',
  minDate: null,
  maxDate: new Date(),
  maxDaysInThePast: null,
  maxDaysInTheFuture: null,
  labelTooltipBoxHeading: '',
  containerClass: '',
  labelTooltipBoxDescription: '',
  labelTooltipBoxDescriptionElement: null,
  tooltipLink: '',
  tooltipLinkText: '',
  helpLinkText: '',
  helpLink: '',
  optionalText: '',
  isDisabled: false,
  isRequired: false,
};

const initialValues = {
  departureDate: null,
};

const defaultValidations = [];
const handleSubmit = jest.fn();

afterEach(cleanup);

describe('[Component]: DropdownDatePicker', () => {
  it('should render the initial date passed', () => {
    const values = {
      departureDate: new Date('1 mar 2021'),
    };

    const { getByTestId } = render(
      <FormContainer
        initialValues={values}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <DropdownDatePicker {...defaultProps} />
      </FormContainer>,
    );

    const selectedDateAsText = getNodeText(getByTestId('departureDate-selectedDate'));

    expect(selectedDateAsText).toBe('Mon, 1 Mar 2021');
  });
});
