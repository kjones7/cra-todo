import React, { useState, useRef, useEffect } from 'react';

function TodoList() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const editInputRef = useRef(null);

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

  function handleItemEdit(index) {
    setEditValue(items[index]);
    setEditIndex(index);
  }

  function handleItemSave(index) {
    const itemsCopy = [...items];
    itemsCopy[index] = editValue;
    setItems(itemsCopy);
    setEditIndex(null);
    setEditValue('');
  }

  function handleEditInputChange(event) {
    setEditValue(event.target.value);
  }

  // Focus the edit input when the item being edited changes
  useEffect(() => {
    const editInput = editInputRef.current;
    if (editInput) {
      editInput.focus();
      editInput.select();
    }
  }, [editIndex]);

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="iteminput" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input type="text" value={editValue} onChange={handleEditInputChange} ref={editInputRef} />
                <button type="button" onClick={() => handleItemSave(index)}>Save</button>
              </>

            ) : (
              <>
                {item}
                <button type="button" onClick={() => handleItemDelete(index)}>Delete</button>
                <button type="button" onClick={() => handleItemEdit(index)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;