import React from 'react';

import styles from './FormBody.module.scss';
import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';
import DropdownWithoutAutoComplete from '../../DropdownWithoutAutoComplete/DropdownWithoutAutoComplete';
import Input from '../../Input/Input';

const FormBody = (props) => {
  const { formik } = props;

  const dropdownArray = ['Other', 'Mr.', 'Ms.', 'Mrs.'];

  const showExtraInput = formik.values['salutation'].trim().toLowerCase() === 'other';

  return (
    <>
      <h1>Form 2</h1>
      <Checkbox
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
        name='salutation'
        label='Salutation'
        dropdownArray={dropdownArray}
        containerClass={styles.dropdown}
        mainLabelTooltipBoxHeading='Permitted with no fee'
        mainLabelTooltipBoxDescription='For cancellation, credit to Travel Bank for the full ticket value including any fare portion where Velocity Points have been redeemed.'
        helpLink='#'
        helpLinkText='This link is for your help, haha!'
        isDisabled={!formik.values['terms']}
      />

      {showExtraInput && (
        <Input type='text' name='other' label='Other' containerClass={styles.input} />
      )}

      <Button type='submit' label='Submit' theme='red' />
    </>
  );
};

export default FormBody;
