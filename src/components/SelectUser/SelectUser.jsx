import { useContext } from 'react';
import { UserContext } from '../../context/user.context.jsx';
import styles from './SelectUser.module.css';

function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);
  const changeUser = (e) => {
    setUserId(e.target.value);
  };
  return (
    <>
      <select
        name="user"
        value={userId}
        id="user"
        onChange={changeUser}
        className={styles.select}
      >
        <option value="1">Joe</option>
        <option value="2">Yarik</option>
      </select>
    </>
  );
}

export default SelectUser;
