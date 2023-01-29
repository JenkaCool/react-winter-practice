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

/*
  const [currentTask, setCurrentTask] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);

  function handleDragOver(e) {
    e.preventDefault();
    if (e.target.className == "Task__item") {
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  };

  function handleDragLeave(e) {
    e.target.style.boxShadow = 'none';
  };

  function handleDragStart(e, group, task) {
    setCurrentGroup(group);
    setCurrentTask(task);
  };

  function handleDragEnd(e) {
    e.target.style.boxShadow = 'none';
  };

  function handleDrop(e, group, task) {
    e.preventDefault();
    const currentIndex = currentGroup.tasks.findIndex(currentTask)
    currentGroup.tasks.splice(currentIndex, 1);

    const dropIndex = group.tasks.findIndex(task)
    group.tasks.splice(dropIndex + 1, 0, currentTask);

    setGroups(groups.map (g => {
      if (g.id === group.id) {
        return groups;
      }
      if (g.id === group.id) {
        return currentGroup
      }
      return g;

    }));
  };

             draggable={true}
             onDragOver={(e) => handleDragOver(e)}
             onDragLeave={(e) => handleDragLeave(e)}
             onDragStart={(e) => handleDragStart(e, group, task)}
             onDragEnd={(e) => handleDragEnd(e)}
             onDrop={(e) => handleDrop(e, group, task)}

*/

  return (
    <>
      { error && <div className="__error"> {error} </div> }
      { isPending && <div className="__loading"> Loading... </div> }
      { groupItems && tasks && <div className="Tasks__list">
        <h2 className="Title"> { groupItems.title } </h2>
        <div>
          {tasks.map((item) => (
            <Task key={item.id}
             task={item}
             groupId={groupId} />
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