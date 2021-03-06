import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class TodoView extends Component {
  onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  }

  onRename = () => {
    const todo = this.props.todo;
    todo.task = prompt('Task name', todo.task) || todo.task;
  }

  render() {
    const todo = this.props.todo;
    return (
      <li onDoubleClick={this.onRename}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={this.onToggleCompleted}
        />
        {todo.task}
        {todo.assignee
          ? <small>{todo.assignee.name}</small>
          : null
        }
      </li>
    );
  }
}

@observer
export default class TodoList extends Component {
  onNewTodo = () => {
    this.props.store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
  }

  render() {
    const store = this.props.store;
    return (
      <div>
        {store.report}
        <ul>
          {store.todos.map(
            (todo, idx) => <TodoView todo={todo} key={idx} />
          )}
        </ul>
        {store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null}
        <button onClick={this.onNewTodo}>New Todo</button>
        <small>(double-click a todo to edit)</small>
      </div>
    );
  }
}
