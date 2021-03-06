/* eslint-disable */
import React from 'react';

import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import Button from '../../Button/Button';
import Checkbox from '../Checkbox';
import FormContainer from '../../FormContainer/FormContainer';

const defaultProps = {
  name: 'terms',
  optionLabel: 'I accept',
  mainLabel: 'terms',
  isRequired: false,
  isDisabled: false,
  helpLink: '',
  helpLinkText: '',
  tooltipLink: '',
  tooltipLinkText: '',
  optionalText: '',
  mainLabelTooltipBoxHeading: '',
  mainLabelTooltipBoxDescription: '',
  mainLabelTooltipBoxDescriptionElement: null,
  optionLabelTooltipBoxHeading: '',
  optionLabelTooltipBoxDescription: '',
  optionLabelTooltipBoxDescriptionElement: null,
};

const initialValues = {
  terms: false,
};

const defaultValidations = [];
const handleSubmit = jest.fn();

afterEach(cleanup);

describe('[Component]: Checkbox', () => {
  it('should match the Snapshot', () => {
    const tree = renderer
      .create(
        <FormContainer
          initialValues={initialValues}
          validations={defaultValidations}
          onSubmit={handleSubmit}
        >
          <Checkbox {...defaultProps} />
        </FormContainer>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a disabled checkbox', () => {
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
        <Checkbox {...props} />
      </FormContainer>,
    );

    const checkbox = getByTestId('checkbox-terms');
    expect(checkbox).toHaveAttribute('disabled');
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
        <Checkbox {...props} />
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
        <Checkbox {...props} />
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
        <Checkbox {...props} />
      </FormContainer>,
    );

    expect(getByText('Test tooltip link')).toBeTruthy();
  });

  it('should show the error component for a required checkbox', async () => {
    const props = {
      ...defaultProps,
      isRequired: true,
    };

    const validations = [
      {
        name: 'terms',
        type: 'checkbox',
        isRequired: true,
        message: 'You need to agree to our Terms and Conditions',
      },
    ];

    const { getByText, getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <Checkbox {...props} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const submitButton = getByText('Submit');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(getByTestId('error-terms')).toHaveTextContent(
        'You need to agree to our Terms and Conditions',
      );
    });
  });

  it('should render the Tooltip icon component for the main label', () => {
    const props = {
      ...defaultProps,
      mainLabelTooltipBoxHeading: 'Tooltip',
      mainLabelTooltipBoxDescription: 'Lorem Ipsum is simply dummy text.',
    };

    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <Checkbox {...props} />
      </FormContainer>,
    );

    const toolTipComponent = getByTestId('tooltip-icon-Tooltip');
    expect(toolTipComponent).toBeTruthy();
  });

  it('should render the Tooltip icon component for the main label', () => {
    const props = {
      ...defaultProps,
      optionLabelTooltipBoxHeading: 'Option Tooltip',
      optionLabelTooltipBoxDescription: 'Lorem Ipsum is simply dummy text.',
    };

    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <Checkbox {...props} />
      </FormContainer>,
    );

    const tooltipComponent = getByTestId('tooltip-icon-Option Tooltip');
    expect(tooltipComponent).toBeTruthy();
  });
});
