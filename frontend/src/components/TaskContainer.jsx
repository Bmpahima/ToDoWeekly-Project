import React from "react";
import Day from "./Day";

function TaskContainer(props) {
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
    <div className="day-container">
      {daysOfWeek.map((day) => (
        <Day
          key={day}
          day={day}
          tasks={props.tasks.filter((task) => task.day === day)}
          handleDeleteTask={props.handleDeleteTask} 
          startEditTask={props.startEditTask}
        />
      ))}
    </div>
  );
}

export default TaskContainer;
