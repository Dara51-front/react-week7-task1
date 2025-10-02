import { useEffect, useState } from "react";

export const useTodoState = () => {
  const [todoList, setTodoList] = useState([]);
  const [isFoundTodo, setIsFoundTodo] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [foundedTodoList, setFoundedTodoList] = useState([]);
  const [isSortingEnabled, setIsSortingEnabled] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  const refreshTodos = () => {
    fetch("http://localhost:3000/todos")
      .then((response) => response.json())
      .then((todos) => {
        setTodoList(todos);
        return todos;
      });
  };

  useEffect(() => {
    refreshTodos();
  }, []);

    const onSearchPhraseChange = ({ target }) => {
    setSearchPhrase(target.value);
  };

  // Добавление задач
  const toAddTodo = (title) => {
    return fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        title: title,
        completed: false,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((newTodo) => {
        console.log("Новая задача добавлена:", newTodo);
        setTodoList([...todoList, newTodo]);
      });
  };

  // Удаление задач

  const toDeleteTodo = (id) => {
    return fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodoList(todoList.filter((todo) => todo.id !== id));
    });
  };

  //Обновление задач

  const onCheckTodoChange = (id) => {
    const changedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(changedTodoList);
    const updatedTodo = changedTodoList.find((todo) => todo.id === id);
    fetch("http://localhost:3000/todos/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })

      .catch((error) => {
        setError(error);
      });
  };

  const onSearchClick = () => {
    setIsSearchActive(true);
    console.log(searchPhrase)
    const foundTodo = todoList.filter((todo) =>
      todo.title.includes(searchPhrase)
    );

    setFoundedTodoList(foundTodo);    
    console.log(foundedTodoList)
    setIsFoundTodo(foundTodo.length > 0);
  };

  const onNotSearchClick = () => {
        console.log(isSearchActive, foundedTodoList, isFoundTodo, searchPhrase)

    setIsSearchActive(false);
    setFoundedTodoList(todoList);
    setIsFoundTodo(true);
    setSearchPhrase("");
    console.log(isSearchActive, foundedTodoList, isFoundTodo, searchPhrase)
  };

  const onSortClick = () => {
    setIsSortingEnabled(!isSortingEnabled);
  };

  return {
    todoList,
    isFoundTodo,
    foundedTodoList,
    isSortingEnabled,
    isSearchActive,
    searchPhrase,

    setIsSearchActive,
    setIsFoundTodo,
    setFoundedTodoList,
    setIsSortingEnabled,
    setSearchPhrase,

    refreshTodos,
    toAddTodo,
    toDeleteTodo,
    onSearchClick,
    onSortClick,
    onNotSearchClick,
    onCheckTodoChange,
    onSearchPhraseChange,

    getTodoList: () => {
      const list = isSearchActive ? foundedTodoList : todoList;

      if (isSortingEnabled) {
        return [...list].sort((a, b) => a.title.localeCompare(b.title));
      } else {
        return list;
      }
    },
  };
};
