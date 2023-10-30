import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './listSlice';

const List = () => {
    const list = useSelector((state) => state.list.list); // Access the 'list' property from the state
    const dispatch = useDispatch();

    const handleAddItemClick = () => {
        const userInput = prompt('Enter an item:'); // Prompt the user for input
        if (userInput) {
            dispatch(addItem(userInput)); // Dispatch the 'addItem' action with the user input
        }
    };

    return (
        <div>
            <h1>List</h1>
            <ul>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button onClick={handleAddItemClick}>Add Item</button>
        </div>
    );
};

export default List;
