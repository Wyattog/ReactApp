import React from 'react';
import './todo_item_display.css';
import PubSub from 'pubsub-js';
import { TODOITEMREMOVE } from '../lib/subscription';
function TodoItemDisplay (props) {
    if (props.todo.complete) {
       return null;
    }

    const {id, name, description} = props.todo;

    return (
        <div className="todo-item-display">
<span className="has-text-light">{id}.  {name} , {description} </span> <br/>
        <button className="removeButton" onClick={() => PubSub.publish(TODOITEMREMOVE, id)}>Remove</button>
        </div>
    )
}

export default TodoItemDisplay;