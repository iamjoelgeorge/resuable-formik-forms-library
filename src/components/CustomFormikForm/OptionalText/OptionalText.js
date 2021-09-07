import React from 'react';
import PropTypes from 'prop-types';

import styles from './OptionalText.module.scss';
import { joinClassNames } from '../../../utils/utils';

const OptionalText = (props) => {
  const {
    variant,
    tooltipLink,
    tooltipLinkText,
    helpLink,
    helpLinkText,
    optionalText,
    containerClass,
  } = props;

  const containerClasses =
    tooltipLink || tooltipLinkText
      ? joinClassNames([styles.common, styles.tooltipContainer, containerClass])
      : joinClassNames([styles.common, containerClass]);

  const renderComponent = () => {
    switch (variant) {
      case 'tooltip link':
        return (
          <a href={tooltipLink} target='_blank' rel='noreferrer'>
            {tooltipLinkText}
          </a>
        );
      case 'help link':
        return (
          <a href={helpLink} target='_blank' rel='noreferrer'>
            {helpLinkText}
          </a>
        );

      case 'text':
        return <p className={styles.optionalText}>{optionalText}</p>;

      default:
        break;
    }
  };

  return <div className={containerClasses}>{renderComponent()}</div>;
};

OptionalText.propTypes = {
  variant: PropTypes.oneOf(['tooltip link', 'help link', 'text']),
  tooltipLink: PropTypes.string,
  tooltipLinkText: PropTypes.string,
  helpLink: PropTypes.string,
  helpLinkText: PropTypes.string,
  optionalText: PropTypes.string,
  containerClass: PropTypes.string,
};

OptionalText.defaultProps = {
  variant: 'text',
  tooltipLink: '',
  tooltipLinkText: '',
  helpLink: '',
  helpLinkText: '',
  optionalText: '',
  containerClass: '',
};

export default OptionalText;
