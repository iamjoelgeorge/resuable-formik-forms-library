import React from 'react';

import PropTypes from 'prop-types';

import OptionalText from '../OptionalText/OptionalText';

const AdditionalInfo = (props) => {
  const { optionalText, helpLinkText, helpLink, tooltipLinkText, tooltipLink, customClass } = props;

  return (
    <>
      {optionalText && (
        <OptionalText containerClass={customClass} variant='text' optionalText={optionalText} />
      )}

      {helpLinkText && (
        <OptionalText
          containerClass={customClass}
          variant='help link'
          helpLinkText={helpLinkText}
          helpLink={helpLink}
        />
      )}

      {tooltipLinkText && (
        <OptionalText
          containerClass={customClass}
          variant='tooltip link'
          tooltipLinkText={tooltipLinkText}
          tooltipLink={tooltipLink}
        />
      )}
    </>
  );
};

AdditionalInfo.propTypes = {
  optionalText: PropTypes.string,
  helpLinkText: PropTypes.string,
  helpLink: PropTypes.string,
  tooltipLinkText: PropTypes.string,
  tooltipLink: PropTypes.string,
  customClass: PropTypes.string,
};

AdditionalInfo.defaultProps = {
  optionalText: '',
  helpLinkText: '',
  helpLink: '',
  tooltipLinkText: '',
  tooltipLink: '',
  customClass: '',
};

export default AdditionalInfo;
