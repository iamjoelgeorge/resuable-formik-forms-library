import React from 'react';

import PropTypes from 'prop-types';

import styles from './Button.module.scss';
import { joinClassNames } from '../../../utils/utils';
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
    formik,
    ...rest
  } = props;

  // const disableButton = type === 'submit' ? !(formik.dirty && formik.isValid) : isDisabled;
  const disableButton = type === 'submit' ? !formik.isValid : isDisabled;
  const goTo = !isDisabled ? href : '';

  const linkDisabledClass = isDisabled ? styles.linkDisabled : '';
  const linkAsButtonDisabledClass = isDisabled ? styles.linkButtonDisabled : '';

  const IconForLink = theme === 'purple' ? ExternalLinkIconPurple : ExternalLinkIconRed;

  const buttonClasses =
    theme === 'purple'
      ? joinClassNames([styles.button, styles.purpleTheme, containerClass])
      : joinClassNames([styles.button, styles.redTheme, containerClass]);

  const linkClasses =
    theme === 'purple'
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
      case 'button':
        return (
          <button className={buttonClasses} type={type} disabled={disableButton} {...rest}>
            {label}
          </button>
        );

      case 'link':
        return (
          <a
            className={linkClasses}
            href={goTo}
            target='_blank'
            onClick={handleClickOnLink}
            rel='noreferrer'
          >
            <span>{label}</span>
            {showExternalLinkIcon && (
              <img className={styles.externalLinkIcon} src={IconForLink} alt='External Link' />
            )}
          </a>
        );

      case 'link_as_button':
        return (
          <a
            className={linkAsButtonClasses}
            href={goTo}
            target='_blank'
            onClick={handleClickOnLink}
            rel='noreferrer'
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
  variant: PropTypes.oneOf(['button', 'link', 'link_as_button']),
  type: PropTypes.oneOf(['submit', 'button']),
  href: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  theme: PropTypes.oneOf(['red', 'purple']),
  showExternalLinkIcon: PropTypes.bool,
  containerClass: PropTypes.string,
};

Button.defaultProps = {
  variant: 'button',
  type: 'submit',
  href: '#',
  label: '',
  onClick: () => {},
  isDisabled: false,
  theme: 'purple',
  showExternalLinkIcon: false,
  containerClass: '',
};

export default Button;
