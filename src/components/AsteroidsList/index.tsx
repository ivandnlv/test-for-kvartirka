'use client';

import { useState, useEffect, useCallback } from 'react';
import AsteroidsTabs from '../AsteroidsTabs';
import styles from './AsteroidsList.module.scss';
import { getAllAsteroids } from '@/services/asteroids';
import { AsteroidsData, Asteroid, NearEarth } from '@/types/interfaces';
import AsteroidsItem from '../AsteroidsItem';
import { useInView } from 'react-intersection-observer';
import moment from 'moment';
import { CartType } from '../AsteroidsContainer';

export type Tab = {
  title: string;
  value: 'km' | 'lo';
};

const tabs: Tab[] = [
  { title: 'в километрах', value: 'km' },
  { title: 'в лунных орбитах', value: 'lo' },
];

interface AsteroidsListProps {
  addToCart: (asteroid: Asteroid) => void;
  deleteFromCart: (asteroid: Asteroid) => void;
  cart: CartType;
  isCartSended: boolean;
}

type Status = 'firstLoading' | 'success' | 'error' | 'loading';

const AsteroidsList = ({ addToCart, deleteFromCart, cart, isCartSended }: AsteroidsListProps) => {
  const [pathType, setPathType] = useState<Tab['value']>('km');
  const [status, setStatus] = useState<Status>('loading');
  const [data, setData] = useState<AsteroidsData | null>(null);
  const [asteroids, setAsteroids] = useState<Asteroid[] | null>(null);

  const dateStep = 7;

  const initialStartDate = moment().format('YYYY-MM-DD');

  const [firstStartDate, setFirstStartDate] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>(initialStartDate);
  const [endDate, setEndDate] = useState<string>(
    moment(startDate).add(dateStep, 'days').format('YYYY-MM-DD'),
  );

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const getData = useCallback(async () => {
    try {
      let requestStartDate = startDate;
      let requestEndDate = endDate;

      if (!firstStartDate) {
        setStatus('firstLoading');
        setFirstStartDate(startDate);
      } else {
        setStatus('loading');
        const newEndDate = moment(endDate).add(dateStep, 'days').format('YYYY-MM-DD');

        setStartDate(endDate);
        setEndDate(newEndDate);

        requestStartDate = endDate;
        requestEndDate = newEndDate;
      }

      const asteroidsData = await getAllAsteroids({
        startDate: requestStartDate,
        endDate: requestEndDate,
      });

      if (!asteroidsData) {
        setStatus('error');
        return;
      }

      setData(asteroidsData);
    } catch (error) {
      setStatus('error');
      throw new Error('Произошла ошибка');
    }
  }, [startDate, endDate, firstStartDate, setStatus, setData, asteroids]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (inView) {
      getData();
    }
  }, [inView]);

  useEffect(() => {
    if (data) {
      for (let key in data.near_earth_objects) {
        const {
          id,
          name,
          links,
          close_approach_data,
          estimated_diameter,
          is_potentially_hazardous_asteroid,
        } = data.near_earth_objects[key as keyof NearEarth][0];
        const {
          close_approach_date,
          miss_distance: { kilometers, lunar },
        } = close_approach_data[0];

        const asteroid: Asteroid = {
          name,
          link: links.self,
          id,
          endDate: close_approach_date,
          isDanger: is_potentially_hazardous_asteroid,
          kmDistance: kilometers,
          loDistance: lunar,
          radius: estimated_diameter.meters.estimated_diameter_min,
        };

        let isInAsteroids = false;

        if (asteroids) {
          asteroids.forEach((astr) => {
            if (astr.id === asteroid.id) {
              isInAsteroids = true;
            }
          });
        }

        if (!isInAsteroids) setAsteroids((prev) => (prev ? [...prev, asteroid] : [asteroid]));
      }

      setStatus('success');
    }
  }, [data]);

  return (
    <>
      <h1>{isCartSended ? 'Заказ отправлен!' : 'Ближайшие подлёты астероидов'}</h1>
      <div className={styles.asteroids} id="asteroids">
        {status === 'firstLoading' ? <h3>Загружаем данные...</h3> : null}{' '}
        {isCartSended && cart
          ? cart.map((cartAsteroid) => (
              <AsteroidsItem
                asteroid={cartAsteroid}
                key={cartAsteroid.id}
                measurementUnit={pathType}
                addToCart={addToCart}
                deleteFromCart={deleteFromCart}
                isFromCart
                cart={cart}
              />
            ))
          : null}
        {asteroids && !isCartSended ? (
          <>
            <AsteroidsTabs tabs={tabs} onSelect={setPathType} currentTab={pathType} />
            {asteroids.map((asteroid) => (
              <AsteroidsItem
                asteroid={asteroid}
                key={asteroid.id}
                measurementUnit={pathType}
                addToCart={addToCart}
                deleteFromCart={deleteFromCart}
                cart={cart}
              />
            ))}
            <div ref={ref} className={styles.empty}></div>
          </>
        ) : null}
        {status === 'loading' ? <h3>Подгружаем данные...</h3> : null}
        {status === 'error' ? <h3>Произошла ошибка</h3> : null}
      </div>
    </>
  );
};

export default AsteroidsList;
