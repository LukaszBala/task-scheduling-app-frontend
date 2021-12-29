import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RootContainer from './RootContainer';

describe('<RootContainer />', () => {
  test('it should mount', () => {
    render(<RootContainer />);
    
    const rootContainer = screen.getByTestId('RootContainer');

    expect(rootContainer).toBeInTheDocument();
  });
});