import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from '../component/Header';
import HeaderDois from '../component/HeaderDois';
//
describe('Requisito 8 e 9', () => {
  test('teste link requisito 7 header linha 7', () => {
    render(<Header />);
    expect(getByTestId('profile-top-btn').toBeInTheDocument('link'));
  });
  test('teste link requisito 7 header2 linha 6', () => {
    render(<HeaderDois />);
    expect(getByTestId('profile-top-btn')).toHaveAccessibleDescription();
  });
  it('teste requisito 9', () => {
    render(<HeaderDois />);
    expect(getByTestId('search-input')).toHaveAccessibleDescription();
  });
  it('teste requisito 9', async () => {
    render(<HeaderDois />);
    const button = screen.getByRole('button');
    const heading = screen.getByText('Hello World!');
    await fireEvent.click(button);
    expect(button).toBeInTheDocument('input');
    expect(heading).toBeInTheDocument();
  });
});
