import plus from '../imges/plus.svg';

import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

const TasksList = ({taskItems, groupId, groupTitle}) => {

  function changeTaskStatus(taskId)  {
    console.log('Status changed');
  }

  function printMessage() {
    console.log('Field changed');
  }

  return (
    <div className="Task__list">
      <h2 className="Title"> {groupTitle} </h2>
      {taskItems.map((item) => (
        <Form.Group key={item.id} className="Task__item">
          <Form.Check type="checkbox" checked={item.done} onClick={() => changeTaskStatus(item.id)} />
          <div className={item.done ? 'task_field task-done' : 'task_field'}>
            <Form.Control type="text" value={item.title} onChange={() => printMessage()} />
            <Form.Control type="text" value={item.description} onChange={() => printMessage()} />
            <Form.Control type="text" value={item.deadline} onChange={() => printMessage()} />
          </div>
          {item.done ?
            <div className='status __done'>
              <span className="deadline_img"/>
              <span className="status-text">done</span>
            </div>
            :
            <div className='status __in_process'>
              <span className="deadline_img"/>
              <span className="status-text">in process</span>
            </div>}
          <div className="button_small __menu">...</div>
        </Form.Group>
      ))}
      <div className="button __add_task">
        <img src={plus} className="plus_img" alt="+" />
        <span>Add task...</span>
      </div>
    </div>
  );
}

export default TasksList;