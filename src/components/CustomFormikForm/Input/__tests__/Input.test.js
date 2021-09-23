import React from 'react';

import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import Button from '../../Button/Button';
import FormContainer from '../../FormContainer/FormContainer';
import Input from '../Input';

const defaultProps = {
  name: 'name',
  label: 'Name',
  placeholder: '',
  containerClass: '',
  tooltipBoxHeading: '',
  tooltipBoxDescription: '',
  tooltipBoxDescriptionElement: null,
  tooltipLink: '',
  tooltipLinkText: '',
  helpLinkText: '',
  helpLink: '',
  optionalText: '',
  isDisabled: false,
  isRequired: false,
  formik: {
    errors: {
      name: '',
    },
    touched: { name: false },
    values: { name: '' },
  },
};

const initialValues = {
  name: '',
};

const defaultValidations = [];
const handleSubmit = jest.fn();

afterEach(cleanup);

describe('[Component]: Input', () => {
  it('should match the Snapshot', () => {
    const tree = renderer
      .create(
        <FormContainer
          initialValues={initialValues}
          validations={defaultValidations}
          onSubmit={handleSubmit}
        >
          <Input {...defaultProps} />
        </FormContainer>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the input correctly', () => {
    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <Input {...defaultProps} />
      </FormContainer>
    );

    expect(getByTestId('input-name')).toBeTruthy();
  });

  it('should render a disabled input', () => {
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
        <Input {...props} />
      </FormContainer>
    );

    expect(getByTestId('input-name')).toHaveAttribute('disabled');
  });

  it('should render the placeholder button', () => {
    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <Input {...defaultProps} />
      </FormContainer>
    );

    userEvent.type(getByTestId('input-name'), 'John');
    getByTestId('input-name').blur();
    expect(getByTestId('label-view-name')).toBeTruthy();
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
        <Input {...props} />
      </FormContainer>
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
        <Input {...props} />
      </FormContainer>
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
        <Input {...props} />
      </FormContainer>
    );

    expect(getByText('Test tooltip link')).toBeTruthy();
  });

  it('should show the error component for a required input', async () => {
    const props = {
      ...defaultProps,
      name: 'email',
      label: 'Email',
      isRequired: true,
    };

    const validations = [
      {
        name: 'email',
        type: 'email',
        isRequired: true,
        message: 'Enter the correct email id',
      },
    ];

    const initialValues = {
      email: '',
    };

    const { getByText, getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <Input {...props} />
        <Button label='Submit' />
      </FormContainer>
    );

    const submitButton = getByText('Submit');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(getByTestId('error-email')).toHaveTextContent(
        'Enter the correct email id'
      );
    });
  });

  it('should show the error component for maximum characters allowed', async () => {
    const props = {
      ...defaultProps,
      name: 'name',
      label: 'name',
    };

    const validations = [
      {
        name: 'name',
        type: 'string',
        maxChars: { num: 5, message: 'You can enter only upto 5 characters' },
      },
    ];

    const initialValues = {
      name: '',
    };

    const { getByText, getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <Input {...props} />
        <Button label='Submit' />
      </FormContainer>
    );

    const input = getByTestId('input-name');
    const submitButton = getByText('Submit');

    userEvent.type(input, 'Less');
    userEvent.click(submitButton);

    await waitFor(() => {
      const labelViewButton = getByTestId('label-view-name');
      userEvent.click(labelViewButton);
    });

    userEvent.clear(input);
    userEvent.type(input, 'More than 5 characters');

    await waitFor(() => {
      expect(getByTestId('error-name')).toHaveTextContent(
        'You can enter only upto 5 characters'
      );
    });
  });

  it('should show the error component for minimum characters required', async () => {
    const props = {
      ...defaultProps,
      name: 'name',
      label: 'name',
    };

    const validations = [
      {
        name: 'name',
        type: 'string',
        minChars: { num: 5, message: 'Please enter at least 5 characters' },
      },
    ];

    const initialValues = {
      name: '',
    };

    const { getByText, getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <Input {...props} />
        <Button label='Submit' />
      </FormContainer>
    );

    const input = getByTestId('input-name');
    const submitButton = getByText('Submit');

    userEvent.type(input, 'More than 5 characters');
    userEvent.click(submitButton);

    await waitFor(() => {
      const labelViewButton = getByTestId('label-view-name');
      userEvent.click(labelViewButton);
    });

    userEvent.clear(input);
    userEvent.type(input, 'jn');

    await waitFor(() => {
      expect(getByTestId('error-name')).toHaveTextContent(
        'Please enter at least 5 characters'
      );
    });
  });

  it('should show the error component for minimum and maximum characters', async () => {
    const props = {
      ...defaultProps,
      name: 'name',
      label: 'name',
    };

    const validations = [
      {
        name: 'name',
        type: 'string',
        isRequired: false,
        minChars: { num: 5, message: 'Please enter at least 5 characters' },
        maxChars: { num: 10, message: 'You can enter only upto 10 characters' },
      },
    ];

    const initialValues = {
      name: '',
    };

    const { getByText, getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <Input {...props} />
        <Button label='Submit' />
      </FormContainer>
    );

    const input = getByTestId('input-name');
    const submitButton = getByText('Submit');

    userEvent.type(input, 'valid input');
    userEvent.click(submitButton);

    await waitFor(() => {
      const labelViewButton = getByTestId('label-view-name');
      userEvent.click(labelViewButton);
    });

    userEvent.clear(input);
    userEvent.type(input, 'jn');

    await waitFor(() => {
      expect(getByTestId('error-name')).toHaveTextContent(
        'Please enter at least 5 characters'
      );
    });

    userEvent.clear(input);
    userEvent.type(input, 'Entering more than 10 characters');

    await waitFor(() => {
      expect(getByTestId('error-name')).toHaveTextContent(
        'You can enter only upto 10 characters'
      );
    });
  });
});
