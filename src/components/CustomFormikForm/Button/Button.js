import React from 'react';

import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

import styles from './Button.module.scss';
import { joinClassNames } from '../../../utils/utils';
import { buttonTheme, buttonTypes, buttonVariants } from '../../../constants/constants';
import {
  ExternalLinkIconWhite,
  ExternalLinkIconRed,
  ExternalLinkIconPurple,
} from '../../../constants/icons';

const Button = (props) => {
  const {
    variant,
    type,
    href,
    label,
    onClick,
    isDisabled,
    theme,
    showExternalLinkIcon,
    containerClass,
    ...rest
  } = props;

  const { isValid } = useFormikContext();

  // const disableButton = type === buttonTypes.submit ? !(formik.dirty && formik.isValid) : isDisabled;
  const disableButton = type === buttonTypes.submit ? !isValid : isDisabled;
  const goTo = !isDisabled ? href : '';

  const linkDisabledClass = isDisabled ? styles.linkDisabled : '';
  const linkAsButtonDisabledClass = isDisabled ? styles.linkButtonDisabled : '';

  const IconForLink = theme === buttonTheme.purple ? ExternalLinkIconPurple : ExternalLinkIconRed;

  const buttonClasses =
    theme === buttonTheme.purple
      ? joinClassNames([styles.button, styles.purpleTheme, containerClass])
      : joinClassNames([styles.button, styles.redTheme, containerClass]);

  const linkClasses =
    theme === buttonTheme.purple
      ? joinClassNames([styles.link, styles.purpleTheme, linkDisabledClass, containerClass])
      : joinClassNames([styles.link, styles.redTheme, linkDisabledClass, containerClass]);

  const linkAsButtonClasses = joinClassNames([
    buttonClasses,
    styles.linkAsButton,
    linkAsButtonDisabledClass,
  ]);

  const handleClickOnLink = (e) => {
    if (isDisabled) e.preventDefault();
  };

  const renderButton = () => {
    switch (variant) {
      case buttonVariants.button:
        return (
          <button
            className={buttonClasses}
            type={type}
            onClick={onClick}
            disabled={disableButton}
            data-testid={`button-${label}`}
            {...rest}
          >
            {label}
          </button>
        );

      case buttonVariants.link:
        return (
          <a
            className={linkClasses}
            href={goTo}
            target='_blank'
            onClick={handleClickOnLink}
            rel='noreferrer'
            data-testid={`link-${label}`}
          >
            <span>{label}</span>
            {showExternalLinkIcon && (
              <img className={styles.externalLinkIcon} src={IconForLink} alt='External Link' />
            )}
          </a>
        );

      case buttonVariants.linkAsButton:
        return (
          <a
            className={linkAsButtonClasses}
            href={goTo}
            target='_blank'
            onClick={handleClickOnLink}
            rel='noreferrer'
            data-testid={`link_as_button-${label}`}
          >
            {label}
            {showExternalLinkIcon && (
              <img
                className={styles.externalLinkIcon}
                src={ExternalLinkIconWhite}
                alt='External Link'
              />
            )}
          </a>
        );

      default:
        return (
          <button
            className={buttonClasses}
            type={type}
            disabled={disableButton}
            onClick={onClick}
            data-testid={`button-${label}`}
            {...rest}
          >
            {label}{' '}
            {showExternalLinkIcon && (
              <img
                className={styles.externalLinkIcon}
                src={ExternalLinkIconWhite}
                alt='External Link'
              />
            )}
          </button>
        );
    }
  };

  return <>{renderButton()}</>;
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    buttonVariants.button,
    buttonVariants.link,
    buttonVariants.linkAsButton,
  ]),
  type: PropTypes.oneOf([buttonTypes.submit, buttonTypes.button]),
  href: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  theme: PropTypes.oneOf([buttonTheme.red, buttonTheme.purple]),
  showExternalLinkIcon: PropTypes.bool,
  containerClass: PropTypes.string,
};

Button.defaultProps = {
  variant: buttonVariants.button,
  type: buttonTypes.submit,
  href: '#',
  label: '',
  onClick: () => {},
  isDisabled: false,
  theme: buttonTheme.purple,
  showExternalLinkIcon: false,
  containerClass: '',
};

export default Button;
