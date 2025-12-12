import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AddProductForm from './AddProductForm';
import productsReducer from './productsSlice';

// Мокаем API-модуль
jest.mock('./api', () => ({
  addProduct: jest.fn(),
}));

import { addProduct } from './api';

describe('AddProductForm Integration Test', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
  });

  test('успешное добавление товара через форму', async () => {
    // Мокаем успешный ответ API
    addProduct.mockResolvedValue({
      success: true,
      product: { id: 1, name: 'Новый курс', article: 'DIG-111111', price: 1000 },
    });

    render(
      <Provider store={store}>
        <AddProductForm />
      </Provider>
    );

    // Заполняем форму
    fireEvent.change(screen.getByLabelText(/название/i), {
      target: { value: 'Новый курс' },
    });
    fireEvent.change(screen.getByLabelText(/артикул/i), {
      target: { value: 'DIG-111111' },
    });
    fireEvent.change(screen.getByLabelText(/цена/i), {
      target: { value: '1000' },
    });

    // Отправляем форму
    fireEvent.click(screen.getByText(/добавить товар/i));

    // Проверяем, что API вызвано с правильными данными
    await waitFor(() => {
      expect(addProduct).toHaveBeenCalledWith({
        name: 'Новый курс',
        article: 'DIG-111111',
        price: 1000,
      });
    });

    // Проверяем, что форма очистилась
    expect(screen.getByLabelText(/название/i).value).toBe('');
  });

  test('ошибка при добавлении товара', async () => {
    addProduct.mockRejectedValue(new Error('Ошибка сети'));

    render(
      <Provider store={store}>
        <AddProductForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/название/i), {
      target: { value: 'Товар' },
    });
    fireEvent.click(screen.getByText(/добавить товар/i));

    await waitFor(() => {
      expect(screen.getByText(/ошибка/i)).toBeInTheDocument();
    });
  });
});