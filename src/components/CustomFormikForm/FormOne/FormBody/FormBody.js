import React from 'react';
import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';
import DatePicker from '../../DatePicker/DatePicker';
import FileUploadInput from '../../FileUploadInput/FileUploadInput';
import Input from '../../Input/Input';
import Textarea from '../../Textarea/Textarea';

import styles from './FormBody.module.scss';

const FormBody = (props) => {
  const { formik } = props;

  const testElement = (
    <p>
      I am a custom description. Ask{' '}
      <a href='https://www.google.com' target='_blank' rel='noreferrer'>
        Google
      </a>{' '}
      if you don't believe me.
    </p>
  );

  return (
    <>
      <h1>Form 1</h1>
      <Input formik={formik} type='test' name='test' label='Disabled Input' disabled />
      <div>
        <div className={styles.testContainer}>
          <Input formik={formik} type='name' name='name' label='Name' />
          <Input
            formik={formik}
            type='text'
            name='age'
            label='Age (with placeholder)'
            placeholder='Tell us how old you are'
            tooltipLinkText='This is a Tooltip link?'
            tooltipLink='#'
          />
        </div>
      </div>

      <Input
        formik={formik}
        type='email'
        name='email'
        label='Email'
        helpLink='#'
        helpLinkText='This is a Help link?'
        isRequired
        tooltipIconBoxHeading='Permitted with no fee'
        tooltipIconBoxDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
      />
      <DatePicker formik={formik} name='departureDate' label='Departure Date' />
      <DatePicker formik={formik} name='returnDate' dropdown label='Return Date' />
      <Input
        formik={formik}
        type='number'
        name='test'
        label='Test Input'
        optionalText='Optional'
        tooltipIconBoxHeading='Permitted with no fee'
        tooltipIconBoxDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
      />
      <Textarea formik={formik} name='description' label='Additional Details' />
      <Checkbox
        formik={formik}
        name='license'
        optionLabel='Do you have a license?'
        mainLabel='License'
        helpLink='#'
        helpLinkText='This link is for your help'
        optionLabelTooltipBoxHeading='My description is a custom element!!!'
        optionLabelTooltipIconChildElement={testElement}
      />
      <FileUploadInput formik={formik} name='idProofs' label='Upload your documents' />

      <Button formik={formik} label='Submit' />
    </>
  );
};

export default FormBody;
