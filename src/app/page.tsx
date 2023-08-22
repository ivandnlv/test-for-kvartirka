import AsteroidsList from '@/components/AsteroidsList';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>Ближайшие подлёты астероидов</h1>
      <AsteroidsList />
    </div>
  );
}
