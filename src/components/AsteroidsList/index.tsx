'use client';

import { useState, useEffect } from 'react';
import AsteroidsTabs from '../AsteroidsTabs';
import styles from './AsteroidsList.module.scss';
import { getAllAsteroids } from '@/services/asteroids';

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

  useEffect(() => {
    getAllAsteroids();
  }, []);

  return (
    <div className={styles.asteroids}>
      <AsteroidsTabs tabs={tabs} onSelect={setPathType} currentTab={pathType} />
    </div>
  );
};

export default AsteroidsList;
