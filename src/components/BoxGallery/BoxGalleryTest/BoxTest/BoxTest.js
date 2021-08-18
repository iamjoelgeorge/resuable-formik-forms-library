import React from 'react';
import styles from './BoxTest.module.scss';

const BoxTest = () => {
  return (
    <div className={styles.boxContainer}>
      <div className={styles.boxContent}>
        <h1>42</h1>
      </div>
    </div>
  );
};

export default BoxTest;
