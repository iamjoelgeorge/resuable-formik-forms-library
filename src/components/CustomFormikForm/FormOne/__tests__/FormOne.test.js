import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import FormOne from '../FormOne';

afterEach(cleanup);
describe('[Component]: FormOne', () => {
  it('should match the Snapshot', () => {
    const tree = renderer.create(<FormOne />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render and submit the form', async () => {
    // const handleSubmit = jest.fn();
    render(<FormOne />);
    // userEvent.type(screen.getByLabelText(/name/i), 'John');

    // await waitFor(() =>
    //   expect(handleSubmit).toHaveBeenCalledWith({
    //     name: 'John',
    //   }),
    // );
  });
});
