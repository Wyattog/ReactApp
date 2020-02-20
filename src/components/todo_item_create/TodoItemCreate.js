import React from 'react';
import PubSub from 'pubsub-js';
import { TODOITEMCREATED} from '../../components/lib/subscription';
import './TodoItemCreate.css';

class TodoItemCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: ''
        };

        //binding handlers
        this.submitHandler = this.submitHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);

        // references
        this.submitButton = React.createRef();
        this.nameInput = React.createRef();
        this.descriptionInput = React.createRef();
    }

    componentDidMount() {
        console.log("FIRED EVENT: componentDidMount");

        this.nameInput.current.addEventListener('change', this.nameChangeHandler);
        this.descriptionInput.current.addEventListener('change', this.descriptionChangeHandler);
        this.submitButton.current.addEventListener('click', this.submitHandler);
    }

    componentWillUnmount() {

    }

    componentDidCatch(error, info) {

    }

    nameChangeHandler(e) {
        this.setState({
            name: e.target.value
        });
    }

    descriptionChangeHandler(e) {
        this.setState({
            description: e.target.value
        });
    }

    submitHandler(e) {
        console.log(this.state);
        //this.props.todoItemCreateEvent(this.state);
        PubSub.publish(TODOITEMCREATED, this.state);
        
        this.nameInput.current.value = '';
        this.descriptionInput.current.value = '';
        
        this.setState({
            name: '',
            description: ''
        })
    }

    render() {
        return (
            <div className="todoItemCreate">
                <div>Name: <input className="nameInput" ref={this.nameInput} defaultValue={this.state.name} placeholder="National Park" type="text" /></div>
                <div>Description: <input className="descriptionInput" ref={this.descriptionInput} defaultValue={this.state.description} placeholder="Brief description" type="text" /></div>
                <button className="submitButton"ref={this.submitButton}>Submit</button>
            </div>
        );
    }
}

export default TodoItemCreate;