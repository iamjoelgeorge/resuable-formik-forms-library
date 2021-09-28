import React from 'react';

import { render, cleanup, getNodeText, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import FormContainer from '../../../FormContainer/FormContainer';
import CalendarDatePicker from '../CalendarDatePicker';

const defaultProps = {
  name: 'departureDate',
  label: 'Departure Date',
  minDate: null,
  maxDate: new Date('31 Dec 5000'),
  maxDaysInThePast: null,
  maxDaysInTheFuture: null,
  containerClass: '',
  labelTooltipBoxHeading: '',
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

describe('[Component]: CalendarDatePicker', () => {
  it('should not render a date', () => {
    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <CalendarDatePicker {...defaultProps} />
      </FormContainer>,
    );

    expect(getByTestId('departureDate-selectedDate')).toHaveTextContent('');
  });

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
        <CalendarDatePicker {...defaultProps} />
      </FormContainer>,
    );

    const selectedDateAsText = getNodeText(getByTestId('departureDate-selectedDate'));

    expect(selectedDateAsText).toBe('Mon, 1 Mar 2021');
  });

  it('should toggle the dropdown', async () => {
    const { getByTestId, queryByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <CalendarDatePicker {...defaultProps} />
      </FormContainer>,
    );

    const toggleButton = getByTestId('departureDate-calendar-toggle-button');
    userEvent.click(toggleButton);

    await waitFor(() => {
      expect(queryByTestId('departureDate-calendar')).toBeTruthy();
    });

    userEvent.click(toggleButton);

    await waitFor(() => {
      expect(queryByTestId('departureDate-calendar')).toBeNull();
    });
  });

  it('should display the Datepicker as disabled', async () => {
    const props = {
      ...defaultProps,
      isDisabled: true,
    };
    const { getByTestId, queryByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <CalendarDatePicker {...props} />
      </FormContainer>,
    );

    const toggleButton = getByTestId('departureDate-calendar-toggle-button');
    userEvent.click(toggleButton);

    await waitFor(() => {
      expect(queryByTestId('departureDate-calendar')).toBeNull();
    });
  });
});
