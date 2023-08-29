import Image from 'next/image';
import EarthPath from './earth.png';

import styles from './Earth.module.scss';

const EarthImage = () => {
  return <img src={EarthPath.src} alt="earth" className={styles.earth} />;
};

export default EarthImage;
