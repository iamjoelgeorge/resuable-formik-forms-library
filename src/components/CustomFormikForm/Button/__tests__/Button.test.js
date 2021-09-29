import React from 'react';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import Button from '../Button';

const defaultProps = {
  variant: 'button',
  type: 'submit',
  href: '#',
  label: 'submit',
  onClick: () => {},
  isDisabled: false,
  theme: 'purple',
  showExternalLinkIcon: false,
  containerClass: '',
  formik: {
    isValid: true,
  },
};

afterEach(cleanup);
describe('[Component]: Button', () => {
  it('should match the Snapshot', () => {
    const tree = renderer.create(<Button {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the button correctly', () => {
    const props = {
      ...defaultProps,
    };
    const { getByTestId } = render(<Button {...props} />);
    expect(getByTestId('button-submit')).toHaveTextContent('submit');
  });

  it('should render a disabled button', () => {
    const props = {
      ...defaultProps,
      type: 'button',
      isDisabled: true,
    };
    const { getByTestId } = render(<Button {...props} />);
    expect(getByTestId('button-submit')).toHaveAttribute('disabled');
  });

  it('should render the link correctly', () => {
    const props = {
      ...defaultProps,
      variant: 'link',
    };
    const { getByTestId } = render(<Button {...props} />);
    expect(getByTestId('link-submit')).toHaveTextContent('submit');
  });

  it('should render "link_as_button" link  correctly', () => {
    const props = {
      ...defaultProps,
      variant: 'link_as_button',
    };
    const { getByTestId } = render(<Button {...props} />);
    expect(getByTestId('link_as_button-submit')).toHaveTextContent('submit');
  });

  it('should render the button with the red theme', () => {
    const props = {
      ...defaultProps,
      theme: 'red',
    };

    const { getByTestId } = render(<Button {...props} />);
    expect(getByTestId('button-submit')).toHaveClass('redTheme');
  });

  it('should render the link with the red theme', () => {
    const props = {
      ...defaultProps,
      variant: 'link',
      theme: 'red',
    };

    const { getByTestId } = render(<Button {...props} />);
    expect(getByTestId('link-submit')).toHaveClass('redTheme');
  });

  it('should render the "link_as_button" link with the red theme', () => {
    const props = {
      ...defaultProps,
      variant: 'link_as_button',
      theme: 'red',
    };

    const { getByTestId } = render(<Button {...props} />);
    expect(getByTestId('link_as_button-submit')).toHaveClass('redTheme');
  });

  it('should render the button with the purple theme', () => {
    const props = {
      ...defaultProps,
      theme: 'purple',
    };

    const { getByTestId } = render(<Button {...props} />);
    expect(getByTestId('button-submit')).toHaveClass('purpleTheme');
  });

  it('should render the link with the purple theme', () => {
    const props = {
      ...defaultProps,
      variant: 'link',
      theme: 'purple',
    };

    const { getByTestId } = render(<Button {...props} />);
    expect(getByTestId('link-submit')).toHaveClass('purpleTheme');
  });

  it('should render the "link_as_button" link with the purple theme', () => {
    const props = {
      ...defaultProps,
      variant: 'link_as_button',
      theme: 'purple',
    };

    const { getByTestId } = render(<Button {...props} />);
    expect(getByTestId('link_as_button-submit')).toHaveClass('purpleTheme');
  });

  it('should render the link with the disabled class', () => {
    const props = {
      ...defaultProps,
      variant: 'link',
      isDisabled: true,
    };
    const { getByTestId } = render(<Button {...props} />);
    expect(getByTestId('link-submit')).toHaveClass('linkDisabled');
  });

  it('should render the "link_as_button" link with the disabled class', () => {
    const props = {
      ...defaultProps,
      variant: 'link_as_button',
      isDisabled: true,
    };
    const { getByTestId } = render(<Button {...props} />);
    expect(getByTestId('link_as_button-submit')).toHaveClass('linkButtonDisabled');
  });
});
