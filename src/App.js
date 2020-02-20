import React from 'react';

import './App.sass';
import './App.css';
import ToDoList from './components/todo_list/todo_list';
import TodoItemCreate from './components/todo_item_create/TodoItemCreate';
import PubSub from 'pubsub-js';
import {TODOITEMCREATED} from './components/lib/subscription';
import {TODOITEMREMOVE} from './components/lib/subscription';
import Heading from './components/lib/heading';

//NOTE: this should be deleted after backend is created
class App extends React.Component 
{
  constructor(props) {
    super(props);

 this.state = {
      todo_items: [
    { id: 1,
    name: 'Zion National Park',
    description: 'Zion is known for its spectacular hikes and views. Other spectacular features of Zion include natural rock arches',
    complete: false
    },
    { id: 2,
        name: 'Bryce National Park',
        description: 'Bryce Canyon National Park in Southwestern Utah is famous for the largest collection of hoodoos—the distinctive rock formations at Bryce—in the world.',
        complete: false
        },
       { id: 3,
          name: 'Arches National Park',
          description: 'Arches National Park contains over 2,000 natural sandstone arches!',
          complete: false
          },
          { id: 4,
            name: 'Capitol Reef National Park',
            description: 'Capitol Reef National Park is a hidden treasure filled with cliffs, canyons, domes, and bridges in the Waterpocket Fold',
            complete: false
            }
  ]
    }
    this.todoItemCreateHandler = this.todoItemCreateHandler.bind(this);
    PubSub.subscribe(TODOITEMCREATED, this.todoItemCreateHandler);

    this.todoItemRemoveHandler = this.todoItemRemoveHandler.bind(this);
    PubSub.subscribe(TODOITEMREMOVE, this.todoItemRemoveHandler)
  }

  // Notification Handlers
  todoItemCreateHandler(msg, todo){
    console.log("NOTIFICATION HANDLED", todo);
    todo.id = this.state.todo_items.length + 1;
    todo.complete = false;
    this.state.todo_items.push(todo)
    this.setState({
      todo_items: this.state.todo_items

    });

  }
  todoItemRemoveHandler(msg,todo) {
    let todos= Object.assign({},this.state);
    console.log(todos.todo_items[todo]);
    todos.todo_items[todo - 1].complete = true;
    this.setState({todos});
  }

  render() {
    return (
      <div className="App">
        <Heading />
        <TodoItemCreate />
        <ToDoList todos={this.state.todo_items}/>
        
      </div>
    );
  }

}
  

export default App;
