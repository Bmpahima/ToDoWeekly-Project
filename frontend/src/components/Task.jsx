import React from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';



function Task(props) {

  function handleDelete(event) {
    event.preventDefault();
    props.handleDeleteTask(props.id);
  }

  function handleEdit(event) {
    event.preventDefault();
    const task = {
      id: props.id,
      title: props.title,
      description: props.description,
      date: props.date,
      weekday: props.weekday 
    }
    props.startEditTask(task);
  }

  return (
    <div className="task">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <div className="task-details">
        <div className="task-date">{props.date}</div>
        <button className="delete-task" onClick={handleDelete}><DeleteOutlineIcon /></button>
        <button className="delete-task edit" onClick={handleEdit}><EditIcon /></button>
      </div>
    </div>
  );
}

export default Task;
