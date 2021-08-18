import React from 'react';
import Box from '../Box/Box';
import styles from './BoxGallery.module.scss';

const BoxGallery = () => {
  return (
    <div className={styles.gallery}>
      <Box label="20" />
      <Box label="50" />
      <Box label="66" />
    </div>
  );
};

export default BoxGallery;
