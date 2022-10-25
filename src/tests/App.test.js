import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { renderWithRouter } from 'react-router-dom';
import App from '../App';

describe('Testando App de Receitas', () => {
  test('Testes da tela de login', () => {
    render(<App />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });
});
