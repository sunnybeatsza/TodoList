import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, editItem } from './listSlice';

const List = () => {
    const list = useSelector((state) => state.list.list);
    const dispatch = useDispatch();
    const [userInput, setUserInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleAddItemClick = () => {
        if (userInput) {
            dispatch(addItem(userInput));
            setUserInput('');
        }
    };

    const handleEditItemClick = () => {
        if (userInput && editIndex !== null) {
            dispatch(editItem({ index: editIndex, updatedItem: userInput }));
            setUserInput('');
            setEditIndex(null);
        }
    };

    const handleEdit = (index) => {
        setUserInput(list[index]);
        setEditIndex(index);
    };

    return (
        <div>
            <h1>List</h1>
            <ul>
                {list.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => handleEdit(index)}>Edit</button>
                    </li>
                ))}
            </ul>
            <div>
                <label htmlFor='userInput'>Enter the item name</label>
                <input
                    type='text'
                    id='userInput'
                    value={userInput}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddItemClick}>Add Item</button>
                <button onClick={handleEditItemClick}>Edit Item</button>
            </div>
        </div>
    );
};

export default List;
