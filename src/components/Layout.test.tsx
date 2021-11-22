import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Layout from './Layout';

describe('Layout', () => {
  it('should render the layout', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<span>Home Page</span>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('should navigate to About Page', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<span>Home Page</span>} />
            <Route path="/about" element={<span>About Page</span>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    userEvent.click(screen.getByText('About'));

    expect(screen.getByText('About Page')).toBeInTheDocument();
    expect(screen.queryByText('Home Page')).not.toBeInTheDocument();
  });
});
