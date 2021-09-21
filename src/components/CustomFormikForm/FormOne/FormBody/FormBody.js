import React from 'react';
import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';
import DatePicker from '../../DatePicker/DatePicker';
import FileUploadInput from '../../FileUploadInput/FileUploadInput';
import Input from '../../Input/Input';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';
import Textarea from '../../Textarea/Textarea';

import styles from './FormBody.module.scss';

const radioOptions = [
  { label: 'One Radio', value: 'one' },
  { label: 'Two Radio', value: 'two' },
  {
    label: 'Three Radio',
    value: 'three',
    tooltip: {
      heading: 'Heading',
      customDescriptionElement: (
        <p>
          I'm a custom description Element. Look me up on{' '}
          <a href='https://www.google.com'>Google</a>
        </p>
      ),
    },
  },
];

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
      <Input formik={formik} type='text' name='test' label='Disabled Input' isDisabled />
      <div>
        <div className={styles.testContainer}>
          <Input
            data-testid='name'
            formik={formik}
            type='text'
            name='name'
            label='Name'
            containerClass={styles.input}
          />
          <Input
            formik={formik}
            type='text'
            name='age'
            label='Age (with placeholder)'
            placeholder='Tell us how old you are'
            tooltipLinkText='This is a Tooltip link?'
            tooltipLink='#'
            containerClass={styles.input}
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
        // isRequired
        tooltipBoxHeading='Permitted with no fee'
        tooltipBoxDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
      />
      <DatePicker
        formik={formik}
        name='departureDate'
        label='Departure Date'
        // minDate={new Date()}
        // maxDate={new Date('29 Oct 2021')}
        maxDaysInTheFuture={5}
        maxDaysInThePast={10}
        optionalText='Optional'
        // helpLink='#'
        // helpLinkText='This link is for your help'
        // tooltipLink='https://www.google.com'
        // tooltipLinkText='Visit Google to know more.'
        labelTooltipBoxHeading='Permitted with no fee'
        labelTooltipBoxDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
        isRequired
        // isDisabled
      />
      <DatePicker
        formik={formik}
        name='returnDate'
        label='Return Date'
        isDropdown
        minYear='2010'
        maxYear='2030'
        // optionalText='Optional'
        // helpLink='#'
        // helpLinkText='This link is for your help'
        tooltipLink='https://www.google.com'
        tooltipLinkText='Visit Google to know more.'
        labelTooltipBoxHeading='Permitted with no fee'
        labelTooltipBoxDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
        // isRequired
        // isDisabled
      />
      <Input
        formik={formik}
        type='number'
        name='test'
        label='Test Input'
        optionalText='Optional'
        tooltipBoxHeading='Permitted with no fee'
        tooltipBoxDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
      />
      <Textarea
        formik={formik}
        containerClass={styles.description}
        name='description'
        label='Additional Details'
        labelTooltipBoxHeading='What is Lorem Ipsum?'
        labelTooltipBoxDescription='Lorem Ipsum is simply dummy text.'
        // placeholder='This is a placeholder for the Textarea'
        optionalText='This is your textarea optional text'
        // helpLink='#'
        // helpLinkText='This link is for your help'
        // tooltipLink='https://www.google.com'
        // tooltipLinkText='Visit Google to know more.'
      />
      <Checkbox
        formik={formik}
        name='license'
        optionLabel='Do you have a license?'
        mainLabel='License'
        helpLink='#'
        helpLinkText='This link is for your help'
        optionLabelTooltipBoxHeading='My description is a custom element!!!'
        optionLabelTooltipBoxDescriptionElement={testElement}
      />
      <RadioButtonGroup
        name='formOneRadioGroup'
        options={radioOptions}
        formik={formik}
        mainLabel='Radio Group'
        mainLabelTooltipBoxHeading='What is Lorem Ipsum?'
        mainLabelTooltipBoxDescription='Lorem Ipsum is simply dummy text.'
        tooltipLink='https://www.google.com'
        tooltipLinkText='Visit Google to know more.'
      />

      <FileUploadInput
        formik={formik}
        name='idProofs'
        label='Upload your documents'
        labelTooltipBoxHeading='What is Lorem Ipsum?'
        labelTooltipBoxDescription='Lorem Ipsum is simply dummy text.'
        optionalText='test'
        multiple
        // isRequired
        // isDisabled
      />

      <Button formik={formik} label='Submit' />
    </>
  );
};

export default FormBody;
