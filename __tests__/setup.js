import 'babel-polyfill';
import { render } from '@testing-library/react';

const renderWithTheme = (children) => render(children);

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

export { renderWithTheme };
