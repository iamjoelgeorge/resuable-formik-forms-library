import React, { useRef } from 'react';

import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Field } from 'formik';

import styles from './FileUploadInput.module.scss';
import DeleteIcon from '../../../assets/images/cross.svg';

const FileUploadInput = (props) => {
  const { name, formik, ...rest } = props;

  const fileRef = useRef();

  const getSelectedFiles = () => Array.from(fileRef?.current?.files);

  const handleChange = (setFieldValue) => {
    const files = getSelectedFiles();
    setFieldValue(name, files);
  };

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleDelete = () => {
    const selectedFiles = getSelectedFiles();
    console.log(selectedFiles);
  };

  const renderSelectedFiles = () => {
    const selectedFiles = getSelectedFiles();

    console.log(selectedFiles); // Todo: This function needs to run only when there is a change in the input.

    return selectedFiles?.map((file) => (
      <div key={uuidv4()} className={styles.fileNameChipContainer}>
        <span className={styles.fileNameChip}>{file.name}</span>
        <img
          className={styles.deleteIcon}
          onClick={handleDelete}
          src={DeleteIcon}
          alt='Remove file'
        />
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <Field name={name} {...rest}>
        {({ form, field }) => {
          const { setFieldValue } = form;

          return (
            <>
              <div className={styles.uploadButtonContainer}>
                <input
                  hidden='hidden'
                  multiple
                  ref={fileRef}
                  type='file'
                  onChange={() => handleChange(setFieldValue)}
                />

                <button
                  className={styles.buttonToOpenFileUploader}
                  type='button'
                  onClick={handleClick}
                >
                  Upload file
                </button>
              </div>
              {!!fileRef?.current?.files && (
                <div className={styles.selectedFiles}>{renderSelectedFiles()}</div>
              )}
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default FileUploadInput;
