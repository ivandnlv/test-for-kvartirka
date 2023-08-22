import Image from 'next/image';
import logoPath from './logo.svg';
import Link from 'next/link';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={logoPath} alt="Armageddon 2023" />
        </Link>
      </div>
      <p className={styles.description}>
        ООО “Команда им. Б. Уиллиса”.
        <br /> Взрываем астероиды с 1998 года.
      </p>
    </header>
  );
};

export default Header;
