import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from './index.page';

describe('Index', () => {
  it('should render the index page', () => {
    render(
      <Index />
    );

    expect(screen.getByText(/Welcome to React Router/i)).toBeInTheDocument();
  });

  it('should render 404 if route not found', () => {
    window.history.pushState({}, 'Test page', '/test')
    render(<Index />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
