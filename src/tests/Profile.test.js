import React from 'react';
import { screen } from '@testing-library/react';

import Profile from '../pages/Profile';
import renderWithRouter from '../helpers/renderWithRouter';
import LoginProvider from '../Context/LoginProvider';

const localStorage = (id, local) => {
  window.localStorage.setItem(id, JSON.stringify(local));
};

localStorage('user', { email: 'teste2@gmail.com' });

describe('Testes do profile', () => {
  test('testa se email e boteos sao renderizados', () => {
    renderWithRouter(
      <LoginProvider>
        <Profile />
      </LoginProvider>,
    );
    const email = screen.getByTestId(/profile-email/i);
    const doneRecipes = screen.getByTestId(/profile-done-btn/i);
    const FavRecipes = screen.getByTestId(/profile-favorite-btn/i);
    const logoutBtn = screen.getByTestId(/profile-logout-btn/i);

    expect(email).toBeInTheDocument();
    expect(doneRecipes).toBeInTheDocument();
    expect(FavRecipes).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
});
