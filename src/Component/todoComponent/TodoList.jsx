import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo.jsx';
import './todoList.css'

const TodoList = ({ userID, place, day }) => {
  const [todos, setTodos] = useState([]);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [newTodoTask, setNewTodoTask] = useState('');
  const [newTodoTime, setNewTodoTime] = useState('');

  // const [newTodoUserID, setNewTodoUserID] = useState('');
  // const [newTodoPlace, setNewTodoPlace] = useState('');
  // const [newTodoDay, setNewTodoDay] = useState('');

  // setNewTodoUserID(userID);
  // setNewTodoPlace(place);
  // setNewTodoDay(day);

  useEffect(() => {
    // Fetch the Todo records from the database based on userID, place, and day
    const fetchTodos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/todos?userID=${userID}&place=${place}&day=${day}`);
        if (response.ok) {
          const todosData = await response.json();
          setTodos(todosData);
        } else {
          console.error('Error fetching todos:', response.status);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [userID, place, day]);

  const handleDelete = async (_id) => {
    // Make API request to delete the todo with the given ID
    try {
      // Make the delete request to your backend endpoint
      await fetch(`http://localhost:3000/todos/${_id}`, {
        method: 'DELETE',
      });

      // Update the todos array with the deleted todo removed
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleAddTodo = () => {
    setShowAddTodo(true);
  };

  const handleConfirmAddTodo = async () => {
    try {

      // Validate the newTodoTime to ensure it's not empty
      if (!newTodoTime) {
        alert('Please select a time for the todo.');
        return;
      }
      // Convert the selected time to the desired format (HH:mm AM/PM)
      const timeParts = newTodoTime.split(':');
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const amPm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${amPm}`;



    
      // Make the API request to create a new todo
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: newTodoTask,
          time: formattedTime,
          userID: userID, // Use the passed userID
          place: place, // Use the passed place
          day: day, // Use the passed day
        }),
      });

      if (response.ok) {
        // Parse the response to get the new todo object
        const newTodo = await response.json();

        // Add the new todo to the todos array
        setTodos((prevTodos) => [...prevTodos, newTodo]);

        // Reset the input fields and hide the "Add Todo" component
        setNewTodoTask('');
        setNewTodoTime('');
        setShowAddTodo(false);
      } else {
        console.error('Error adding todo:', response.status);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleCancelAddTodo = () => {
    // Reset the input fields and hide the "Add Todo" component
    setNewTodoTask('');
    setNewTodoTime('');
    setShowAddTodo(false);
  };

  const handleUpdate = async (updatedTodos) => {
    // Make API request to update the todos
    try {
      // // Make the PUT request to your backend endpoint
      // await fetch(`http://localhost:3000/todos/${_id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updatedTodos),
      // });

      // Update the todos array with the updated todos
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todos:', error);
    }
  };

  return (
    <div className="todo-list-container">
      <h2 className="todo-list-heading">Activities</h2>

      {todos.length > 0 ? (
        <Todo todos={todos} onDelete={handleDelete} onUpdate={handleUpdate} userID={userID} place={place} day={day}/>
      ) : (
        <p>No todos found.</p>
      )}

      {showAddTodo ? (
        <div className="add-todo-container">
          <select
           // className=''
            value={newTodoTime}
            onChange={(e) => setNewTodoTime(e.target.value)}
            placeholder="Time">
            <option value="">Select Time</option>
            <option value="06:00">6:00 AM</option>
            <option value="06:30">6:30 AM</option>
            <option value="07:00">7:00 AM</option>
            <option value="07:30">7:30 AM</option>
            <option value="08:00">8:00 AM</option>
            <option value="08:30">8:30 AM</option>
            <option value="09:00">9:00 AM</option>
            <option value="09:30">9:30 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="10:30">10:30 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="11:30">11:30 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="12:30">12:30 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="13:30">1:30 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="14:30">2:30 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="15:30">3:30 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="16:30">4:30 PM</option>
            <option value="17:00">5:00 PM</option>
            <option value="17:30">5:30 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="18:30">6:30 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="19:30">7:30 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="20:30">8:30 PM</option>
            <option value="21:00">9:00 PM</option>
            <option value="21:30">9:30 PM</option>
            <option value="22:00">10:00 PM</option>
            <option value="22:30">10:30 PM</option>
            <option value="23:00">11:00 PM</option>
            <option value="23:30">11:30 PM</option>
          </select>

          <input
            type="text"
            value={newTodoTask}
            onChange={(e) => setNewTodoTask(e.target.value)}
            placeholder="Activity"
          />
          <button onClick={handleConfirmAddTodo}>Add</button>
          <button onClick={handleCancelAddTodo}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleAddTodo}>Add Todo</button>
      )}
    </div>
  );
};

TodoList.propTypes = {

  userID: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  day: PropTypes.number.isRequired,
};


export default TodoList;
