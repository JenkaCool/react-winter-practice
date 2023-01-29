import plus from '../imges/plus.svg';
import Task from './Task';

import { handleDragOver, handleDragLeave,
  handleDragStart, handleDragEnd,
  handleDrop } from '../handleTaskDrag';

import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const TasksList = () => {
  const { groupId } = useParams();

  const [groupItems, setGroupItems] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState(null);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/groups/${groupId}`)
      .then((res) => {
        if (!res.ok)
          throw Error("Couldn't fetch the data for that resource");
        return res.json();
        })
      .then((result) => {
        initData(result);
        setIsPending(false);
        setError(null);
      })
      .catch(error => {
        setIsPending(false);
        setError(error.message);
      })
  }, [groupId]);

  function initData(data) {
    setGroupItems(data);
    setTasks(data.tasks);
  };

  function nextDay() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.getDate();
}

  const enterNewTask = (e) => setNewTask(e.target.value);
  function addTask() {
    const taskObj = {id: groupItems.tasks.length + 1, title:newTask, deadline: nextDay(), done: false}
  }

  const handleRemoveTask = (groupId, taskId) => {
    setId(groupItems.id);
    const groupTitle = groupItems.title;
    setTitle(groupTitle);
    const tasksList = tasks.filter(task => task.id !== taskId);
    setTasks(tasksList);
    console.log(taskId);
    console.log(tasks.filter(task => task.id !== taskId));

    const newTasksList = { id, title, tasks }

    fetch(`http://localhost:8000/groups/${groupId}`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newTasksList)
    }).then(( ) => {
      console.log(`Task deleted`);
      setIsPending(false);
    })
  }

  return (
    <>
      { error && <div className="__error"> {error} </div> }
      { isPending && <div className="__loading"> Loading... </div> }
      { groupItems && tasks && <div className="Tasks__list">
        <h2 className="Title"> { groupItems.title } </h2>
        <div>
          {tasks.map((item) => (
            <Task
             key={item.id}
             task={item}
             groupId={groupId}
             handleRemoveTask={handleRemoveTask} />
          ))}
          <div className="button __add_task">
            <img src={plus} className="plus_img" alt="+" />
            <span>Add task...</span>
          </div>
        </div>
      </div>}
    </>
  );
}

export { TasksList }