'use client';

import { useState, useEffect } from 'react';
import AsteroidsList from '../AsteroidsList';
import { Asteroid } from '@/types/interfaces';
import Cart from '../Cart';

export type CartType = Asteroid[] | null;

const AsteroidsContainer = () => {
  const [isCartSended, setIsCartSended] = useState(false);
  const [cart, setCart] = useState<CartType>(null);

  const addToCart = (asteroid: Asteroid) => {
    setCart((prev) => (prev ? [...prev, asteroid] : [asteroid]));
  };

  const deleteFromCart = (asteroid: Asteroid) => {
    setCart((prev) => (prev ? prev.filter((item) => item.id !== asteroid.id) : null));
  };

  const sendCart = () => {
    setIsCartSended(true);
  };

  useEffect(() => {
    if (!cart?.length) {
      setCart(null);
    }
  }, [cart]);

  return (
    <>
      <AsteroidsList
        addToCart={addToCart}
        deleteFromCart={deleteFromCart}
        cart={cart}
        isCartSended={isCartSended}
      />
      {!isCartSended ? <Cart cart={cart} sendCart={sendCart} /> : null}
    </>
  );
};

export default AsteroidsContainer;
