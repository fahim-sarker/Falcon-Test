import React from 'react';
import Router from './Router/Router';
import { CartProvider } from './Context/CartContext';

export default function App() {
  return (
    <>
      <CartProvider>
        <Router />
      </CartProvider>
    </>
  );
}
