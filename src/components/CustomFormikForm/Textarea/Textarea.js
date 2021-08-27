/* eslint-disable */
import React, { useLayoutEffect, useState } from 'react';
import { Field } from 'formik';
import { useRef } from 'react';
import SlidingLabel from '../SlidingLabel/SlidingLabel';

import styles from './Textarea.module.scss';

import { joinClassNames } from '../../../utils/utils';

const Textarea = (props) => {
  const { name, label, formik, ...rest } = props;
  const [labelView, showLabelView] = useState(true);
  const textareaRef = useRef();
  const textareaContainerRef = useRef();

  const { values } = formik;
  const inputValue = values[name];

  const textareaContainerClasses = labelView
    ? styles.container
    : joinClassNames([styles.container, styles.textareaFocused]);

  useLayoutEffect(() => {
    textareaContainerRef?.current?.addEventListener('keydown', handleKeyPressOnContainer);
    textareaRef?.current?.addEventListener('keydown', stopKeydownEventFromReachingTheContainer);
    console.log(textareaRef.current);
    return () => {
      textareaContainerRef?.current?.removeEventListener('keydown', handleKeyPressOnContainer);
      textareaRef?.current?.removeEventListener(
        'keydown',
        stopKeydownEventFromReachingTheContainer,
      );
    };
  }, [labelView]);

  const handleKeyPressOnContainer = (e) => {
    /*
    Key codes:
    13 - Enter
    32 - Space
    */
    if (e.keyCode === 13 || e.keyCode === 32) {
      console.log('inside container');
      showLabelView(false);
      setTimeout(() => {
        textareaRef?.current?.focus();
      }, 0);
    }
  };

  /*
  This function is to prevent the 'handleKeyPressOnContainer' function from
  running at every keydown (for Enter and Space keys) event in the textarea.
  */
  const stopKeydownEventFromReachingTheContainer = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.stopPropagation();
    }
  };

  const handleBlur = () => {
    showLabelView(true);
  };

  const handleClick = () => {
    showLabelView(false);

    setTimeout(() => {
      textareaRef?.current?.focus();
    }, 0);
  };

  const renderFieldView = () =>
    labelView ? (
      <div className={styles.textarea}>{inputValue}</div>
    ) : (
      <Field
        innerRef={textareaRef}
        className={styles.textarea}
        as='textarea'
        name={name}
        onBlur={handleBlur}
        {...rest}
      />
    );

  return (
    <div
      ref={textareaContainerRef}
      className={textareaContainerClasses}
      tabIndex='0'
      onClick={handleClick}
    >
      <div className={styles.fieldContainer}>
        {renderFieldView()}
        {label && (
          <SlidingLabel
            label={label}
            htmlFor={name}
            inputEntered={!!inputValue}
            showErrorStyle={false}
            customClass={styles.label}
          />
        )}
      </div>
    </div>
  );
};

export default Textarea;
