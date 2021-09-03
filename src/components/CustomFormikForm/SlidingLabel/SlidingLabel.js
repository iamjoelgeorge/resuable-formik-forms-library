import React from 'react';

import PropTypes from 'prop-types';

import styles from './SlidingLabel.module.scss';
import { joinClassNames } from '../../../utils/utils';
import ToolTip from '../ToolTip/ToolTip';

const SlidingLabel = (props) => {
  const {
    label,
    inputEntered = false,
    htmlFor,
    showErrorStyle = false,
    customClass,
    inputIsRequired = false,
    tooltipIconBoxHeading,
    tooltipIconBoxDescription,
    tooltipIconChildElement,
    ...rest
  } = props;

  const isRequiredStyle = inputIsRequired ? styles.inputIsRequired : '';

  const showTooltipIcon =
    tooltipIconBoxHeading || tooltipIconBoxDescription || tooltipIconChildElement;

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
          heading={tooltipIconBoxHeading}
          description={tooltipIconBoxDescription}
          descriptionElement={tooltipIconChildElement}
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
  tooltipIconBoxHeading: PropTypes.string,
  tooltipIconBoxDescription: PropTypes.string,
  tooltipIconChildElement: PropTypes.element,
  rest: PropTypes.object,
};

export default SlidingLabel;
