import { useLayoutEffect, useState } from 'react';

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
      if (e.keyCode === 27) {
        setState(false);
      }
    };

    const handleTabAndEnterKeyPress = (e) => {
      if (e.keyCode === 32 || e.keyCode === 13) {
        const node = elementRef.current;
        const clickedNode = e.target;

        if (node?.contains(clickedNode)) setState(true);
        return;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', function (e) {
      handleEscKeyPress(e);
      handleTabAndEnterKeyPress(e);
    });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', function (e) {
        handleEscKeyPress(e);
        handleTabAndEnterKeyPress(e);
      });
    };
  }, [elementRef]);

  const toggleDropdown = () => {
    setState((prevState) => !prevState);
  };

  return [state, setState, toggleDropdown];
};
