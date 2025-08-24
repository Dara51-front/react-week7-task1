import { useState } from "react";
import styles from "../App.module.css";

export const Todo = ({ id, completed, title, onDelete }) => {
  const [editNow, setEditNow] = useState(false);
  const [changedTodo, setChangedTodo] = useState(title);
  const [isCompleted, setIsCompleted] = useState(completed);

  const onChangeContent = (event) => {
    event.preventDefault();
    setChangedTodo(event.target.value);
  };

  const onChangeTodoClick = () => {
    setEditNow(true);
  };

  const onCheckTodoChange = ({ target }) => {
    setIsCompleted(target.checked);
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        userId: 1,
        title: title,
        completed: target.checked,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log(`Задача ${id} выполнена:`, response);
      });
  };

  const onSaveNewContentClick = () => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        userId: 1,
        title: changedTodo,
        completed: completed,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log(`Задача ${id} обновлена:`, response);
      })
      .finally(() => {
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
