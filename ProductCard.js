import React from 'react';

const ProductCard = ({ name, article, price, category, onAddToCart }) => {
  return (
    <div className="product-card" data-testid="product-card">
      <h3>{name}</h3>
      <p>Артикул: {article}</p>
      <p>Цена: {price} ₽</p>
      <p>Категория: {category}</p>
      <button onClick={onAddToCart} data-testid="add-to-cart-btn">
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductCard;