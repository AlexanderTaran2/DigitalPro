import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard for DigitalPro', () => {
  const mockAddToCart = jest.fn();
  const product = {
    name: 'React-курс для начинающих',
    article: 'DIG-789012',
    price: 2990,
    category: 'курс',
  };

  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  test('отображает название, артикул, цену и категорию', () => {
    render(<ProductCard {...product} onAddToCart={mockAddToCart} />);

    expect(screen.getByText('React-курс для начинающих')).toBeInTheDocument();
    expect(screen.getByText('Артикул: DIG-789012')).toBeInTheDocument();
    expect(screen.getByText('Цена: 2990 ₽')).toBeInTheDocument();
    expect(screen.getByText('Категория: курс')).toBeInTheDocument();
  });

  test('вызывает onAddToCart при клике на кнопку', () => {
    render(<ProductCard {...product} onAddToCart={mockAddToCart} />);

    const button = screen.getByTestId('add-to-cart-btn');
    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });
});