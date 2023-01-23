import plus from '../imges/plus.svg';
import wastebasket from '../imges/wastebasket.svg';


import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

const TasksList = ({taskItems, groupId, groupTitle, handleCheckStatus, handleRemoveTask}) => {

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
          <Form.Check type="checkbox" checked={item.done} onClick={() => handleCheckStatus(groupId, item.id)} />
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
          <button className="button_control" onClick={() => handleRemoveTask(groupId, item.id)}>
            <img src={wastebasket} className="wastebasket_img" alt="Remove task" />
           </button>
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