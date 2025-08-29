import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Todo } from "./Todos/Todos.jsx";
import { ToAddTodo } from "./ToAddTodo/ToAddTodo.jsx";
import { ControlPanel } from "./ControlPanel/ControlPanel.jsx";
import { ref, onValue, remove } from "firebase/database";
import { db } from "./firebase.js";

export default function App() {
  const [todoList, setTodoList] = useState({});
  const [isFoundTodo, setIsFoundTodo] = useState(true);
  const [foundedTodoList, setFoundedTodoList] = useState({});
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSortingEnabled, setIsSortingEnabled] = useState(false);

  useEffect(() => {
    const todosDbRef = ref(db, "todos");

    return onValue(todosDbRef, (snapshot) => {
      const loadedTodos = snapshot.val() || {};
      setTodoList(loadedTodos);
      setIsFoundTodo(Object.keys(loadedTodos).length > 0);
    });
  }, [setTodoList]);

  const getTodosToRender = () => {
    if (isSearchActive) {
      return Object.entries(foundedTodoList);
    } else if (isSortingEnabled) {
      return Object.entries(todoList)
        .map(([id, todo]) => ({ id, ...todo }))
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((todo) => [
          todo.id,
          { completed: todo.completed, title: todo.title },
        ]);
    } else {
      return Object.entries(todoList);
    }
  };

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
          {getTodosToRender().map(([id, { completed, title }]) => (
            <Todo
              key={id}
              id={id}
              completed={completed}
              title={title}
              todoList={todoList}
              onDelete={() => {
                const todoDbDeleteRef = ref(db, `todos/${id}`);

                remove(todoDbDeleteRef)
                  .then((response) => {
                    console.log("Задача удалена!");
                  })
                  .finally(() => {
                    const todosDbRef = ref(db, "todos");

                    onValue(todosDbRef, (snapshot) => {
                      const loadedTodos = snapshot.val() || {};
                      setTodoList(loadedTodos);
                      setFoundedTodoList(loadedTodos);
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
