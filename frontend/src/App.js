import { useState, useEffect } from 'react';
import './App.css';
import TasksList from './components/TasksList';
import GroupsList from './components/GroupsList';
import useFetch from './useFetch';

function App() {
  const { groups, tasks, selectedId, selectedTitle, isPending, error } = useFetch('http://localhost:3010/api/all-tasks');

  const handleChangeGroup = (id) => {
    //console.log(id);
     /*---
    updateSelectedGroupData(groups, id);
     */
  }


  const handleCheckStatus = (groupId, taskId) => {
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

  const handleRemoveTask = (groupId, taskId) => {
    //console.log(id);
     /*---
    var currentGroup = [];
    currentGroup = groups.find(item => item.id === groupId);
    console.log(currentGroup);
    currentGroup.tasks = currentGroup.tasks.filter(task => task.id !== taskId);
    //console.log(currentGroup);
    setGroups(groups.map((item) => item.id === groupId ? { ...item, currentGroup } : item));
    setTasks(currentGroup.tasks);
    */
  }

  const handleRemoveGroup = (groupId) => {
 /*    var currentGroup = [];
     if (selectedId === groupId) {
       var id = currentGroup.findIndex(item => item.id === groupId);
       var newId = selectedId === groupId ? 1 : selectedId;
     }
*/
/*
     currentGroup = groups.filter(item => item.id !== groupId);
     setGroups(currentGroup);
 */
  }



  return (
    <div className="App">
      <div className="Top_bar"></div>
      <div className="Sidebar">
        <h2 className="group_header"> Groups </h2>
        { isPending && <div className="__loading"> Loading... </div>}
        {groups && <GroupsList
            groupItems={groups}
            groupId={selectedId}
            handleChangeGroup={handleChangeGroup}
            handleRemoveGroup={handleRemoveGroup}/>}
      </div>
      <div className="Content">
        <h2 className="Title"> {selectedTitle} </h2>
        { error && <div className="__error> {error} </div>}
        { isPending && <div className="__loading> Loading... </div>}
        {tasks && <TasksList
            taskItems={tasks}
            groupId={selectedId}
            handleCheckStatus={handleCheckStatus}
            handleRemoveTask={handleRemoveTask}/>}
      </div>
    </div>
  );
}

export default App;