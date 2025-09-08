import { useState, useEffect } from "react";
import styles from "./ToAddTodo.module.css";
import { useTodoState } from "../useCRUD";

export const ToAddTodo = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [isFull, setisFull] = useState(true);

  const { toAddTodo } = useTodoState();

  const onAddTodoChange = (event) => {
    event.preventDefault();
    setNewTodoText(event.target.value);
    if (event.target.value) {
      setisFull(false);
    } else if (!event.target.value || event.target.value === "") {
      setisFull(true);
    }
  };

  const onCleanAddInputBlur = () => {
    setNewTodoText("");
    setisFull(true);
  };

  const onTodoAddClick = () => {
    toAddTodo(newTodoText).then(() => {
      onCleanAddInputBlur();
    });
  };

  return (
    <>
      <input
        className={styles.newTodoInput}
        type="text"
        value={newTodoText}
        onChange={onAddTodoChange}
        placeholder="Введите новую задачу"
      />
      <button
        className={styles.addButton}
        disabled={isFull}
        onClick={onTodoAddClick}
      >
        <span className={styles.buttonContent}>✖</span>
      </button>
    </>
  );
};
