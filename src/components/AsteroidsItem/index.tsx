'use client';

import { useState } from 'react';
import { Asteroid } from '@/types/interfaces';
import styles from './AsteroidsItem.module.scss';
import Image from 'next/image';
import asteroidPicturePath from './asteroid.png';
import arrowIconPath from './arrow.svg';
import dangerIconPath from './danger.svg';

import Btn from '../UI/Btn';

interface AsteroidsItemProps {
  asteroid: Asteroid;
  measurementUnit: 'km' | 'lo';
  addToCart: (asteroid: Asteroid) => void;
  deleteFromCart: (asteroid: Asteroid) => void;
}

type NormalDate = [number, string, number];

const formatDate = (asteroid: Asteroid): NormalDate => {
  const endDate = new Date(asteroid.endDate);

  const monthsCodes = [
    'янв',
    'фев',
    'март',
    'апр',
    'май',
    'июнь',
    'июль',
    'авг',
    'сент',
    'окт',
    'нояб',
    'дек',
  ];

  const formattedDate: NormalDate = [
    endDate.getDate(),
    monthsCodes[endDate.getMonth()],
    endDate.getFullYear(),
  ];

  return formattedDate;
};

const AsteroidsItem = ({
  asteroid,
  measurementUnit,
  addToCart,
  deleteFromCart,
}: AsteroidsItemProps) => {
  const normalDate = formatDate(asteroid);
  const asteroidSize = asteroid.radius >= 10000 ? 'big' : 'small';

  const [isInCart, setIsInCart] = useState(false);

  const onBtnClick = () => {
    if (isInCart) {
      deleteFromCart(asteroid);
      setIsInCart(false);
    } else {
      addToCart(asteroid);
      setIsInCart(true);
    }
  };

  return (
    <div className={styles.asteroid}>
      <div className={styles.date}>{`${normalDate.join(' ')}`}</div>
      <div className={styles.info}>
        <div className={styles.destination}>
          {measurementUnit === 'km' ? (
            <span>{Math.floor(Number(asteroid.kmDistance)).toLocaleString()} км</span>
          ) : (
            <span>{Math.floor(Number(asteroid.loDistance)).toLocaleString()} ло</span>
          )}
          <Image src={arrowIconPath} alt="arrow-icon" />
        </div>
        <div className={styles.img}>
          <Image
            className={asteroidSize === 'big' ? styles.big : styles.small}
            src={asteroidPicturePath}
            alt="asteroid-img"
          />
          <div>
            <a href="#">2021 FQ</a>
            <span>Ø {Math.floor(asteroid.radius).toLocaleString()} м</span>
          </div>
        </div>
      </div>
      <div className={isInCart ? styles.bottom + ' ' + styles.inCart : styles.bottom}>
        <Btn title={isInCart ? 'В корзине' : 'Заказать'} click={onBtnClick} />
        {asteroid.isDanger ? (
          <span>
            <Image src={dangerIconPath} alt="⚠" />
            Опасен
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default AsteroidsItem;
