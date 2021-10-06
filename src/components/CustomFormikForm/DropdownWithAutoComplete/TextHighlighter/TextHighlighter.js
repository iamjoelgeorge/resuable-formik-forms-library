import React from 'react';

import PropTypes from 'prop-types';

function TextHighlighter({ textToCompare, patternToMatch }) {
  const regRex = new RegExp(patternToMatch.replace('(', '\\(').replace(')', '\\)'), 'gi');
  const textArray = textToCompare.split(regRex);

  if (textArray.length <= 1) {
    return textToCompare;
  }

  const matches = textToCompare.match(regRex);

  return textArray.reduce(
    (result, current, index) =>
      matches[index]
        ? [...result, current, <b key={current}>{matches[index]}</b>]
        : [...result, current],
    [],
  );
}

TextHighlighter.propTypes = {
  textToCompare: PropTypes.string.isRequired,
  patternToMatch: PropTypes.string.isRequired,
};

export default TextHighlighter;
