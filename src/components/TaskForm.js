import React, { useState } from 'react';
import './TaskForm.css'; 

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [deviceToken, setDeviceToken] = useState('');

  const assignTask = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    const response = await fetch('http://localhost:5000/api/tasks/assign-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, assignedTo, deviceToken }),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="form-container">
      <form onSubmit={assignTask} className="task-form">
        <h2 className="form-title">Assign Task</h2>
        <div className="input-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            required
            className="form-input"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Assign To"
            required
            className="form-input"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            value={deviceToken}
            onChange={(e) => setDeviceToken(e.target.value)}
            placeholder="Device Token"
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
