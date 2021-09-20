import React from 'react';

import PropTypes from 'prop-types';

import styles from './SlidingLabel.module.scss';
import { joinClassNames } from '../../../utils/utils';
import ToolTip from '../ToolTip/ToolTip';

const SlidingLabel = (props) => {
  const {
    label,
    inputEntered,
    htmlFor,
    showErrorStyle,
    customClass,
    inputIsRequired,
    tooltipBoxHeading,
    tooltipBoxDescription,
    tooltipBoxDescriptionElement,
    ...rest
  } = props;

  const isRequiredStyle = inputIsRequired ? styles.inputIsRequired : '';

  const showTooltipIcon =
    tooltipBoxHeading || tooltipBoxDescription || tooltipBoxDescriptionElement;

  const labelDefaultClasses = inputEntered
    ? joinClassNames([styles.container, isRequiredStyle, customClass, styles.slideLabel])
    : joinClassNames([styles.container, isRequiredStyle, customClass]);

  const containerClasses = showErrorStyle
    ? joinClassNames([labelDefaultClasses, styles.labelError])
    : labelDefaultClasses;

  return (
    <div className={containerClasses}>
      <label className={styles.label} htmlFor={htmlFor} {...rest}>
        {label}
      </label>

      {showTooltipIcon && (
        <ToolTip
          heading={tooltipBoxHeading}
          description={tooltipBoxDescription}
          descriptionElement={tooltipBoxDescriptionElement}
          containerClass={styles.tooltip}
        />
      )}
    </div>
  );
};

SlidingLabel.propTypes = {
  label: PropTypes.string.isRequired,
  inputEntered: PropTypes.bool.isRequired,
  htmlFor: PropTypes.string.isRequired,
  showErrorStyle: PropTypes.bool.isRequired,
  customClass: PropTypes.string,
  inputIsRequired: PropTypes.bool,
  tooltipBoxHeading: PropTypes.string,
  tooltipBoxDescription: PropTypes.string,
  tooltipBoxDescriptionElement: PropTypes.element,
};

SlidingLabel.defaultProps = {
  customClass: '',
  inputIsRequired: false,
  tooltipBoxHeading: '',
  tooltipBoxDescription: '',
  tooltipBoxDescriptionElement: null,
};

export default SlidingLabel;
