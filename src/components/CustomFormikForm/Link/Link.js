import React from 'react';
import PropTypes from 'prop-types';

import styles from './Link.module.scss';
import { joinClassNames } from '../../../utils/utils';

const Link = (props) => {
  const { label, link, containerClass, isTooltip = false } = props;

  const containerClasses = isTooltip
    ? joinClassNames([styles.common, styles.tooltipContainer, containerClass])
    : joinClassNames([styles.common, styles.helpLinkContainer, containerClass]);

  return (
    <div className={containerClasses}>
      <a href={link} className={styles.link} target='_blank' rel='noreferrer'>
        {label}
      </a>
    </div>
  );
};

Link.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  containerClass: PropTypes.string,
  isTooltip: PropTypes.bool,
};

export default Link;
