import styles from './Btn.module.scss';

interface BtnProps {
  title: string;
  click: () => void;
}

const Btn = ({ click, title }: BtnProps) => {
  return (
    <button className={styles.btn} onClick={click}>
      {title}
    </button>
  );
};

export default Btn;
