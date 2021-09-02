import React, { useState, useLayoutEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import styles from './ToolTip.module.scss';
import ToolTipIcon from '../../../assets/images/help.svg';

const ToolTip = (props) => {
  const { heading, content, contentElement: ContentElement } = props;
  const [isContentBoxOpen, setIsContentBoxOpen] = useState(false);

  const tooltipRef = useRef();

  useLayoutEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);

  const handleClickOutside = (e) => {
    const calendarNode = tooltipRef.current;
    const clickedNode = e.target;

    if (calendarNode?.contains(clickedNode)) return;
    setIsContentBoxOpen(false);
  };

  const handleEscKeyPress = (e) => {
    if (e.keyCode === 27) {
      setIsContentBoxOpen(false);
    }
  };

  const toggleTooltipContentBox = () => {
    setIsContentBoxOpen((prevState) => !prevState);
  };

  const renderContent = () =>
    ContentElement ? (
      <div className={styles.contentElement}>{ContentElement}</div>
    ) : content ? (
      <p className={styles.content}>{content}</p>
    ) : null;

  return (
    <div ref={tooltipRef} className={styles.container}>
      <img src={ToolTipIcon} alt='tooltip' onClick={toggleTooltipContentBox} />

      {isContentBoxOpen && (
        <div className={styles.contentBox}>
          <button className={styles.closeButton} onClick={toggleTooltipContentBox}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </button>
          <p className={styles.heading}>{heading}</p>
          {/* {content && <p className={styles.content}>{content}</p>}
          {ContentElement && <div className={styles.contentElement}>{ContentElement}</div>} */}

          {renderContent()}
        </div>
      )}
    </div>
  );
};

ToolTip.propTypes = {
  icon: PropTypes.string,
  heading: PropTypes.string,
  content: PropTypes.string,
  contentElement: PropTypes.element,
};

export default ToolTip;