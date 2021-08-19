import React, { useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Field } from 'formik';

import styles from './FileUploadInput.module.scss';
import DeleteIcon from '../../../assets/images/cross.svg';

const FileUploadInput = (props) => {
  const { name, formik, ...rest } = props;
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fileRef = useRef();

  const handleChange = (setFieldValue) => {
    const files = Array.from(fileRef?.current?.files);

    setSelectedFiles(files);
    setFieldValue(name, files);
  };

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleDelete = (fileName, setFieldValue) => {
    const filteredFiles = selectedFiles.filter(
      (file) => file.name.trim().toLowerCase() !== fileName.trim().toLowerCase(),
    );

    setSelectedFiles(filteredFiles);
    setFieldValue(name, filteredFiles);
  };

  const renderSelectedFiles = (setFieldValue) => {
    return selectedFiles?.map((file) => (
      <div key={uuidv4()} className={styles.fileNameChipContainer}>
        <span className={styles.fileNameChip}>{file.name}</span>
        <img
          className={styles.deleteIcon}
          onClick={() => handleDelete(file.name, setFieldValue)}
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
              {selectedFiles.length > 0 && (
                <div className={styles.selectedFiles}>{renderSelectedFiles(setFieldValue)}</div>
              )}
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default FileUploadInput;
