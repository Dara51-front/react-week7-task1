import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Todo } from "./Todos/Todos.jsx";
import { ToAddTodo } from "./ToAddTodo/ToAddTodo.jsx";
import { ControlPanel } from "./ControlPanel/ControlPanel.jsx";
import { useTodoState } from "./useCRUD.jsx";

export default function App() {
  const { isFoundTodo, getTodoList, toDeleteTodo } = useTodoState();

  return (
    <>
      <ControlPanel />
      <ToAddTodo />
      {isFoundTodo ? (
        <div className={styles.listTodos}>
          {getTodoList().map(({ id, completed, title }) => (
            <Todo
              key={id}
              id={id}
              completed={completed}
              title={title}
              onDelete={() => toDeleteTodo(id)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.notFoundDiv}>{"Ничего не найдено:("}</div>
      )}
    </>
  );
}
