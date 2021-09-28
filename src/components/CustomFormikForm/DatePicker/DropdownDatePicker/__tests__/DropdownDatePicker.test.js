import React from 'react';

import { render, cleanup, getNodeText, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { prependZeroToDayNumber } from '../../../../../utils/utils';

import { months } from '../../../../../constants/constants';
import FormContainer from '../../../FormContainer/FormContainer';
import DropdownDatePicker from '../DropdownDatePicker';
import userEvent from '@testing-library/user-event';
import Button from '../../../Button/Button';

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

    const dayNumber = getNodeText(getByTestId('departureDate-date-dropdown'));
    const month = getNodeText(getByTestId('departureDate-month-dropdown'));
    const year = getNodeText(getByTestId('departureDate-year-dropdown'));

    expect(dayNumber).toBe('01');
    expect(month).toBe('Mar');
    expect(year).toBe('2021');
  });

  it("should render today's date if the initial value passed is null", () => {
    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <DropdownDatePicker {...defaultProps} />
      </FormContainer>,
    );

    const dayNumber = getNodeText(getByTestId('departureDate-date-dropdown'));
    const month = getNodeText(getByTestId('departureDate-month-dropdown'));
    const year = getNodeText(getByTestId('departureDate-year-dropdown'));

    const today = new Date();
    const todayDayNumber = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    expect(dayNumber).toBe(prependZeroToDayNumber(todayDayNumber));
    expect(month).toBe(months[currentMonth].name);
    expect(year).toBe(currentYear.toString());
  });

  it('should render a disabled Dropdown Date Picker', async () => {
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
        <DropdownDatePicker {...props} />
      </FormContainer>,
    );

    const dayNumberDropdownContainer = getByTestId('departureDate-date-dropdown');
    const monthDropdownContainer = getByTestId('departureDate-month-dropdown');
    const yearDropdownContainer = getByTestId('departureDate-year-dropdown');

    userEvent.click(dayNumberDropdownContainer);
    await waitFor(() => {
      expect(queryByTestId('date-dropdown')).toBeNull();
    });

    userEvent.click(monthDropdownContainer);
    await waitFor(() => {
      expect(queryByTestId('date-dropdown')).toBeNull();
    });

    userEvent.click(yearDropdownContainer);
    await waitFor(() => {
      expect(queryByTestId('date-dropdown')).toBeNull();
    });
  });

  it('should validate min date', async () => {
    const validations = [
      {
        name: 'departureDate',
        type: 'dropdown_datepicker',
        isRequired: true,
        message: 'Please select a date.',
        minDate: {
          date: new Date('12 Feb 2020'),
          message: 'Please select a date after 12 Feb 2020',
        },
      },
    ];

    const { getByText, getByTestId, getAllByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <DropdownDatePicker {...defaultProps} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const dayNumberDropdownContainer = getByTestId('departureDate-date-dropdown');
    const yearDropdownContainer = getByTestId('departureDate-year-dropdown');

    userEvent.click(dayNumberDropdownContainer);
    await waitFor(() => {
      expect(getByTestId('date-dropdown')).toBeTruthy();
    });

    let dropdownItems = getAllByTestId('dropdown-item-button');
    userEvent.click(dropdownItems[0]);
    await waitFor(() => {
      const dayNumber = getNodeText(getByTestId('departureDate-date-dropdown'));
      expect(dayNumber).toBe('01');
    });

    const submitButton = getByText('Submit');
    userEvent.click(submitButton);

    userEvent.click(yearDropdownContainer);
    await waitFor(() => {
      expect(getByTestId('date-dropdown')).toBeTruthy();
    });

    dropdownItems = getAllByTestId('dropdown-item-button');
    userEvent.click(dropdownItems[4]);
    await waitFor(() => {
      expect(getByTestId('error-departureDate')).toHaveTextContent(
        'Please select a date after 12 Feb 2020',
      );
    });
  });

  it('should validate max date', async () => {
    const props = {
      ...defaultProps,
      maxDaysInTheFuture: 500,
    };

    const validations = [
      {
        name: 'departureDate',
        type: 'dropdown_datepicker',
        isRequired: true,
        message: 'Please select a date.',
        maxDate: {
          date: new Date('12 Feb 2022'),
          message: 'Please select a date after 12 Feb 2022',
        },
      },
    ];

    const { getByText, getByTestId, getAllByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <DropdownDatePicker {...props} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const dayNumberDropdownContainer = getByTestId('departureDate-date-dropdown');
    const yearDropdownContainer = getByTestId('departureDate-year-dropdown');

    userEvent.click(dayNumberDropdownContainer);
    await waitFor(() => {
      expect(getByTestId('date-dropdown')).toBeTruthy();
    });

    let dropdownItems = getAllByTestId('dropdown-item-button');
    userEvent.click(dropdownItems[0]);
    await waitFor(() => {
      const dayNumber = getNodeText(getByTestId('departureDate-date-dropdown'));
      expect(dayNumber).toBe('01');
    });

    const submitButton = getByText('Submit');
    userEvent.click(submitButton);

    userEvent.click(yearDropdownContainer);
    await waitFor(() => {
      expect(getByTestId('date-dropdown')).toBeTruthy();
    });

    dropdownItems = getAllByTestId('dropdown-item-button');
    userEvent.click(dropdownItems[0]);
    await waitFor(() => {
      expect(getByTestId('error-departureDate')).toHaveTextContent(
        'Please select a date after 12 Feb 2022',
      );
    });
  });

  it('should validate max number of days in the past', async () => {
    const validations = [
      {
        name: 'departureDate',
        type: 'dropdown_datepicker',
        isRequired: true,
        message: 'Please select a date.',
        maxDaysInThePast: { num: 2, message: 'Please select a valid date' },
      },
    ];

    const { getByText, getByTestId, getAllByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <DropdownDatePicker {...defaultProps} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const submitButton = getByText('Submit');
    userEvent.click(submitButton);

    const dayNumberDropdownContainer = getByTestId('departureDate-date-dropdown');

    userEvent.click(dayNumberDropdownContainer);
    await waitFor(() => {
      expect(getByTestId('date-dropdown')).toBeTruthy();
    });

    let dropdownItems = getAllByTestId('dropdown-item-button');
    userEvent.click(dropdownItems[0]);
    await waitFor(() => {
      const dayNumber = getNodeText(getByTestId('departureDate-date-dropdown'));
      expect(dayNumber).toBe('01');
    });

    await waitFor(() => {
      expect(getByTestId('error-departureDate')).toHaveTextContent('Please select a valid date');
    });
  });

  it('should validate max number of days in the future', async () => {
    const props = {
      ...defaultProps,
      maxDaysInTheFuture: 500,
    };

    const validations = [
      {
        name: 'departureDate',
        type: 'dropdown_datepicker',
        isRequired: true,
        message: 'Please select a date.',
        maxDaysInTheFuture: { num: 2, message: 'Please select a valid date' },
      },
    ];

    const { getByText, getByTestId, getAllByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <DropdownDatePicker {...props} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const submitButton = getByText('Submit');
    userEvent.click(submitButton);

    const yearDropdownContainer = getByTestId('departureDate-year-dropdown');

    userEvent.click(yearDropdownContainer);
    await waitFor(() => {
      expect(getByTestId('date-dropdown')).toBeTruthy();
    });

    let dropdownItems = getAllByTestId('dropdown-item-button');
    userEvent.click(dropdownItems[0]);
    await waitFor(() => {
      const yearNumber = getNodeText(getByTestId('departureDate-year-dropdown'));
      expect(yearNumber).toBe('2023');
    });

    await waitFor(() => {
      expect(getByTestId('error-departureDate')).toHaveTextContent('Please select a valid date');
    });
  });
});
