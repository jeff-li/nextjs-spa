import React from 'react';
import { render, screen } from '@testing-library/react';
import PreRender from './pre-render.page';

describe('Layout', () => {
  it('should render the layout', () => {
    render(
      <PreRender name="test" />
    );

    expect(screen.getByText('This is a page created by test')).toBeInTheDocument();
  });
});
