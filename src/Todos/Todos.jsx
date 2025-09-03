import { useState } from "react";
import styles from "../App.module.css";
import { useTodoState } from "../useCRUD";

export const Todo = ({ id, completed, title, onDelete }) => {
  const [editNow, setEditNow] = useState(false);
  const [changedTodo, setChangedTodo] = useState(title);
  const [isCompleted, setIsCompleted] = useState(completed);

  const { toUpdateTodo } = useTodoState();

  const onChangeContent = (event) => {
    event.preventDefault();
    setChangedTodo(event.target.value);
  };

  const onChangeTodoClick = () => {
    setEditNow(true);
  };

  const onCheckTodoChange = ({ target }) => {
    setIsCompleted(target.checked);
    toUpdateTodo(id, {
      title: title,
      completed: target.checked,
    });
  };

  const onSaveNewContentClick = () => {
    toUpdateTodo(id, {
      title: changedTodo,
      completed: completed,
    }).finally(() => {
      setEditNow(false);
    });
  };

  return (
    <div className={styles.message} key={id}>
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkbox}
          type="checkbox"
          name={`checkTodo-${id}`}
          onChange={onCheckTodoChange}
          checked={isCompleted}
        />
        <span
          className={styles.currentcheckbox}
          type="checkbox"
          onChange={onCheckTodoChange}
          checked={isCompleted}
        ></span>
      </label>
      <input
        className={styles.editTask}
        type="text"
        defaultValue={title}
        onChange={onChangeContent}
        readOnly={!editNow}
      />

      <div className={styles.changeButtons}>
        <button
          className={styles.changeContentButton}
          onClick={() => {
            editNow ? onSaveNewContentClick() : onChangeTodoClick();
          }}
        >
          {editNow ? `✔` : `✎`}
        </button>
        <button className={styles.deleteButton} onClick={onDelete}>
          ✖
        </button>
      </div>
    </div>
  );
};
