/* eslint-disable */
import React from 'react';

import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import Button from '../../Button/Button';
import FormContainer from '../../FormContainer/FormContainer';
import DropdownWithoutAutoComplete from '../DropdownWithoutAutoComplete';

const defaultProps = {
  name: 'salutation',
  label: 'salutation',
  dropdownArray: ['Other', 'Mr.', 'Ms.', 'Mrs.'],
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
  salutation: '',
};

const defaultValidations = [];
const handleSubmit = jest.fn();

afterEach(cleanup);

describe('[Component]: DropdownWithoutAutoComplete', () => {
  it('should match the Snapshot', () => {
    const tree = renderer
      .create(
        <FormContainer
          initialValues={initialValues}
          validations={defaultValidations}
          onSubmit={handleSubmit}
        >
          <DropdownWithoutAutoComplete {...defaultProps} />
        </FormContainer>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the component correctly', () => {
    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <DropdownWithoutAutoComplete {...defaultProps} />
      </FormContainer>,
    );

    expect(getByTestId('salutation-dropdown-component')).toBeTruthy();
  });

  it('should render a disabled dropdown component', () => {
    const props = {
      ...defaultProps,
      isDisabled: true,
    };

    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <DropdownWithoutAutoComplete {...props} />
      </FormContainer>,
    );

    expect(getByTestId('salutation-dropdown-button')).toHaveAttribute('tabIndex', '');
  });

  it('should render the optional text', () => {
    const props = {
      ...defaultProps,
      optionalText: 'Test Optional text',
    };

    const { getByText } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <DropdownWithoutAutoComplete {...props} />
      </FormContainer>,
    );

    expect(getByText('Test Optional text')).toBeTruthy();
  });

  it('should render the help link', () => {
    const props = {
      ...defaultProps,
      helpLinkText: 'Test help link',
      helpLink: 'https://virginaustralia.com/',
    };

    const { getByText } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <DropdownWithoutAutoComplete {...props} />
      </FormContainer>,
    );

    expect(getByText('Test help link')).toBeTruthy();
  });

  it('should render the tooltip link', () => {
    const props = {
      ...defaultProps,
      tooltipLinkText: 'Test tooltip link',
      tooltipLink: 'https://virginaustralia.com/',
    };

    const { getByText } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <DropdownWithoutAutoComplete {...props} />
      </FormContainer>,
    );

    expect(getByText('Test tooltip link')).toBeTruthy();
  });

  it('should render a default value', async () => {
    const props = {
      ...defaultProps,
      isRequired: true,
    };

    const initialValues = {
      salutation: 'Mr.',
    };

    const validations = [
      {
        name: 'salutation',
        type: 'dropdown',
        isRequired: true,
        message: 'Please select how you would like to be addressed.',
      },
    ];

    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <DropdownWithoutAutoComplete {...props} />
      </FormContainer>,
    );

    expect(getByTestId('salutation-dropdown-button')).toHaveTextContent('Mr.');
  });

  it('should render the dropdown list', async () => {
    const props = {
      ...defaultProps,
    };

    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <DropdownWithoutAutoComplete {...props} />
      </FormContainer>,
    );

    const dropdownButton = getByTestId('salutation-dropdown-button');
    userEvent.click(dropdownButton);

    await waitFor(() => {
      expect(getByTestId('salutation-dropdown-list')).toBeTruthy();
    });
  });

  it('should render the selected option', async () => {
    const props = {
      ...defaultProps,
    };

    const { getByTestId, getAllByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <DropdownWithoutAutoComplete {...props} />
      </FormContainer>,
    );

    const dropdownButton = getByTestId('salutation-dropdown-button');
    userEvent.click(dropdownButton);

    await waitFor(() => {
      const dropdownList = getByTestId('salutation-dropdown-list');
      expect(dropdownList).toBeTruthy();
    });

    let options = getAllByTestId('salutation-dropdown-item');
    userEvent.click(options[0]);

    await waitFor(() => {
      expect(dropdownButton).toHaveTextContent('Other');
    });

    userEvent.click(dropdownButton);

    await waitFor(() => {
      const dropdownList = getByTestId('salutation-dropdown-list');
      expect(dropdownList).toBeTruthy();
    });

    options = getAllByTestId('salutation-dropdown-item');
    userEvent.click(options[2]);

    await waitFor(() => {
      expect(dropdownButton).toHaveTextContent('Ms.');
    });
  });

  it('should show the error component for a required Dropdown', async () => {
    const props = {
      ...defaultProps,
      isRequired: true,
    };

    const validations = [
      {
        name: 'salutation',
        type: 'dropdown',
        isRequired: true,
        message: 'Please select how you would like to be addressed.',
      },
    ];

    const { getByText, getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <DropdownWithoutAutoComplete {...props} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const submitButton = getByText('Submit');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(getByTestId('error-salutation')).toHaveTextContent(
        'Please select how you would like to be addressed.',
      );
    });
  });
});
