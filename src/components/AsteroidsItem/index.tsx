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
}

type NormalDate = [number, string, number];

const AsteroidsItem = ({ asteroid, measurementUnit }: AsteroidsItemProps) => {
  const formatDate = (): NormalDate => {
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

  const normalDate = formatDate();
  const asteroidSize = asteroid.radius >= 10000 ? 'big' : 'small';

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
      <div className={styles.bottom}>
        <Btn title="ЗАКАЗАТЬ" click={() => alert('Заглушка')} />
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
