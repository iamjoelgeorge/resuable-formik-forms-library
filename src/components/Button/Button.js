import React from 'react';

import styles from './Button.module.scss';

const Button = (props) => {
  const { label, type, onClick, ...rest } = props;

  return (
    <button className={styles.button} type={type} {...rest}>
      Submit
    </button>
  );
};

export default Button;
