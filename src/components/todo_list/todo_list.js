import React from 'react';
import './todo_list.css';
import TodoItemDisplay from '../todo_item/todo_item_display';
function ToDoList(props) {
    const todoComponents = props.todos.map(todo => <TodoItemDisplay todo={todo} key={todo.id} author="Wyatt Ogden"/>);

    return (
        <div className = "todo-list">
            {todoComponents}
        </div>
    );
}

export default ToDoList;