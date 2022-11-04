import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
// import Login from '../pages/Login';
import Recipes from '../pages/Recipes';
import fetch from '../../cypress/mocks/fetch';

const recipeCard = '0-recipe-card';
const recipeName = '0-card-name';

describe('Testa os componentes initialMealsRecipes', () => {
  it('Testa se o título categorias é renderizado em /meals', () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouter(<Recipes />, '/meals');
    expect(history.location.pathname).toBe('/meals');
    const title = screen.getByRole('heading', { level: 2, name: /categorias/i });
    expect(title).toBeInTheDocument();
  });

  it('Testa se os botões de categorias estão na tela', async () => {
    global.fetch = jest.fn(fetch);
    renderWithRouter(<Recipes />, '/meals');
    const button = await screen.findByTestId('Beef-category-filter');

    expect(button).toBeInTheDocument();
  });

  it('Testa se as primeiras receitas são renderizados', async () => {
    global.fetch = jest.fn(fetch);
    renderWithRouter(<Recipes />, '/meals');
    const firstMeal = await screen.findByTestId(recipeCard);
    expect(firstMeal).toBeInTheDocument();
  });

  it('Testa se ao clicar uma segunda vez no mesmo botão de categoria, retorna as receitas iniciais', async () => {
    global.fetch = jest.fn(fetch);
    renderWithRouter(<Recipes />, '/meals');
    const corbaRecipe = await screen.findByTestId(recipeName, { name: /corba/i }, { timeout: 8000 });
    expect(corbaRecipe).toBeInTheDocument();
    const beefButton = await screen.findByRole('button', { name: 'Beef' }, { timeout: 8000 });
    userEvent.click(beefButton);
    const beefRecipe = await screen.findByTestId(recipeName, { name: 'Beef and Mustard Pie' }, { timeout: 8000 });
    expect(beefRecipe).toBeInTheDocument();
    const beefButton2 = await screen.findByRole('button', { name: 'Beef' }, { timeout: 8000 });
    userEvent.click(beefButton2);
    const firstMeal = await screen.findByTestId(recipeName, { name: 'Corba' }, { timeout: 8000 });
    expect(firstMeal).toBeInTheDocument();
    await screen.findByTestId('1-card-name', { name: 'Burek' }, { timeout: 8000 });
  }, 10000);

  it('Testa se ao clicar no botão all renderiza as receitas iniciais', async () => {
    global.fetch = jest.fn(fetch);
    renderWithRouter(<Recipes />, '/meals');
    const allButton = screen.getByRole('button', { name: 'All' });
    const dessertButton = await screen.findByRole('button', { name: 'Dessert' });
    expect(allButton).toBeInTheDocument();
    userEvent.click(dessertButton);
    userEvent.click(allButton);
    const initialRecipe = await screen.findByRole('heading', { level: 2, name: 'Corba' });
    expect(initialRecipe).toBeInTheDocument();
  });
});

// testes do componente initialDrinksRecipes

describe('Testa os componentes initialDrinksRecipes', () => {
  it('Testa se o título categorias é renderizado', () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouter(<Recipes />, '/drinks');
    expect(history.location.pathname).toBe('/drinks');
    const title = screen.getByRole('heading', { level: 2, name: /categorias/i });
    expect(title).toBeInTheDocument();
  });

  it('Testa se os botões de categoria são', async () => {
    global.fetch = jest.fn(fetch);
    renderWithRouter(<Recipes />, '/drinks');
    const button = await screen.findByTestId('Cocktail-category-filter');

    expect(button).toBeInTheDocument();
  });

  it('Testa se as primeiras receitas são renderizados', async () => {
    global.fetch = jest.fn(fetch);
    renderWithRouter(<Recipes />, '/drinks');
    const firstMeal = await screen.findByTestId(recipeCard);
    expect(firstMeal).toBeInTheDocument();
  });

  it('Testa se ao clicar uma segunda vez no mesmo botão de categoria, retorna as receitas iniciais', async () => {
    global.fetch = jest.fn(fetch);
    renderWithRouter(<Recipes />, '/drinks');
    const ordinaryDrinkButton = await screen.findByRole('button', { name: 'Ordinary Drink' });
    const firstDrink = await screen.findByTestId(recipeCard);
    userEvent.click(ordinaryDrinkButton);
    userEvent.click(ordinaryDrinkButton);
    expect(firstDrink).toBeInTheDocument();
  });

  it('Testa se ao clicar no botão all renderiza as receitas iniciais', async () => {
    global.fetch = jest.fn(fetch);
    renderWithRouter(<Recipes />, '/drinks');
    const allButton = screen.getByRole('button', { name: 'All' });
    const shakeButton = await screen.findByRole('button', { name: 'Shake' });
    expect(allButton).toBeInTheDocument();
    userEvent.click(shakeButton);
    userEvent.click(allButton);
    const initialRecipe = await screen.findByRole('heading', { level: 3, name: 'GG' });
    expect(initialRecipe).toBeInTheDocument();
  });

  it('Testa se ao clicar em categorias diferentes, cards diferentes são renderizados', async () => {
    global.fetch = jest.fn(fetch);
    renderWithRouter(<Recipes />, '/drinks');
    const shakeButton = await screen.findByRole('button', { name: 'Shake' });
    const cocoaButton = await screen.findByRole('button', { name: 'Cocoa' });
    userEvent.click(shakeButton);
    userEvent.click(cocoaButton);
    const cocoaRecipe = await screen.findByTestId(recipeName, { name: 'Castillian Hot Chocolate' });
    expect(cocoaRecipe).toBeInTheDocument();
  });
});
