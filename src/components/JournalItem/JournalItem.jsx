import styles from './JournalItem.module.css';

function JournalItem({ title, post, date }) {
  const formattedDate = new Intl.DateTimeFormat('ua-UA').format(date);
  return (
    <>
      <h2 className={styles.journalItemHeader}>{title}</h2>
      <h2 className={styles.journalItemBody}>
        <div className={styles.journalItemDate}>{formattedDate}</div>
        <div className={styles.journalItemText}>{post}</div>
      </h2>
    </>
  );
}

export default JournalItem;
