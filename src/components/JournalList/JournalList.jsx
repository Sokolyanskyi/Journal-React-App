import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';
import styles from './JournalList.module.css';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context.jsx';

function JournalList({ items, setItem }) {
  const { userId } = useContext(UserContext);
  const sortItems = (a, b) => {
    if (a.date > b.date) {
      return 1;
    } else {
      return -1;
    }
  };
  const filteredSortedItems = useMemo(
    () => items.filter((el) => el.userId === userId).sort(sortItems),
    [items, userId]
  );
  if (items.length === 0) {
    return <p>Write new note here</p>;
  }

  return (
    <div className={styles.journalList}>
      {filteredSortedItems.map((el) => (
        <CardButton key={el.id} onClick={() => setItem(el)}>
          <JournalItem title={el.title} post={el.post} date={el.date} />
        </CardButton>
      ))}
    </div>
  );
}

export default JournalList;
