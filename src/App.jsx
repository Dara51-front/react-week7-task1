import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Todo } from "./components/Todos/Todos.jsx";
import { ToAddTodo } from "./components/ToAddTodo/ToAddTodo.jsx";
import { ControlPanel } from "./components/ControlPanel/ControlPanel.jsx";
import { useTodoState } from "./useCRUD.jsx";

export default function App() {
  const {
    getTodoList,
    onCheckTodoChange,
    onChangeTodoClick,
    toAddTodo,
    onSearchClick,
    onSortClick,
    onNotSearchClick,
    isSortingEnabled,
    isFoundTodo,
    searchPhrase,
    setSearchPhrase,
    toDeleteTodo,
    onSearchPhraseChange,
  } = useTodoState();

  const sortedTodoList = getTodoList();

  return (
    <>
      <ControlPanel 
      onSearchClick={onSearchClick}
      onSortClick={onSortClick}
      onNotSearchClick={onNotSearchClick}
      isSortingEnabled={isSortingEnabled}
      searchPhrase={searchPhrase}
      onSearchPhraseChange={onSearchPhraseChange}/>
      <ToAddTodo toAddTodo={toAddTodo} />
      {isFoundTodo ? (
        <div className={styles.listTodos}>
          {getTodoList().map(({ id, completed, title }) => (
            <Todo
              key={id}
              id={id}
              completed={completed}
              title={title}
              toDeleteTodo={toDeleteTodo}
              onCheckTodoChange={onCheckTodoChange}
            />
          ))}
        </div>
      ) : (
        <div className={styles.notFoundDiv}>{"Ничего не найдено:("}</div>
      )}
    </>
  );
}
