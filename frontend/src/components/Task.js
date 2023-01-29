import plus from '../imges/plus.svg';
import wastebasket from '../imges/wastebasket.svg';

import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';


const Task = ({task, groupId, handleRemoveTask}) => {

  function changeTaskStatus(taskId)  {
    console.log('Status changed');
  }

  function printMessage() {
    console.log('Field changed');
  }

  const handleCheckStatus = (groupId, taskId) => {
    console.log('Check');
    //console.log(id);
    /*---
    var currentGroup = [];
    var currentTask = [];
    var currentTaskId = [];
    currentGroup = groups.find(item => item.id === groupId);
    console.log(currentGroup);
    currentTaskId = currentGroup.tasks.findIndex(item => item.id === taskId);
    currentTask = currentGroup.tasks[currentTaskId];
    const taskDone = currentTask.done;
    currentGroup.tasks[currentTaskId].done = !taskDone;
    setGroups(groups.map((item) => item.id === groupId ? { ...item, currentGroup } : item));
     */
  }

  return (
    <Form.Group className="Task__item">
      <Form.Check type="checkbox" checked={task.done} onClick={() => handleCheckStatus(groupId, task.id)} />
      <div className={task.done ? 'task_field task-done' : 'task_field'}>
        <Form.Control type="text" value={task.title} onChange={() => printMessage()} />
        <Form.Control type="text" value={task.description} onChange={() => printMessage()} />
        <Form.Control type="text" value={task.deadline} onChange={() => printMessage()} />
      </div>
      {task.done ?
        <div className='status __done'>
          <span className="deadline_img"/>
          <span className="status-text">done</span>
        </div>
        :
        <div className='status __in_process'>
          <span className="deadline_img"/>
          <span className="status-text">in process</span>
        </div>
      }
      <button className="button_control" onClick={() => handleRemoveTask(groupId, task.id)}>
        <img src={wastebasket} className="wastebasket_img" alt="Remove task" />
      </button>
    </Form.Group>
  );
}

export default Task;