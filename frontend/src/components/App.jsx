import React, { useState, useEffect } from 'react';
import Header from "./Header";
import TaskContainer from "./TaskContainer";
import TaskForm from "./TaskForm"; 
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [tasks, setTasks] = useState([]);
  const [toAdd, setToAdd] = useState(false);
  const [toEdit, setToEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  function handleDeleteTask(taskId) {
    fetch('http://localhost:3000/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: taskId }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
        return response.json();
      })
      .then(data => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  }

  function handleAddTask(newTask) {
    fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(data => {
        setTasks(prevTasks => [...prevTasks, data]);
        setToAdd(false); 
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  }

  function handleEditTask(updatedTask) {
    fetch('http://localhost:3000/edit', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        return response.json();
      })
      .then(data => {
        setTasks(prevTasks => prevTasks.map(task => task.id === data.updatedTask.id ? data.updatedTask : task));
        setToEdit(false); 
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  }

  function fetchTasks() {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function startEditTask(task) {
    setTaskToEdit(task);
    setToEdit(true);
  }

  return (
    <div>
      <Header />
      <TaskContainer tasks={tasks} handleDeleteTask={handleDeleteTask} startEditTask={startEditTask} /> 
      <button className="add-task" onClick={() => { setToAdd(true); setTaskToEdit(null); }} style={{ display: toAdd ? "none" : "block" }}>
        <AddIcon />
      </button>
      <TaskForm 
        editMode={toEdit}
        show={toAdd || toEdit} 
        func={[handleAddTask, handleEditTask]}
        taskData={taskToEdit} 
      />
    </div>
  );
}

export default App;
