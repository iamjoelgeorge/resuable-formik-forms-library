import React, { useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Field } from 'formik';

import styles from './FileUploadInput.module.scss';
import { DeleteIcon } from '../../../constants/icons';
import ErrorText from '../ErrorText/ErrorText';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';
import SlidingLabel from '../SlidingLabel/SlidingLabel';

const FileUploadInput = (props) => {
  const {
    label,
    name,
    formik,
    containerClass: customContainerClass,
    labelTooltipBoxHeading,
    labelTooltipBoxDescription,
    labelTooltipBoxDescriptionElement,
    tooltipLink,
    tooltipLinkText,
    helpLinkText,
    helpLink,
    optionalText,
    isRequired,
    isDisabled,
    multiple = false,
    ...rest
  } = props;

  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileRef = useRef();

  const userHasVisitedTheInputField = formik.touched[name];
  const inputFieldHasErrors = formik.errors[name];
  const addErrorClassesToLabelAndInput = !!userHasVisitedTheInputField && !!inputFieldHasErrors;

  const handleChange = (setFieldValue) => {
    const files = Array.from(fileRef?.current?.files);

    setSelectedFiles(files);
    setFieldValue(name, files);
  };

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleDelete = (fileName, setFieldValue) => {
    // Clearing the original files so the user can re-select the same list again.
    // This is fine because we store the files in our state when they are uploaded.
    fileRef.current.value = null;

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
        <button
          type='button'
          className={styles.deleteFileButton}
          onClick={() => handleDelete(file.name, setFieldValue)}
        >
          <img src={DeleteIcon} alt='Remove file' />
        </button>
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      {label && (
        <SlidingLabel
          label={label}
          htmlFor={name}
          inputEntered={true}
          customClass={styles.label}
          showErrorStyle={addErrorClassesToLabelAndInput}
          tooltipBoxHeading={labelTooltipBoxHeading}
          tooltipBoxDescription={labelTooltipBoxDescription}
          tooltipBoxDescriptionElement={labelTooltipBoxDescriptionElement}
          inputIsRequired={isRequired}
        />
      )}

      <Field name={name} {...rest}>
        {({ form, field }) => {
          const { setFieldValue } = form;

          return (
            <>
              <div className={styles.uploadButtonContainer}>
                <input
                  hidden='hidden'
                  multiple={multiple}
                  ref={fileRef}
                  type='file'
                  disabled={isDisabled}
                  onChange={() => handleChange(setFieldValue)}
                />

                <button
                  className={styles.buttonToOpenFileUploader}
                  type='button'
                  onClick={handleClick}
                >
                  Upload files
                </button>
              </div>

              <ErrorText containerClass={styles.errorContainer} fieldName={name} />

              <AdditionalInfo
                customClass={styles.optionalText}
                optionalText={optionalText}
                helpLinkText={helpLinkText}
                helpLink={helpLink}
                tooltipLinkText={tooltipLinkText}
                tooltipLink={tooltipLink}
              />
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

FileUploadInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  formik: PropTypes.shape({}),
  containerClass: PropTypes.string,
  labelTooltipBoxHeading: PropTypes.string,
  labelTooltipBoxDescription: PropTypes.string,
  labelTooltipBoxDescriptionElement: PropTypes.element,
  tooltipLink: PropTypes.string,
  tooltipLinkText: PropTypes.string,
  helpLinkText: PropTypes.string,
  helpLink: PropTypes.string,
  optionalText: PropTypes.string,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  multiple: PropTypes.bool,
};

FileUploadInput.defaultProps = {
  formik: {},
  containerClass: '',
  labelTooltipBoxHeading: '',
  labelTooltipBoxDescription: '',
  labelTooltipBoxDescriptionElement: null,
  tooltipLink: '',
  tooltipLinkText: '',
  helpLinkText: '',
  helpLink: '',
  optionalText: '',
  isRequired: false,
  isDisabled: false,
  multiple: false,
};

export default FileUploadInput;
