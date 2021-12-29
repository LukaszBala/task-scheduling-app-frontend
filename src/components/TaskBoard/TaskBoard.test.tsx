import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskBoard from './TaskBoard';

describe('<TaskBoard />', () => {
  test('it should mount', () => {
    render(<TaskBoard />);
    
    const taskBoard = screen.getByTestId('TaskBoard');

    expect(taskBoard).toBeInTheDocument();
  });
});