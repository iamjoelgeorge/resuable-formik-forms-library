import PropTypes from 'prop-types';

export const commonPropTypes = {
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  containerClass: PropTypes.string,
  mainLabelTooltipBoxHeading: PropTypes.string,
  mainLabelTooltipBoxDescription: PropTypes.string,
  mainLabelTooltipBoxDescriptionElement: PropTypes.string,
  helpLink: PropTypes.string,
  helpLinkText: PropTypes.string,
  tooltipLink: PropTypes.string,
  tooltipLinkText: PropTypes.string,
  optionalText: PropTypes.string,
};

export const commonProps = {
  isRequired: false,
  isDisabled: false,
  containerClass: '',
  mainLabelTooltipBoxHeading: '',
  mainLabelTooltipBoxDescription: '',
  mainLabelTooltipBoxDescriptionElement: null,
  helpLink: '',
  helpLinkText: '',
  tooltipLink: '',
  tooltipLinkText: '',
  optionalText: '',
};

export const months = [
  { name: 'Jan', isDisabled: false },
  { name: 'Feb', isDisabled: false },
  { name: 'Mar', isDisabled: false },
  { name: 'Apr', isDisabled: false },
  { name: 'May', isDisabled: false },
  { name: 'Jun', isDisabled: false },
  { name: 'Jul', isDisabled: false },
  { name: 'Aug', isDisabled: false },
  { name: 'Sep', isDisabled: false },
  { name: 'Oct', isDisabled: false },
  { name: 'Nov', isDisabled: false },
  { name: 'Dec', isDisabled: false },
];

export const buttonVariants = {
  button: 'button',
  link: 'link',
  linkAsButton: 'link_as_button',
};

export const buttonTypes = {
  button: 'button',
  submit: 'submit',
};

export const buttonTheme = {
  purple: 'purple',
  red: 'red',
};
