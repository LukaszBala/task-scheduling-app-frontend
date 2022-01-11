import React from 'react';
import './TaskItem.scss';

const TaskItem = (props: any) => (
  <div className="TaskItem" data-testid="TaskItem">
      {props.item.name}
  </div>
);

export default TaskItem;
