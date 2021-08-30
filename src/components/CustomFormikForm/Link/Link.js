import React from 'react';
import PropTypes from 'prop-types';

import styles from './Link.module.scss';

const Link = (props) => {
  const { label, link, isTooltip = false } = props;

  const classes = isTooltip ? styles.tooltipContainer : styles.helpLinkContainer;

  return (
    <div className={classes}>
      <a href={link} className={styles.link} target='_blank' rel='noreferrer'>
        {label}
      </a>
    </div>
  );
};

Link.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  isTooltip: PropTypes.bool,
};

export default Link;
