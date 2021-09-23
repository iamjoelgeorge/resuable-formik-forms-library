import React from 'react';

import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import Button from '../../Button/Button';
import FormContainer from '../../FormContainer/FormContainer';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';

const radioOptions = [
  { label: 'One Radio', value: 'one' },
  { label: 'Two Radio', value: 'two' },
  {
    label: 'Three Radio',
    value: 'three',
    tooltip: {
      heading: 'Heading',
      customDescriptionElement: (
        <p>
          I'm a custom description Element. Look me up on
          <a href='https://www.google.com'>Google</a>
        </p>
      ),
    },
  },
];

const defaultProps = {
  name: 'radioOption',
  options: radioOptions,
  mainLabel: 'radioOption',
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
  radioOption: '',
};

const defaultValidations = [];
const handleSubmit = jest.fn();

afterEach(cleanup);

describe('[Component]: RadioButtonGroup', () => {
  it('should match the Snapshot', () => {
    const tree = renderer
      .create(
        <FormContainer
          initialValues={initialValues}
          validations={defaultValidations}
          onSubmit={handleSubmit}
        >
          <RadioButtonGroup {...defaultProps} />
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
        <RadioButtonGroup {...props} />
      </FormContainer>,
    );

    radioOptions.forEach((option) => {
      const radioButton = getByTestId(`radio-button-${option.label}`);
      expect(radioButton).toHaveAttribute('disabled');
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
        <RadioButtonGroup {...props} />
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
        <RadioButtonGroup {...props} />
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
        <RadioButtonGroup {...props} />
      </FormContainer>,
    );

    expect(getByText('Test tooltip link')).toBeTruthy();
  });

  it('should show the error component for a required radio button', async () => {
    const props = {
      ...defaultProps,
      isRequired: true,
    };

    const validations = [
      {
        name: 'radioOption',
        type: 'radio_button_group',
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
        <RadioButtonGroup {...props} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const submitButton = getByText('Submit');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(getByTestId('error-radioOption')).toHaveTextContent(
        'Please select at least one option',
      );
    });
  });

  it('should select a radio button by default', async () => {
    const initialValues = {
      radioOption: 'two',
    };

    const { getByText, getByTestId } = render(
      <FormContainer
        initialValues={initialValues}
        validations={defaultValidations}
        onSubmit={handleSubmit}
      >
        <RadioButtonGroup {...defaultProps} />
        <Button label='Submit' />
      </FormContainer>,
    );

    const checkedCheckbox = getByTestId('radio-button-Two Radio');
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
        <RadioButtonGroup {...props} />
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
        <RadioButtonGroup {...defaultProps} />
      </FormContainer>,
    );

    radioOptions.forEach((item) => {
      if (item?.tooltip?.heading) {
        const tooltipComponent = getByTestId(`tooltip-icon-${item.tooltip.heading}`);
        expect(tooltipComponent).toBeTruthy();
      }
    });
  });
});
