import React from 'react';

import Tippy from '@tippyjs/react';

import Button from '../../Button/Button';
import Checkbox from '../../Checkbox/Checkbox';

const FormBody = (props) => {
  const { formik } = props;

  const isDisabled = !formik.values['newTab'];

  return (
    <>
      <h1>Form 3</h1>
      <Checkbox
        name='newTab'
        optionLabel='Checking this box will open the link in a new tab.'
        mainLabel='Test Label'
        isRequired
        mainLabelTooltipBoxHeading='What is Lorem Ipsum?'
        mainLabelTooltipBoxDescription='Lorem Ipsum is simply dummy text.'
      />

      {/* <Tippy content={<span>Tooltip</span>}>
        <button>My button</button>
      </Tippy> */}

      <Button
        label='Open in new tab'
        variant='link'
        href='https://virginaustralia.com/'
        theme='red'
        isDisabled={isDisabled}
        showExternalLinkIcon
      />

      <Button
        label='Link as Button'
        variant='link_as_button'
        href='https://virginaustralia.com/'
        isDisabled={isDisabled}
        showExternalLinkIcon
      />
    </>
  );
};

export default FormBody;
