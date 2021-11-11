import React, { useRef } from 'react';

import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';

import styles from './ToolTip.module.scss';
import { joinClassNames } from '../../../utils/utils';
import { ToolTipIcon } from '../../../constants/icons';
import { useToggleDropdown } from '../../../hooks/useToggleDropdown';

const ToolTip = (props) => {
  const { heading, description, descriptionElement: DescriptionElement, containerClass } = props;

  const tooltipContainerRef = useRef();
  const tooltipBoxRef = useRef();

  const [isBoxOpen, setIsBoxOpen, toggleTooltipBox] = useToggleDropdown(tooltipContainerRef);

  if (isBoxOpen) {
    setTimeout(() => {
      console.log(tooltipBoxRef);
    }, 500);
  }

  const containerClasses = joinClassNames([styles.container, containerClass]);

  const renderDescription = () =>
    DescriptionElement ? (
      <div className={styles.descriptionElement}>{DescriptionElement}</div>
    ) : description ? (
      <p className={styles.description}>{description}</p>
    ) : null;

  const testTooltip = 
    <div className={styles.box}>
      <button className={styles.closeButton} onClick={toggleTooltipBox}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </button>
      {heading && <p className={styles.heading}>{heading}</p>}

      {renderDescription()}
    </div>

  return (
    <div
      data-testid={`tooltip-icon-${heading}`}
      ref={tooltipContainerRef}
      className={containerClasses}
    >
      {/* <Tippy content={testTooltip} trigger="click">
        <span
          onClick={toggleTooltipBox}
          role='button'
          tabIndex='0'
          aria-label='Help Tooltip'
          aria-expanded='false'
          aria-labelledby='mytooltipbutton-1 mytooltip-1'
          className='js-tooltipAccessor'
        >
          <img src={ToolTipIcon} alt='tooltip button' />
        </span>
      </Tippy> */}

      {/* {isBoxOpen && ( */}
      <div
        ref={tooltipBoxRef}
        id='mytooltip-1'
        className={`js-tooltipContent css-tooltip ${styles.box}`}
        style={{ visibility: 'hidden' }}
        role='tooltip'
      >
        <button className={styles.closeButton} onClick={toggleTooltipBox}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </button>
        {heading && <p className={styles.heading}>{heading}</p>}

        {renderDescription()}
      </div>
      {/* )} */}
    </div>
  );
};

ToolTip.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  descriptionElement: PropTypes.element,
  containerClass: PropTypes.string,
};

ToolTip.defaultProps = {
  heading: '',
  description: '',
  descriptionElement: null,
  containerClass: '',
};

export default ToolTip;
