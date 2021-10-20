import React from 'react';

import styles from './FormBody.module.scss';
import { STRINGS } from '../../../../constants/strings';
import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';
import DatePicker from '../../DatePicker/DatePicker';
import FileUploadInput from '../../FileUploadInput/FileUploadInput';
import Input from '../../Input/Input';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';
import Textarea from '../../Textarea/Textarea';

const testElement = (
  <p>
    {STRINGS.formOne.customDescription}{' '}
    <a href='https://www.google.com' target='_blank' rel='noreferrer'>
      {STRINGS.formOne.google}
    </a>
  </p>
);

const radioOptions = [
  { label: 'One Radio', value: 'one' },
  { label: 'Two Radio', value: 'two' },
  {
    label: 'Three Radio',
    value: 'three',
    tooltip: {
      heading: 'Heading',
      customDescriptionElement: testElement,
    },
  },
];

const FormBody = () => {
  return (
    <>
      <h1>Form 1</h1>
      <Input type='text' name='test' label='Disabled Input' isDisabled />
      <div>
        <div className={styles.testContainer}>
          <Input
            data-testid='name'
            type='text'
            name='name'
            label='Name'
            containerClass={styles.input}
          />
          <Input
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
        type='email'
        name='email'
        label='Email'
        helpLink='#'
        helpLinkText='This is a Help link?'
        // isRequired
        tooltipBoxBesideInputHeading='Permitted with no fee'
        tooltipBoxBesideInputDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
      />
      <DatePicker
        name='departureDate'
        label='Departure Date'
        // minDate={new Date()}
        // maxDate={new Date('29 Oct 2021')}
        // maxDaysInTheFuture={5}
        // maxDaysInThePast={10}
        optionalText='Optional'
        // helpLink='#'
        // helpLinkText='This link is for your help'
        // tooltipLink='https://www.google.com'
        // tooltipLinkText='Visit Google to know more.'
        isRequired
        // isDisabled
      />
      <DatePicker
        name='returnDate'
        label='Return Date'
        isDropdown
        minDate={new Date('12 Feb 2000')}
        maxDaysInTheFuture={365}
        tooltipLink='https://www.google.com'
        tooltipLinkText='Visit Google to know more.'
      />
      <Input
        type='number'
        name='test'
        label='Test Input'
        optionalText='Optional'
        tooltipBoxBesideInputHeading='Permitted with no fee'
        tooltipBoxBesideInputDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
      />
      <Textarea
        containerClass={styles.description}
        name='description'
        label='Additional Details'
        mainLabelTooltipBoxHeading='What is Lorem Ipsum?'
        mainLabelTooltipBoxDescription='Lorem Ipsum is simply dummy text.'
        // placeholder='This is a placeholder for the Textarea'
        optionalText='This is your textarea optional text'
        // helpLink='#'
        // helpLinkText='This link is for your help'
        // tooltipLink='https://www.google.com'
        // tooltipLinkText='Visit Google to know more.'
      />
      <Checkbox
        name='license'
        optionLabel='Do you have a license?'
        mainLabel='License'
        helpLink='#'
        helpLinkText='This link is for your help'
        // optionLabelTooltipBoxHeading='My description is a custom element!!!'
        // optionLabelTooltipBoxDescriptionElement={testElement}
      />
      <Checkbox name='testCheckbox' optionLabel='You have to check me' mainLabel='Test test' />
      <RadioButtonGroup
        name='formOneRadioGroup'
        options={radioOptions}
        mainLabel='Radio Group'
        mainLabelTooltipBoxHeading='What is Lorem Ipsum?'
        mainLabelTooltipBoxDescription='Lorem Ipsum is simply dummy text.'
        tooltipLink='https://www.google.com'
        tooltipLinkText='Visit Google to know more.'
      />

      <FileUploadInput
        name='idProofs'
        label='Upload your documents'
        mainLabelTooltipBoxHeading='What is Lorem Ipsum?'
        mainLabelTooltipBoxDescription='Lorem Ipsum is simply dummy text.'
        optionalText='test'
        multiple
        // isRequired
        // isDisabled
      />

      <Button label='Submit' />
    </>
  );
};

export default FormBody;
