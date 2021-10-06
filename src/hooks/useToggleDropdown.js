import { useLayoutEffect, useState } from 'react';

import { keyCodes } from '../constants/constants';

export const useToggleDropdown = (elementRef) => {
  const [state, setState] = useState(false);

  useLayoutEffect(() => {
    const handleClickOutside = (e) => {
      const node = elementRef.current;
      const clickedNode = e.target;

      if (node?.contains(clickedNode)) return;
      setState(false);
    };

    const handleEscKeyPress = (e) => {
      if (e.keyCode === keyCodes.esc) {
        setState(false);
      }
    };

    const handleSpaceAndEnterKeyPress = (e) => {
      if (e.keyCode === keyCodes.spaceBar || e.keyCode === keyCodes.enter) {
        const node = elementRef.current;
        const clickedNode = e.target;

        if (node?.contains(clickedNode)) setState(true);
        return;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', function (e) {
      handleEscKeyPress(e);
      handleSpaceAndEnterKeyPress(e);
    });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', function (e) {
        handleEscKeyPress(e);
        handleSpaceAndEnterKeyPress(e);
      });
    };
  }, [elementRef]);

  const toggleDropdown = () => {
    setState((prevState) => !prevState);
  };

  return [state, setState, toggleDropdown];
};
