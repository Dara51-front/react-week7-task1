import { useState, useEffect } from "react";
import styles from "./ToAddTodo.module.css";
import { ref, push } from "firebase/database";
import { db } from "../firebase.js";

export const ToAddTodo = ({ setTodoList, todoList }) => {
  const [newTodoText, setNewTodoText] = useState("");
  const [isFull, setisFull] = useState(true);

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
    const todosDbRef = ref(db, "todos");

    push(todosDbRef, { userId: 1, title: newTodoText, completed: false })
      .then((response) => {
        console.log("Новая задача добавлена:", response);
        Object.entries(todoList).push(response);
        setTodoList([...todoList]);
      })
      .finally(onCleanAddInputBlur);
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
