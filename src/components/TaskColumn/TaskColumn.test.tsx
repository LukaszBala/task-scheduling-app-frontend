import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskColumn from './TaskColumn';

describe('<TaskColumn />', () => {
  test('it should mount', () => {
    render(<TaskColumn />);
    
    const taskColumn = screen.getByTestId('TaskColumn');

    expect(taskColumn).toBeInTheDocument();
  });
});