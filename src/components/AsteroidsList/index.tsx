'use client';

import { useState, useEffect } from 'react';
import AsteroidsTabs from '../AsteroidsTabs';
import styles from './AsteroidsList.module.scss';
import { getAllAsteroids } from '@/services/asteroids';
import { AsteroidsData, Asteroid } from '@/types/interfaces';
import AsteroidsItem from '../AsteroidsItem';
import { getDaysInMonth } from '@/utils/constants';

export type Tab = {
  title: string;
  value: 'km' | 'lo';
};

const tabs: Tab[] = [
  { title: 'в километрах', value: 'km' },
  { title: 'в лунных орбитах', value: 'lo' },
];

const startDateInit = () => {
  const date = new Date();
  const day = date.getDay() >= 10 ? date.getDay().toString : `0${date.getDay()}`;
  const month = date.getMonth() >= 10 ? date.getMonth.toString() : `0${date.getMonth()}`;
  const year = date.getFullYear().toString();

  return [year, month, day].join('-');
};

const endDateInit = (date: string): string => {
  const dateArr = date.split('-');
  const day = dateArr[2];
  const month = dateArr[1];
  const year = dateArr[0];

  const endDateStep = 7;

  // const isLastMonth = Number(month) === 12;

  // if (isLastMonth )

  const maxDaysInMonth = getDaysInMonth(Number(month));

  if (Number(day) + endDateStep >= maxDaysInMonth) {
    return [year, Number(month) + 1, endDateStep - (maxDaysInMonth - Number(day))].join('-');
  } else {
    return [year, month, Number(day) + endDateStep].join('-');
  }
};

interface AsteroidsListProps {
  addToCart: (asteroid: Asteroid) => void;
  deleteFromCart: (asteroid: Asteroid) => void;
}

const AsteroidsList = ({ addToCart, deleteFromCart }: AsteroidsListProps) => {
  const [pathType, setPathType] = useState<Tab['value']>('km');
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AsteroidsData | null>(null);
  const [asteroids, setAsteroids] = useState<Asteroid[] | null>(null);

  const getData = async () => {
    try {
      const startDate = startDateInit();
      const endDate = endDateInit(startDate);
      const asteroidsData = await getAllAsteroids({ startDate, endDate });

      if (!asteroidsData) {
        setError('Произошла ошибка при загрузке данных');
        return;
      }

      setData(asteroidsData);
    } catch (error) {
      setError('Произошла ошибка при загрузке данных');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (asteroids) {
      setLoading(false);
    }
  }, [asteroids]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  return (
    <div className={styles.asteroids}>
      {loading ? (
        <h3>Загружаем данные...</h3>
      ) : !error && asteroids ? (
        <>
          <AsteroidsTabs tabs={tabs} onSelect={setPathType} currentTab={pathType} />
          {asteroids.map((asteroid) => (
            <AsteroidsItem
              asteroid={asteroid}
              key={asteroid.id}
              measurementUnit={pathType}
              addToCart={addToCart}
              deleteFromCart={deleteFromCart}
            />
          ))}
        </>
      ) : error && !asteroids ? (
        <h3>Произошла ошибка</h3>
      ) : null}
    </div>
  );
};

export default AsteroidsList;
