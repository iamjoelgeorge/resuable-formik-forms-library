import React from 'react';
import BoxTest from './BoxTest/BoxTest';
import styles from './BoxGalleryTest.module.scss';

const BoxGalleryTest = () => {
  return (
    <div className={styles.container}>
      <BoxTest />
      <BoxTest />
      <BoxTest />
      <BoxTest />
    </div>
  );
};

export default BoxGalleryTest;
