import React from 'react';
import './TaskItem.scss';

const TaskItem = (props: any) => (
  <div className="TaskItem" data-testid="TaskItem">
      {props.item.content}
  </div>
);

export default TaskItem;
