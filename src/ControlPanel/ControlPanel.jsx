import { useState, useEffect } from "react";
import styles from "./controlePanel.module.css";

export const ControlPanel = ({
  todoList,
  setIsFoundTodo,
  setFoundedTodoList,
  setIsSearchActive,
  isSortingEnabled,
  setIsSortingEnabled,
}) => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const onSearchPhraseChange = ({ target }) => {
    setSearchPhrase(target.value);
  };

  const onSortingChange = ({ target }) => {
    setIsSortingEnabled(target.checked);
  };

  useEffect(() => {
    if (!searchPhrase.trim()) {
      setFoundedTodoList(todoList);
      setIsFoundTodo(Object.keys(todoList).length > 0);
      setIsSearchActive(false);
      return;
    }

    const results = Object.entries(todoList).filter(([id, todo]) => {
      return todo.title.toLowerCase().includes(searchPhrase.toLowerCase());
    });

    const resultsObject = Object.fromEntries(results);

    setFoundedTodoList(resultsObject);
    setIsFoundTodo(Object.keys(resultsObject).length > 0);
    setIsSearchActive(true);
  }, [
    searchPhrase,
    todoList,
    setIsFoundTodo,
    setFoundedTodoList,
    setIsSearchActive,
  ]);

  return (
    <div className={styles.controlPanel}>
      <input
        className={styles.searchInput}
        type="text"
        value={searchPhrase}
        onChange={onSearchPhraseChange}
        placeholder="Введите что-то для поиска"
      />
      <label className={styles.sortingLabel}>
        <input
          className={styles.sortingCheckBox}
          type="checkbox"
          checked={isSortingEnabled}
          onChange={onSortingChange}
        />
        <span className={styles.currentSortingCheckBox} type="checkbox"></span>
      </label>
    </div>
  );
};
