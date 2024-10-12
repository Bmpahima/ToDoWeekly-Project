import React, { useState, useEffect } from 'react';

function TaskForm(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [weekday, setWeekday] = useState('Sunday');

  useEffect(() => {
    if (props.taskData) {
      setTitle(props.taskData.title || ''); 
      setDescription(props.taskData.description || '');
      setDate(props.taskData.date || '');
      setWeekday(props.taskData.weekday || 'Sunday');
    } else {
      setTitle('');
      setDescription('');
      setDate('');
      setWeekday('Sunday');
    }
  }, [props.taskData]);

  function handleSubmit(event) {
    event.preventDefault();
    const task = {
      id: props.taskData?.id,
      title,
      description,
      date,
      weekday
    };
    
    if (props.editMode) {
      props.func[1](task); 
    } else {
      props.func[0](task); 
    }
  }

  return (
    <div className="task-form-container" style={{ display: !props.show ? "none" : "block" }}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Title' 
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder='description' 
          name='description' 
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
        />
        <input 
          type="date" 
          placeholder='date' 
          name='date'
          value={date}
          onChange={(e) => setDate(e.target.value)} 
        />
        <select 
          id="days-options" 
          name="weekday"
          value={weekday}
          onChange={(e) => setWeekday(e.target.value)} 
        >
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
        <input 
          className="submit-task" 
          type="submit" 
          value={props.editMode ? "Edit Task" : "Add Task"} 
        />
      </form>
    </div>
  );
}

export default TaskForm;
