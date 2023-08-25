import Image from 'next/image';
import { AsteroidInfo } from '@/types/interfaces/asteroidInfo';
import styles from './AsteroidInfo.module.scss';
import dangerIconPath from '@/components/AsteroidsItem/danger.svg';
import moment from 'moment';

interface AsteroidInfoProps {
  asteroid: AsteroidInfo;
}

const AsteroidInfo = ({
  asteroid: { approachData, diameters, isDanger, name },
}: AsteroidInfoProps) => {
  return (
    <div className={styles.asteroid}>
      <h3 className={styles.title}>Имя астероида: {name}</h3>
      <div className={styles.diameters}>
        <div>Диаметры:</div>
        <ul>
          <li>{diameters.feet.estimated_diameter_min}</li>
          <li>{diameters.kilometers.estimated_diameter_min}</li>
          <li>{diameters.meters.estimated_diameter_min}</li>
          <li>{diameters.miles.estimated_diameter_min}</li>
        </ul>
      </div>
      {isDanger ? (
        <div className={styles.danger}>
          <Image src={dangerIconPath} alt="danger-icon" />
          <span>Опасен</span>
        </div>
      ) : null}
      <div className={styles.approach}>
        <div>Даты сближений: </div>
        <div className={styles.wrapper}>
          {approachData.map((approachItem) => (
            <div className={styles['approach-item']}>
              <div>
                Дата сближения:{' '}
                <b>{moment(approachItem.close_approach_date).format('DD.MM.YYYY')}</b>
              </div>
              <div>
                Скорость относительно земли(км/ч):{' '}
                <b>{approachItem.relative_velocity.kilometers_per_hour}</b>
              </div>
              <div>
                Время максимального сближения с Землей:{' '}
                <b>{approachItem.epoch_date_close_approach}</b>
              </div>
              <div>
                <div>Расстояние до земли:</div>
                <ul>
                  <li>
                    В км: <b>{approachItem.miss_distance.kilometers}</b>
                  </li>
                  <li>
                    В ло: <b>{approachItem.miss_distance.lunar}</b>
                  </li>
                  <li>
                    В астрономической СИ: <b>{approachItem.miss_distance.astronomical}</b>
                  </li>
                  <li>
                    В милях: <b>{approachItem.miss_distance.miles}</b>
                  </li>
                </ul>
              </div>
              <div>
                Летит вокруг: <b>{approachItem.orbiting_body}</b>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AsteroidInfo;
