import React, { useState } from 'react';
import TodoList from './components/TodoList';
function App() {
  
  const [todos, setTodos] = useState([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const [isFiltered, setFiltered] = useState(false);

  const [beforefilteredTodos, setBeforeFilteredTodos] = useState([]);
  
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const changeFilter = (mode) => {
    
    switch (mode)
    {
      case "completed":
        if (isFiltered === false) setBeforeFilteredTodos(todos);
        if (beforefilteredTodos.length !== 0) setTodos(beforefilteredTodos);
        setTodos((td) => td.filter((todo) => todo.completed === true));
        setFiltered(true);
        break;
      case "uncompleted":
        if (isFiltered === false) setBeforeFilteredTodos(todos);
        if (beforefilteredTodos.length !== 0) setTodos(beforefilteredTodos);
        setTodos((td) => td.filter((todo) => todo.completed === false));
        setFiltered(true);
        break;
      default:
        if (beforefilteredTodos.length === 0) break;
        setTodos(beforefilteredTodos);
        setFiltered(false);
        break;
    }
  }

  const removeTodo = (id) => {
    console.log(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };
  
  return (
    <div id="main">
      <h1>My To-Do List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
        />
        <button type="submit">Add</button>
      </form>
      <button type="button" onClick={() => changeFilter('none')}>Show All</button>
      <button type="button" onClick={() => changeFilter('completed')}>Show Completed</button>
      <button type="button" onClick={() => changeFilter('uncompleted')}>Show Uncompleted</button>
      <TodoList todos={todos} toggleTodo={toggleTodo} removeHandle={removeTodo} />
  </div>
 );
}

export default App;