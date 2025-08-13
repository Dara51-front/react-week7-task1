import { useEffect, useState } from "react";
import styles from "./App.module.css";

export default function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((response) => response.json())
      .then((todos) => {
        setTodoList(todos.todos);
      });
  }, []);

  return (
    <div className={styles.listTodos}>
      {todoList.map((todo) => (
        <div className={styles.message} key={todo.id}>
          {todo.todo}
        </div>
      ))}
    </div>
  );
}
