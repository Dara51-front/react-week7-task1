import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Todo } from "./Todos/Todos.jsx";
import { ToAddTodo } from "./ToAddTodo/ToAddTodo.jsx";
import { ControlPanel } from "./ControlPanel/ControlPanel.jsx";

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [isFoundTodo, setIsFoundTodo] = useState(true);
  const [foundedTodoList, setFoundedTodoList] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSortingEnabled, setIsSortingEnabled] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((response) => response.json())
      .then((todos) => {
        setTodoList(todos);
        setFoundedTodoList(todos);
      });
  }, [setTodoList]);

  return (
    <>
      <ControlPanel
        todoList={todoList}
        setIsFoundTodo={setIsFoundTodo}
        setFoundedTodoList={setFoundedTodoList}
        setIsSearchActive={setIsSearchActive}
        isSortingEnabled={isSortingEnabled}
        setIsSortingEnabled={setIsSortingEnabled}
      />
      <ToAddTodo setTodoList={setTodoList} todoList={todoList} />
      {isFoundTodo ? (
        <div className={styles.listTodos}>
          {(isSearchActive
            ? foundedTodoList
            : isSortingEnabled
            ? [...todoList].sort((a, b) => a.title.localeCompare(b.title))
            : todoList
          ).map(({ id, completed, title }) => (
            <Todo
              key={id}
              id={id}
              completed={completed}
              title={title}
              todoList={todoList}
              //
              onDelete={() => {
                fetch(`http://localhost:3000/todos/${id}`, {
                  method: "DELETE",
                })
                  .then((rawResponse) => {
                    rawResponse.json();
                  })
                  .then((response) => {
                    console.log("Задача удалена!");
                  })
                  .finally(() => {
                    fetch("http://localhost:3000/todos")
                      .then((response) => response.json())
                      .then((todos) => {
                        setTodoList(todos);
                        setFoundedTodoList(todos);
                      });
                  });
              }}
            />
          ))}
        </div>
      ) : (
        <div className={styles.notFoundDiv}>{"Ничего не найдено:("}</div>
      )}
    </>
  );
}
