import React from 'react';
import './TaskBoard.scss';
import TaskColumn from "../TaskColumn/TaskColumn";

const TaskBoard = () => (
  <div className="TaskBoard" data-testid="TaskBoard">
      <div className="task-board-content">
          <TaskColumn/>
          <TaskColumn/>
      </div>

  </div>
);

export default TaskBoard;
