import React from 'react';

import styles from './FormBody.module.scss';
import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';
import DropdownWithoutAutoComplete from '../../DropdownWithoutAutoComplete/DropdownWithoutAutoComplete';
import Input from '../../Input/Input';

const FormBody = (props) => {
  const { formik } = props;

  const dropdownArray = ['Other', 'Mr.', 'Ms.', 'Mrs.'];

  const TestElement = (
    <p>
      I am a custom description. Ask{' '}
      <a href='https://www.google.com' target='_blank' rel='noreferrer'>
        Google
      </a>{' '}
      if you don't believe me.
    </p>
  );

  const showExtraInput = formik.values['salutation'].trim().toLowerCase() === 'other';

  return (
    <>
      <h1>Form 2</h1>
      <Checkbox
        formik={formik}
        name='terms'
        optionLabel='I agree to the Terms and Conditions.'
        mainLabel='Terms and Conditions'
        mainLabelTooltipBoxHeading='What is Lorem Ipsum?'
        mainLabelTooltipBoxDescription='Lorem Ipsum is simply dummy text.'
        isRequired
        tooltipLink='#'
        tooltipLinkText='This link is a tooltip, haha!'
      />

      <DropdownWithoutAutoComplete
        formik={formik}
        name='salutation'
        label='Salutation'
        dropdownArray={dropdownArray}
        containerClass={styles.dropdown}
        labelTooltipBoxHeading='Permitted with no fee'
        labelTooltipBoxDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
        labelTooltipBoxDescriptionElement={TestElement}
        helpLink='#'
        helpLinkText='This link is for your help, haha!'
        isDisabled={!formik.values['terms']}
      />

      {showExtraInput && (
        <Input
          formik={formik}
          type='text'
          name='other'
          label='Other'
          containerClass={styles.input}
        />
      )}

      <Button formik={formik} type='submit' label='Submit' theme='red' />
    </>
  );
};

export default FormBody;
