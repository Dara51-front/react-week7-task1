import { useEffect, useState } from "react";
import styles from "./App.module.css";

export default function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((response) => response.json())
      .then((todos) => {
        console.log(todos);
        setTodoList(todos);
      });
  }, []);

  return (
    <div className={styles.listTodos}>
      {todoList.map((todo) => (
        <label className={styles.message}>
          <input
            className={styles.checkbox}
            type="checkbox"
            name={`checkTodo-${todo.id}`}
            defaultChecked={todo.completed}
          />
          <span
            className={styles.currentcheckbox}
            type="checkbox"
            defaultChecked={todo.completed}
            key={todo.id}
          ></span>
          {todo.title}
        </label>
      ))}
    </div>
  );
}
