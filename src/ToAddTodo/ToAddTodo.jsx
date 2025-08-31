import { useState, useEffect } from "react";
import styles from "./ToAddTodo.module.css";

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
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        userId: 1,
        title: newTodoText,
        completed: false,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Новая задача добавлена:", response);
        todoList.push(response);
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
