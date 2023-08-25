import styles from './Home.module.scss';
import AsteroidsContainer from '@/components/AsteroidsContainer';

export default function Home() {
  return (
    <div className={styles.home}>
      <AsteroidsContainer />
    </div>
  );
}
