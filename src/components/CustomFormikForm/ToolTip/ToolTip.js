import React, { useState } from 'react';
import DefaultToolTipIcon from '../../../assets/images/help.svg';

import styles from './ToolTip.module.scss';

const ToolTip = (props) => {
  const { icon, heading, description } = props;
  const [isDescriptionBoxOpen, setIsDescriptionBoxOpen] = useState(true);

  const toolTipIcon = icon ? icon : DefaultToolTipIcon;

  const handleClick = () => {
    setIsDescriptionBoxOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <img src={toolTipIcon} alt='help icon' onClick={handleClick} />

      {isDescriptionBoxOpen && (
        <div className={styles.descriptionBox}>
          <p className={styles.heading}>Permitted with no fee</p>
          <p className={styles.description}>
            For cancellation, credit to Travel Bank for the full ticket value including any fare
            portion where Velocity Points have been redeemed.
          </p>
        </div>
      )}
    </div>
  );
};

export default ToolTip;
