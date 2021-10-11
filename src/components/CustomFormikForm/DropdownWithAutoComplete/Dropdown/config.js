const colors = {
  white: '#FFFFFF',
  brightPurple: '#AA77FF',
  lightPurple: '#ECE0FF',
  primary: '#512698',
  lighterGrey: '#E8E8E8',
  primaryDark: '#241b33',
  borderGrey: '#00000014',
};

export const customStylesForDropdown = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? colors.white : colors.white,
    border: 'none',
    borderRadius: '0',
    borderBottom: state.isFocused
      ? `1px dashed ${colors.brightPurple}`
      : `1px solid ${colors.lighterGrey}`,
    boxShadow: '0',
    cursor: 'pointer',
    ':hover': {
      borderBottomColor: colors.brightPurple,
    },
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
    overflowY: 'scroll',
    maxHeight: '265px',
  }),
  menu: (provided) => ({
    ...provided,
    padding: '10px 0',
    border: 0,
    borderTop: `1px solid ${colors.primary}`,
    borderRadius: '0px 0px 4px 4px',
    boxShadow: `0px 2px 2px ${colors.borderGrey}`,
    top: '75%',
  }),
  menuPortal: (provided) => ({
    ...provided,
    backgroundColor: 'pink',
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: 'none',
    color: colors.primaryDark,
    backgroundColor: state.isFocused ? colors.lightPurple : colors.white,
    fontSize: '14px',
    fontWeight: state.isSelected ? '600' : '400',
    padding: '5px 15px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: colors.lightPurple,
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '14px',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
  }),
  singleValue: (provided) => ({
    ...provided,

    fontSize: '14px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};
