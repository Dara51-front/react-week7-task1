import { useState, useEffect } from "react";
import styles from "./controlePanel.module.css";
import { useTodoState } from "../../useCRUD.jsx";

export const ControlPanel = ({onSearchClick, onSortClick,
    onNotSearchClick, isSortingEnabled, searchPhrase, onSearchPhraseChange}) => {

  return (
    <form className={styles.controlPanel}>
      <input
        className={styles.searchInput}
        type="text"
        value={searchPhrase}
        onChange={onSearchPhraseChange}
        placeholder="Введите что-то для поиска"
      />
        <button
          type="button"
          className={styles.searchButton}
          onClick={onSearchClick}
          disabled={!searchPhrase}
        >
          🔍
        </button>
        <button
          type="button"
          className={styles.searchButton}
          onClick={onNotSearchClick}
          disabled={!searchPhrase}
        >
          ✕
        </button> 
          
        <label className={styles.sortingLabel}>
        <input
          className={styles.sortingCheckBox}
          type="checkbox"
          checked={isSortingEnabled}
          onChange={onSortClick}
        />
        <span className={styles.currentSortingCheckBox} type="checkbox"></span>
      </label>
    </form>
  );
};
