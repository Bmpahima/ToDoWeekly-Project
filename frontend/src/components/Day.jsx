import React from "react";
import Task from "./Task";

function Day(props) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  return (
    <div className="day">
      <h3 className="day-title">{daysOfWeek[new Date().getDay()] === props.day? "Today": props.day}</h3>
      {props.tasks.length > 0 ? ( 
        <div className="tasks">
          {props.tasks.map((task, index) => (
            <Task
              key={index}
              id={task.id}
              title={task.title}
              description={task.description}
              date={task.submit_date}
              weekday={task.weekday}
              startEditTask={props.startEditTask}
              handleDeleteTask={props.handleDeleteTask}
            />
          ))}
        </div>
      ) : (
        <p className="no-tasks-message">No tasks for {props.day}</p> 
      )}
    </div>
  );
}
export default Day;
