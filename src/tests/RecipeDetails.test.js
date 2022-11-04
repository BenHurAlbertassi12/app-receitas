import { screen } from '@testing-library/react';
import React from 'react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Recipes from '../pages/Recipes';
import App from '../App';

const rotaMeal = '/meals/52977';
const rotaDrink = '/drinks/15997';

describe('Testa a tela de detalhes da receita de comida', () => {
  it('Verifica se a rota está correta', () => {
    const { history } = renderWithRouter(<Recipes />, rotaMeal);
    expect(history.location.pathname).toBe(rotaMeal);
  });

  it('Verifica se os de detalhes da receita são renderizados', async () => {
    renderWithRouter(<App />, rotaMeal);
    const recipe = await screen.findByTestId('recipe-title');
    expect(recipe).toBeInTheDocument();
  });
});

describe('Testa a tela de detalhes da receita de bebida', () => {
  it('Verifica se a rota está correta', () => {
    const { history } = renderWithRouter(<Recipes />, rotaDrink);
    expect(history.location.pathname).toBe(rotaDrink);
  });

  it('Verifica se os de detalhes da receita são renderizados', async () => {
    renderWithRouter(<App />, rotaDrink);
    const recipe = await screen.findByTestId('recipe-title');
    expect(recipe).toBeInTheDocument();
  });
});
