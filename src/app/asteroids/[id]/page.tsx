'use client';

import { useEffect, useState } from 'react';
import { getAsteroid } from '@/services/asteroids';
import { AsteroidData } from '@/types/interfaces';
import AsteroidInfo from '@/components/AsteroidInfo';

import styles from './AsteroidInfo.module.scss';

interface AsteroidProps {
  params: {
    id: string;
  };
}

export default function Asteroid({ params: { id } }: AsteroidProps) {
  const [data, setData] = useState<AsteroidData | null>(null);
  const [loading, setLoading] = useState(true);
  const [asteroidInfo, setAsteroidInfo] = useState<AsteroidInfo | null>(null);

  const getData = async () => {
    setLoading(true);
    try {
      const asteroidData = await getAsteroid(id);

      if (!asteroidData) {
        throw new Error('Произошла ошибка при попытке получить информацию о астероиде');
      }

      setData(asteroidData);
    } catch (error) {
      throw new Error('Произошла ошибка при попытке получить информацию о астероиде');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      setAsteroidInfo({
        id: data.id,
        approachData: data.close_approach_data,
        diameters: data.estimated_diameter,
        isDanger: data.is_potentially_hazardous_asteroid,
        name: data.designation,
      });
      setLoading(false);
    }
  }, [data]);

  return (
    <div className={styles.asteroid}>
      {loading ? <h3>Загрузка...</h3> : null}
      {asteroidInfo ? <AsteroidInfo asteroid={asteroidInfo} /> : null}
    </div>
  );
}
