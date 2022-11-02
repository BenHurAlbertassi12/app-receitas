import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Header from '../component/Header';
// import HeaderDois from '../component/HeaderDois';
import renderWithRouter from '../helpers/renderWithRouter';
//
describe('Testa o componente header', () => {
  it('testa se o link redireciona para a pagina profile', () => {
    const { history } = renderWithRouter(<Header />);
    const linkButton = screen.getByRole('link');
    expect(linkButton).toBeInTheDocument();
    userEvent.click(linkButton);
    expect(history.location.pathname).toBe('/profile');
  });

  it('testa se ao clicar no botão de busca o componente searchBar é renderizado', () => {
    renderWithRouter(<Header />);
    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);
    const searchInput = screen.getByLabelText('Search');
    expect(searchInput).toBeInTheDocument();
  });
});
