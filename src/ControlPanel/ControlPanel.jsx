import { useState, useEffect } from "react";
import styles from "./controlePanel.module.css";
import { useTodoState } from "../useCRUD.jsx";

export const ControlPanel = () => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const {
    todoList,
    isSearchActive,
    setFoundedTodoList,
    setIsFoundTodo,
    setIsSearchActive,
    isSortingEnabled,
    setIsSortingEnabled,
  } = useTodoState();

  const onSearchPhraseChange = ({ target }) => {
    setSearchPhrase(target.value);
  };

  const onSortingChange = ({ target }) => {
    setIsSortingEnabled(target.checked);
  };

  useEffect(() => {
    if (!searchPhrase.trim() || searchPhrase === "") {
      setIsSearchActive(false);

      setIsFoundTodo(todoList.length > 0);
      return;
    }
    setIsSearchActive(true);
    const results = todoList.filter((todo) => {
      return todo.title.toLowerCase().includes(searchPhrase.toLowerCase());
    });
    setFoundedTodoList(results);
    setIsFoundTodo(results.length > 0);
  }, [searchPhrase, todoList]);

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
