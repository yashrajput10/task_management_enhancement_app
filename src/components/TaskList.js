// frontend/src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Listen for the taskUpdated event and update the tasks
    socket.on('taskUpdated', (updatedTask) => {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    // Clean up the event listener when the component unmounts
    return () => socket.off('taskUpdated');
  }, []);

  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <div key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default TaskList;
