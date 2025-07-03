import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from '../Pages/Cart';
import MainLayOut from '../Layout/MainLayOut';
import ErrorPage from '../Pages/Error/ErrorPage';
import Shop from '../Pages/Shop';
import ProductDetails from '../Pages/ProductDetails';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayOut />}>
          <Route index element={<Shop />} />
          <Route path="product-details/:slug" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
