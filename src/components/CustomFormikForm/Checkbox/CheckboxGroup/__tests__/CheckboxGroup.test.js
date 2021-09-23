/* eslint-disable */
import React from 'react';

import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import Button from '../../../Button/Button';
import CheckboxGroup from '../CheckboxGroup';
import FormContainer from '../../../FormContainer/FormContainer';

const checkboxOptions = [
  { label: 'One', value: 'one' },
  { label: 'Two', value: 'two' },
  {
    label: 'Three',
    value: 'three',
    tooltip: {
      heading: 'Heading One',
      customDescriptionElement: (
        <p>
          I'm a custom description Element. Look me up on
          <a href='https://www.google.com'>Google</a>
        </p>
      ),
    },
  },
  {
    label: 'four',
    value: 'four',
    tooltip: {
      heading: 'Heading Two',
      description: 'Test Description',
    },
  },
];

const defaultProps = {
  name: 'conditions',
  options: checkboxOptions,
  mainLabel: 'conditions',
  formik: {},
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
};

const initialValues = {
  conditions: [],
};

const defaultValidations = [];
const handleSubmit = jest.fn();

afterEach(cleanup);

describe('[Component]: CheckboxGroup', () => {
  it('should match the Snapshot', () => {
    const tree = renderer
      .create(
        <FormContainer
          initialValues={initialValues}
          validations={defaultValidations}
          onSubmit={handleSubmit}
        >
          <CheckboxGroup {...defaultProps} />
        </FormContainer>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render disabled checkboxes', () => {
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
        <CheckboxGroup {...props} />
      </FormContainer>,
    );

    checkboxOptions.forEach((option) => {
      const checkbox = getByTestId(`checkbox-${option.label}`);
      expect(checkbox).toHaveAttribute('disabled');
    });
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
        <CheckboxGroup {...props} />
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
        <CheckboxGroup {...props} />
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
        <CheckboxGroup {...props} />
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
        name: 'conditions',
        type: 'checkbox_group',
        isRequired: true,
        message: 'Please select at least one option',
      },
    ];

    const { getByText, getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={validations}
        onSubmit={handleSubmit}
      >
        <CheckboxGroup {...props} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const submitButton = getByText('Submit');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(getByTestId('error-conditions')).toHaveTextContent(
        'Please select at least one option',
      );
    });
  });

  it('should check a checkbox by default', async () => {
    const initialValues = {
      conditions: ['two'],
    };

    const { getByText, getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <CheckboxGroup {...defaultProps} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const checkedCheckbox = getByTestId('checkbox-Two');
    expect(checkedCheckbox.checked).toEqual(true);
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
        <CheckboxGroup {...props} />
      </FormContainer>,
    );

    const toolTipComponent = getByTestId('tooltip-icon-Tooltip');
    expect(toolTipComponent).toBeTruthy();
  });

  it('should render the Tooltip icon component for the option label', () => {
    const { getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <CheckboxGroup {...defaultProps} />
      </FormContainer>,
    );

    checkboxOptions.forEach((option) => {
      if (option?.tooltip?.heading) {
        const tooltipComponent = getByTestId(`tooltip-icon-${option.tooltip.heading}`);
        expect(tooltipComponent).toBeTruthy();
      }
    });
  });
});
