import React, { useState, useLayoutEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import styles from './ToolTip.module.scss';
import { joinClassNames } from '../../../utils/utils';
import { ToolTipIcon } from '../../../constants/icons';

const ToolTip = (props) => {
  const { heading, description, descriptionElement: DescriptionElement, containerClass } = props;
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const tooltipContainerRef = useRef();
  const tooltipBoxRef = useRef();

  const containerClasses = joinClassNames([styles.container, containerClass]);

  useLayoutEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);

  const handleClickOutside = (e) => {
    const tooltipNode = tooltipContainerRef.current;
    const clickedNode = e.target;

    if (tooltipNode?.contains(clickedNode)) return;
    setIsBoxOpen(false);
  };

  const handleEscKeyPress = (e) => {
    if (e.keyCode === 27) {
      setIsBoxOpen(false);
    }
  };

  const toggleTooltipBox = () => {
    setIsBoxOpen((prevState) => !prevState);
    // console.log(tooltipBoxRef.current.offsetLeft);
    // console.log(tooltipBoxRef.current.getBoundingClientRect().width);
    console.log(tooltipContainerRef);
    console.log(window.innerHeight);
    console.log('box', tooltipContainerRef.current.childNodes[1])
  };

  const renderDescription = () =>
    DescriptionElement ? (
      <div className={styles.descriptionElement}>{DescriptionElement}</div>
    ) : description ? (
      <p className={styles.description}>{description}</p>
    ) : null;

  return (
    <div ref={tooltipContainerRef} className={containerClasses}>
      <img src={ToolTipIcon} alt='tooltip' onClick={toggleTooltipBox} />

      {isBoxOpen && (
        <div ref={tooltipBoxRef} className={styles.box}>
          <button className={styles.closeButton} onClick={toggleTooltipBox}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </button>
          <p className={styles.heading}>{heading}</p>

          {renderDescription()}
        </div>
      )}
    </div>
  );
};

ToolTip.propTypes = {
  icon: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  descriptionElement: PropTypes.element,
  containerClass: PropTypes.string,
};

export default ToolTip;
