import styles from './JournalForm.module.css';
import Button from '../Button/Button.jsx';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state.js';
import Input from '../Input/Input.jsx';
import { UserContext } from '../../context/user.context.jsx';

function JournalForm({ onSubmit, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  console.log(formState);
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();
  const { userId } = useContext(UserContext);
  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };
  useEffect(() => {
    if (!data) {
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }
    dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
  }, [data]);
  useEffect(() => {
    let timerId;
    if (!isValid.post || !isValid.date || !isValid.date) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);
  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId]);

  useEffect(() => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { userId: userId }
    });
  }, [userId]);
  const onChange = (e) => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { [e.target.name]: e.target.value }
    });
  };
  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };
  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: 'CLEAR' });
    dispatchForm({ type: 'SET_VALUE', payload: { userId } });
  };
  return (
    <form className={styles.journalForm} onSubmit={addJournalItem}>
      <div className={styles.formRow}>
        <Input
          ref={titleRef}
          value={values.title}
          type="text"
          appearence="title"
          name="title"
          onChange={onChange}
          appearance="title"
          isValid={isValid.title}
        />
        {data?.id && (
          <button
            className={styles.delete}
            type="button"
            onClick={() => deleteJournalItem()}
          >
            <img src="/delete.svg" alt="delete" />
          </button>
        )}
      </div>
      <div className={styles.formRow}>
        <label htmlFor="date" className={styles.formLabel}>
          <img src="/calendar.svg" alt="calendar" />
          <span>Date</span>
        </label>
        <Input
          ref={dateRef}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ''
          }
          onChange={onChange}
          type="date"
          name="date"
          id="date"
          appearance="date"
          isValid={isValid.date}
        />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="tag" className={styles.formLabel}>
          <img src="/fold.svg" alt="calendar" />
          <span>Tag</span>
        </label>
        <Input
          value={values.tag}
          onChange={onChange}
          type="text"
          name="tag"
          id="tag"
          appearance="tag"
        />
      </div>

      <textarea
        ref={postRef}
        value={values.post}
        onChange={onChange}
        name="post"
        id=""
        cols="30"
        rows="10"
        className={cn(styles['inputTitle'], {
          [styles.invalid]: !isValid.post
        })}
      ></textarea>
      <Button> Save</Button>
    </form>
  );
}

export default JournalForm;
