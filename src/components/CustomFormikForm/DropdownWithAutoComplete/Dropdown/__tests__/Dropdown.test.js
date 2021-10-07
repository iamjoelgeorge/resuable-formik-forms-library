/* eslint-disable */
import React from 'react';

import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import Button from '../../Button/Button';
import { commonProps } from '../../../../../constants/constants';
import FormContainer from '../../../FormContainer/FormContainer'
import Dropdown from '../Dropdown';

const dropdownArray = [
  {
    label: 'Hamilton Island (HTI)',
    value: 'Hamilton Island (HTI)',
  },
  {
    label: 'Rockhampton (ROK)',
    value: 'Rockhampton (ROK)',
  },
  {
    label: 'Hamilton (HLZ)',
    value: 'Hamilton (HLZ)',
  },
  {
    label: 'Adelaide (ADL)',
    value: 'Adelaide (ADL)',
  },
  {
    label: 'Texas (TXS)',
    value: 'Texas (TXS)',
  },
  {
    label: 'Bangalore (BNR)',
    value: 'Bangalore (BNR)',
  },
  {
    label: 'Los Angeles (LAX)',
    value: 'Los Angeles (LAX)',
  },
  {
    label: 'Nowhere (NWR)',
    value: 'Nowhere (NWR)',
  },
  {
    label: 'Somewhere (SWR)',
    value: 'Somewhere (SWR)',
  },
  {
    label: 'Home (HME)',
    value: 'Home (HME)',
  },
];

const defaultProps = {
  ...commonProps,
  name: 'regionDropdown',
  label: 'Region Dropdown',
  placeholder: '',
  isSearchable: false,
  dropdownArray: dropdownArray,
};

const initialValues = {
  regionDropdown: '',
};

const defaultValidations = [];
const handleSubmit = jest.fn();

afterEach(cleanup);

describe('[Component]: Dropdown', () => {
  it('should match the Snapshot', () => {
    const tree = renderer
      .create(
        <FormContainer
          initialValues={initialValues}
          validations={defaultValidations}
          onSubmit={handleSubmit}
        >
          <Dropdown {...defaultProps} />
        </FormContainer>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
