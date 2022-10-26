import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';

import Profile from '../pages/Profile';

describe('Testes do profile', () => {
  it('testa o botao done', () => {
    const { history } = renderWithRouter(<Profile />);
    const button = screen.getByTestId('profile-done-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  it('teste botao favoritos', () => {
    const { history } = renderWithRouter(<Profile />);
    const button = screen.getByTestId('profile-favorite-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  it('teste botao logout', () => {
    const { history } = renderWithRouter(<Profile />);
    const button = screen.getByTestId('profile-logout-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
