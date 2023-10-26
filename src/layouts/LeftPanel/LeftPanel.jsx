import styles from './LeftPanel.module.css';

styles;

function LeftPanel({ children }) {
  return <div className={styles.leftPanel}>{children}</div>;
}

export default LeftPanel;
