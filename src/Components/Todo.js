import React, { useState, useEffect } from "react";
import "./style.css";
export default function Todo() {
    //get the localStorage data
    const getLocalData = () => {
        const lists = localStorage.getItem("myTodoList");
        if (lists) {
            return JSON.parse(lists);
        } else {
            return [];
        }
    };

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // add the items function
    const addItem = () => {
        if (!inputData) {
            alert("Please fill in the todo item");
        } else if (inputData && toggleButton) {
            setItems(
                items.map((item) => {
                    if (item.id === isEditItem) {
                        return { ...item, name: inputData };
                    } else {
                        return item;
                    }
                })
            );
            setInputData("");
            setIsEditItem("");
            setToggleButton(false);
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            };
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };

    //edit the todo item
    const editItem = (index) => {
        let itemToEdit = items.find((item) => item.id === index);
        setInputData(itemToEdit.name);
        setIsEditItem(index);
        setToggleButton(true);
    };

    //delete the todo item
    const deleteItem = (index) => {
        const updatedItems = items.filter((item) => {
            return item.id !== index;
        });
        setItems(updatedItems);
    };

    //remove all todo items
    const removeAll = () => {
        setItems([]);
    };

    //adding local storage
    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here ✌️</figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            type="text"
                            placeholder="✍️ Add Item"
                            className="form-control"
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}
                    </div>
                    {/* show our items */}
                    <div className="showItems">
                        {items.map((item) => {
                            return (
                                <div className="eachItem" key={item.id}>
                                    <h3>{item.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" onClick={() => editItem(item.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(item.id)}></i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="showItems">
                        {/* this is the remove all button */}
                        <button className="btn effect04" data-sm-link-text="Remove All Items" onClick={removeAll}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
