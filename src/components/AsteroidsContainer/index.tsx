'use client';

import { useEffect, useState } from 'react';
import AsteroidsList from '../AsteroidsList';
import { Asteroid } from '@/types/interfaces';

interface Cart {
  items: Asteroid[] | null;
}

const AsteroidsContainer = () => {
  const [cart, setCart] = useState<Cart>({
    items: null,
  });

  const addToCart = (asteroid: Asteroid) => {
    setCart((prev) => ({ ...prev, items: prev.items ? [...prev.items, asteroid] : [asteroid] }));
  };

  const deleteFromCart = (asteroid: Asteroid) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items ? prev.items.filter((item) => item.id !== asteroid.id) : null,
    }));
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <>
      <AsteroidsList addToCart={addToCart} deleteFromCart={deleteFromCart} />
    </>
  );
};

export default AsteroidsContainer;
