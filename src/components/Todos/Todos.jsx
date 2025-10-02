import { useState, useEffect } from "react";
import styles from "../../App.module.css";
import { useTodoState } from "../../useCRUD";

export const Todo = ({
  id,
  title,
  completed,
  onCheckTodoChange,
  toDeleteTodo
}) => {
  const [editNow, setEditNow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [todo, setTodo] = useState(null);
  const [titleTodo, setTitleTodo] = useState(title);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/todos/" + id)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((todo) => {
        setTodo(todo);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [id]);

  if (error) {
    return <div className={styles.message}> {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onChangeTodoClick = () => {
    setEditNow((prev) => !prev);
  };


  const onChangeContent = (event) => {
    setTitleTodo(event.target.value);
  };

  const onSaveNewContentClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/todos/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          title: titleTodo,
          completed: completed,
        }),
      });

      const data = await response.json();
      setTitleTodo(data.title);
      setIsLoading(false);
      setEditNow((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.message} key={id}>
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkbox}
          type="checkbox"
          name={`checkTodo-${id}`}
          defaultChecked={completed}
          onChange={() => onCheckTodoChange(id)}
        />
        <span className={styles.currentcheckbox} type="checkbox"></span>
      </label>
      <input
        className={styles.editTask}
        type="text"
        value={titleTodo}
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
        <button
          className={styles.deleteButton}
          onClick={() => toDeleteTodo(id)}
        >
          ✖
        </button>
      </div>
    </div>
  );
};
