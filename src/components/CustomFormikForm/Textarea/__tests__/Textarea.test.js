import React from 'react';

import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import Button from '../../Button/Button';
import FormContainer from '../../FormContainer/FormContainer';
import Textarea from '../Textarea';

const defaultProps = {
  name: 'description',
  label: 'description',
  placeholder: '',
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
  formik: {
    errors: {
      description: '',
    },
    touched: { description: false },
    values: { description: '' },
  },
};

const initialValues = {
  description: '',
};

const defaultValidations = [];
const handleSubmit = jest.fn();

afterEach(cleanup);

describe('[Component]: Texxtarea', () => {
  it('should match the Snapshot', () => {
    const tree = renderer
      .create(
        <FormContainer
          initialValues={initialValues}
          validations={defaultValidations}
          onSubmit={handleSubmit}
        >
          <Textarea {...defaultProps} />
        </FormContainer>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the textarea correctly', () => {
    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <Textarea {...defaultProps} />
      </FormContainer>,
    );

    expect(getByTestId('textarea-description')).toBeTruthy();
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
        <Textarea {...props} />
      </FormContainer>,
    );

    expect(getByTestId('textarea-description')).toHaveAttribute('disabled');
  });

  it('should render the placeholder button', () => {
    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <Textarea {...defaultProps} />
      </FormContainer>,
    );

    userEvent.type(getByTestId('textarea-description'), 'John');
    getByTestId('textarea-description').blur();
    expect(getByTestId('label-view-description')).toBeTruthy();
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
        <Textarea {...props} />
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
        <Textarea {...props} />
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
        <Textarea {...props} />
      </FormContainer>,
    );

    expect(getByText('Test tooltip link')).toBeTruthy();
  });

  it('should show the error component for a required input', async () => {
    const props = {
      ...defaultProps,
      isRequired: true,
    };

    const validations = [
      {
        name: 'description',
        type: 'string',
        isRequired: true,
        message: 'Please add a comment.',
      },
    ];

    const { getByText, getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <Textarea {...props} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const submitButton = getByText('Submit');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(getByTestId('error-description')).toHaveTextContent('Please add a comment');
    });
  });

  it('should show the error component for maximum characters allowed', async () => {
    const props = {
      ...defaultProps,
      isRequired: true,
    };

    const validations = [
      {
        name: 'description',
        type: 'string',
        isRequired: false,
        maxChars: { num: 5, message: 'You can enter only upto 5 characters' },
      },
    ];

    const { getByText, getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <Textarea {...props} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const textarea = getByTestId('textarea-description');
    const submitButton = getByText('Submit');

    userEvent.type(textarea, 'Less');
    userEvent.click(submitButton);

    await waitFor(() => {
      const labelViewButton = getByTestId('label-view-description');
      userEvent.click(labelViewButton);
    });

    userEvent.clear(textarea);
    userEvent.type(textarea, 'valid input');

    await waitFor(() => {
      expect(getByTestId('error-description')).toHaveTextContent(
        'You can enter only upto 5 characters',
      );
    });
  });

  it('should show the error component for minimum characters required', async () => {
    const props = {
      ...defaultProps,
      isRequired: true,
    };

    const validations = [
      {
        name: 'description',
        type: 'string',
        isRequired: false,
        minChars: { num: 5, message: 'Please enter at least 5 characters' },
      },
    ];

    const { getByText, getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <Textarea {...props} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const textarea = getByTestId('textarea-description');
    const submitButton = getByText('Submit');

    userEvent.type(textarea, 'valid input');
    userEvent.click(submitButton);

    await waitFor(() => {
      const labelViewButton = getByTestId('label-view-description');
      userEvent.click(labelViewButton);
    });

    userEvent.clear(textarea);
    userEvent.type(textarea, 'jn');

    await waitFor(() => {
      expect(getByTestId('error-description')).toHaveTextContent(
        'Please enter at least 5 characters',
      );
    });
  });

  it('should show the error component for minimum and maximum characters', async () => {
    const props = {
      ...defaultProps,
      isRequired: true,
    };

    const validations = [
      {
        name: 'description',
        type: 'string',
        isRequired: false,
        minChars: { num: 5, message: 'Please enter at least 5 characters' },
        maxChars: { num: 10, message: 'You can enter only upto 10 characters' },
      },
    ];

    const { getByText, getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <Textarea {...props} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const textarea = getByTestId('textarea-description');
    const submitButton = getByText('Submit');

    userEvent.type(textarea, 'valid input');
    userEvent.click(submitButton);

    await waitFor(() => {
      const labelViewButton = getByTestId('label-view-description');
      userEvent.click(labelViewButton);
    });

    userEvent.clear(textarea);
    userEvent.type(textarea, 'jn');

    await waitFor(() => {
      expect(getByTestId('error-description')).toHaveTextContent(
        'Please enter at least 5 characters',
      );
    });

    userEvent.clear(textarea);
    userEvent.type(textarea, 'Entering more than 10 characters');

    await waitFor(() => {
      expect(getByTestId('error-description')).toHaveTextContent(
        'You can enter only upto 10 characters',
      );
    });
  });
});
