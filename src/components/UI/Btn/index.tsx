import styles from './Btn.module.scss';

interface BtnProps {
  title: string;
  click: () => void;
  disabled?: boolean;
}

const Btn = ({ click, title, disabled = false }: BtnProps) => {
  return (
    <button className={styles.btn} onClick={click} disabled={disabled}>
      {title}
    </button>
  );
};

export default Btn;
