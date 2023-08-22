import { Tab } from '../AsteroidsList';
import styles from './AsteroidsTabs.module.scss';

interface AsteroidsTabsProps {
  tabs: Tab[];
  onSelect: (tab: Tab['value']) => void;
  currentTab: Tab['value'];
}

const AsteroidsTabs = ({ onSelect, tabs, currentTab }: AsteroidsTabsProps) => {
  const onTabClick = (tab: Tab['value']) => {
    onSelect(tab);
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          className={currentTab === tab.value ? styles.active : ''}
          onClick={() => onTabClick(tab.value)}
          key={tab.title}>
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default AsteroidsTabs;
