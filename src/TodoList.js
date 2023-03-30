import React, { useState } from 'react';

function TodoList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  }

  return (
      <div>
        <h1>Todo List</h1>
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <button type="submit">Add</button>
        </form>
        <ul>
          {items.map((item, index) => (
              <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
  );
}

export default TodoList;