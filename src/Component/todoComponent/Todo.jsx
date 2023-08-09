import PropTypes from 'prop-types';
import './todo.css';

const Todo = ({ todos, onDelete, onUpdate,}) => {
  const handleToggle = async (_id) => {
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo._id === _id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      // Update the UI first to reflect the new completed status
      // This will help in cases where the API request takes some time to complete
      onUpdate(updatedTodos);

      // Send the API request to update the completed status in the backend
      await fetch(`http://localhost:3000/todos/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todos.find((todo) => todo._id === _id).completed }),
      });
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };


  const handleDelete = async (_id) => {
    await onDelete(_id);
  };


  return (

      <ul className="todo-list">
        {todos.map(todo => (
          <div key={todo._id} className="todo-item">
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo._id)} />
            <span className="todo-time">{todo.time}</span>

            <span className={`todo-task ${todo.completed ? 'completed-task' : ''}`}>{todo.task}</span>
            <button className="delete-button" onClick={() => handleDelete(todo._id)}>Delete</button>
          </div>
        ))}
      </ul>

  );
  
};

Todo.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      task: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,

};

export default Todo;
