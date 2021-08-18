import React from 'react';
import styles from './Box.module.scss';

const Box = ({ label }) => {
  return (
    <div className={styles.box}>
      <div>
        <h2>{label}</h2>
      </div>
    </div>
  );
};

export default Box;
