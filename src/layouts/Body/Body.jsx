import styles from './Body.module.css';

styles;

function Body({ children }) {
  return <div className={styles.body}>{children}</div>;
}

export default Body;
