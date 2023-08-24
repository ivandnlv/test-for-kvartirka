'use client';

import Image from 'next/image';
import { CartType } from '../AsteroidsContainer';
import styles from './Cart.module.scss';
import { useState } from 'react';
import completeIconPath from './complete.svg';
import Btn from '../UI/Btn';

interface CartProps {
  cart: CartType;
  deleteCart: () => void;
}

const Cart = ({ cart, deleteCart }: CartProps) => {
  const [isComplete, setIsComplete] = useState(false);

  const onSendClick = () => {
    deleteCart();
    setIsComplete(true);
  };

  const onBackClick = () => {
    setIsComplete(false);
  };

  function asteroidWordFormat(): string {
    const cartLengthStrArr = cart?.length.toString().split('') ?? [];
    if (cartLengthStrArr[cartLengthStrArr.length - 1] === '1') {
      return 'астероид';
    } else if (cartLengthStrArr[cartLengthStrArr.length - 1] <= '4') {
      return 'астероида';
    } else {
      return 'астероидов';
    }
  }

  return (
    <div className={styles.cart}>
      <div className={styles.title}>Корзина</div>
      {isComplete ? (
        <>
          <div className={styles.count}>
            <Image src={completeIconPath} alt="complete" />
          </div>
          <div className={styles.btn}>
            <Btn click={onBackClick} title="Назад" />
          </div>
        </>
      ) : (
        <>
          <div className={styles.count}>
            {cart ? `${cart.length} ${asteroidWordFormat()}` : 'Пусто'}
          </div>
          <div className={styles.btn}>
            {cart ? <Btn click={onSendClick} title="Отправить" /> : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
