'use client';

import Image from 'next/image';
import { CartType } from '../AsteroidsContainer';
import styles from './Cart.module.scss';
import { useState } from 'react';
import completeIconPath from './complete.svg';
import Btn from '../UI/Btn';

interface CartProps {
  cart: CartType;
  sendCart: () => void;
}

const Cart = ({ cart, sendCart }: CartProps) => {
  const [isComplete, setIsComplete] = useState(false);

  const onSendClick = () => {
    sendCart();
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
      <div className={styles.top}>
        <div className={styles.title}>Корзина</div>
        <div className={styles.count}>
          {cart && !isComplete
            ? `${cart.length} ${asteroidWordFormat()}`
            : !isComplete
            ? 'Пусто'
            : null}
          {isComplete ? <Image src={completeIconPath} alt="complete" /> : null}
        </div>
      </div>
      <div className={styles.btn}>
        {cart ? (
          <Btn click={onSendClick} title="Отправить" />
        ) : isComplete ? (
          <Btn click={onBackClick} title="Назад" />
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
