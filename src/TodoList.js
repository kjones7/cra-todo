import React, { useState } from 'react';

function TodoList() {
  const [items, setItems] = useState([]);

  function handleFormSubmit(event) {
    event.preventDefault();
    const newItem = event.target.elements.iteminput.value.trim();
    if (newItem !== '') {
      setItems([...items, newItem]);
      event.target.reset();
    }
  }

  function handleItemDelete(index) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }

  return (
      <div>
        <h1>Todo List</h1>
        <form onSubmit={handleFormSubmit}>
          <input type="text" name="iteminput" />
          <button type="submit">Add</button>
        </form>
        <ul>
          {items.map((item, index) => (
              <li key={index}>{item} <button type="button" onClick={() => handleItemDelete(index)}>Delete</button></li>
          ))}
        </ul>
      </div>
  );
}

export default TodoList;