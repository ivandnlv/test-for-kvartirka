'use client';

import { useState, useEffect } from 'react';
import AsteroidsTabs from '../AsteroidsTabs';
import styles from './AsteroidsList.module.scss';
import { getAllAsteroids } from '@/services/asteroids';
import { AsteroidsData, Asteroid } from '@/types/interfaces';
import AsteroidsItem from '../AsteroidsItem';

export type Tab = {
  title: string;
  value: 'km' | 'lo';
};

const tabs: Tab[] = [
  { title: 'в километрах', value: 'km' },
  { title: 'в лунных орбитах', value: 'lo' },
];

const AsteroidsList = () => {
  const [pathType, setPathType] = useState<Tab['value']>('km');
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AsteroidsData | null>(null);
  const [asteroids, setAsteroids] = useState<Asteroid[] | null>(null);

  const getData = async () => {
    try {
      const asteroidsData = await getAllAsteroids();

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
      console.log(data);
      setAsteroids(
        data.near_earth_objects
          .map((item) => {
            let endDate = '';
            let kmDistance = '';
            let loDistance = '';

            const currentYear = new Date().getFullYear();
            item.close_approach_data.forEach((approach) => {
              const approachYear = new Date(approach.close_approach_date).getFullYear();

              if (approachYear >= currentYear && approachYear - currentYear <= 10) {
                endDate = approach.close_approach_date;
                kmDistance = approach.miss_distance.kilometers;
                loDistance = approach.miss_distance.lunar;
              }
            });

            return {
              endDate,
              kmDistance,
              loDistance,
              radius: item.estimated_diameter.meters.estimated_diameter_min,
              isDanger: item.is_potentially_hazardous_asteroid,
            };
          })
          .filter(
            (asteroid) =>
              asteroid.endDate && asteroid.kmDistance && asteroid.loDistance && asteroid.radius,
          )
          .sort((a, b) => new Date(a.endDate).getFullYear() - new Date(b.endDate).getFullYear()),
      );
    }
  }, [data]);

  useEffect(() => {
    if (asteroids) {
      setLoading(false);
    }
  }, [asteroids]);

  return (
    <div className={styles.asteroids}>
      {loading ? (
        <h3>Загружаем данные...</h3>
      ) : !error && asteroids ? (
        <>
          <AsteroidsTabs tabs={tabs} onSelect={setPathType} currentTab={pathType} />
          {asteroids.map((asteroid, i) => (
            <AsteroidsItem asteroid={asteroid} key={i} measurementUnit={pathType} />
          ))}
        </>
      ) : (
        <h3>Произошла ошибка</h3>
      )}
    </div>
  );
};

export default AsteroidsList;
