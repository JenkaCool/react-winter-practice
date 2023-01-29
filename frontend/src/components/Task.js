import plus from '../imges/plus.svg';
import wastebasket from '../imges/wastebasket.svg';

import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';


const Task = ({task, groupId, handleRemoveTask}) => {
  const todayDate = new Date().toISOString().slice(0, 10);

  function changeTaskStatus(taskId)  {
    console.log('Status changed');
  }

  function printMessage() {
    console.log('Field changed');
  }

  function calcDaysBetweenDates(date1, date2) {
    var diff = new Date(date2).getTime() - new Date(date1).getTime();
    const days = diff / (1000 * 60 * 60 * 24);

    return days;
  }

  function getTaskStatus(done, deadline) {
    var restOfDays = calcDaysBetweenDates(todayDate, deadline);
    console.log("days:", restOfDays);
    if (done) {
      return taskDone();
    } else {
      if (restOfDays > 3) {
        return taskInProcess();
      } else {
        if (restOfDays <= 3 && restOfDays > 0) {
          return taskDeadlineIsComing(restOfDays);
        } else {
          return taskExpired();
        }
      }
    }
  }

  function taskDone() {
    return (
      <div className='status __done'>
        <span className="deadline_img"/>
        <span className="status-text">done</span>
      </div>
    );
  }

  function taskExpired() {
    return (
      <div className='status __expired'>
        <span className="deadline_img"/>
        <span className="status-text">expired</span>
      </div>
    );
  }

  function taskInProcess() {
    return (
      <div className='status __in_process'>
        <span className="deadline_img"/>
        <span className="status-text">in process</span>
      </div>
    );
  }

  function taskDeadlineIsComing(daysLeft) {
    return (
      <div className='status __deadline_is_coming'>
        <span className="deadline_img"/>
        <span className="status-text">{daysLeft} days left </span>
       </div>
    );
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
      <div className={`task_field ${task.done  ? "task-done" : "" }`}>
        <Form.Control type="text" value={task.title} onChange={() => printMessage()} />
        <Form.Control type="text" value={task.description} onChange={() => printMessage()} />
        <Form.Control type="text" value={task.deadline} onChange={() => printMessage()} />
      </div>
      { getTaskStatus(task.done, task.deadline) }
      <button className="button_control" onClick={() => handleRemoveTask(groupId, task.id)}>
        <img src={wastebasket} className="wastebasket_img" alt="Remove task" />
      </button>
    </Form.Group>
  );
}

export default Task;