import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import Login from '../pages/Login';
import renderWithRouter from '../helpers/renderWithRouter';

const idEmail = 'email-input';
const idPassword = 'password-input';
const idButton = 'login-submit-btn';

describe('Testando a tela de login', () => {
  test('Testa se todos os elementos estão na tela', () => {
    render(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passwordInput = screen.getByTestId(idPassword);
    const loginButton = screen.getByTestId(idButton);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    const loginTittle = screen.getByRole('heading', { level: 2, name: /login/i });
    expect(loginTittle).toBeInTheDocument();
  });

  test('Testa se o botão é habilitado quando são digitados email e senha corretas', () => {
    render(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passwordInput = screen.getByTestId(idPassword);
    const loginButton = screen.getByTestId(idButton);
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginButton).not.toBeDisabled();
  });

  test('Testa se o botão fica desabilitado com', () => {
    render(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passwordInput = screen.getByTestId(idPassword);
    const loginButton = screen.getByTestId(idButton);
    userEvent.type(emailInput, 'teste');
    userEvent.type(passwordInput, '12345');
    expect(loginButton).toBeDisabled();
  });

  test('Testa se ao clicar no botão com as informações certa é direcionado para rota correta', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passwordInput = screen.getByTestId(idPassword);
    const loginButton = screen.getByTestId(idButton);
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);
    expect(history.location.pathname).toBe('/meals');
  });
});
