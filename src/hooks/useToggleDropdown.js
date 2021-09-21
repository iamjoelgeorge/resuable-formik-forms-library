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

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [elementRef]);

  const toggleDropdown = () => {
    setState((prevState) => !prevState);
  };

  return [state, setState, toggleDropdown];
};
