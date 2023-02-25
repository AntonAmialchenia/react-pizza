import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PizzaItem from './pages/PizzaItem';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="pizza/:id" element={<PizzaItem />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>  
    </Routes>
  );
}

export default App;
