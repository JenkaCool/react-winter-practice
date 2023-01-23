import { useState, useEffect } from 'react';
import './App.css';
import TasksList from './components/TasksList.js';
import GroupsList from './components/GroupsList.js';

function App() {
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [selectedTitle, setSelectedTitle] = useState(null);


  useEffect(() => {
    fetch('http://localhost:3010/api/all-tasks')
      .then((res) => res.json())
      .then((result) => initData(result.data));
  }, []);


  const handleChangeGroup = (id) => {
    //console.log(id);
    updateSelectedGroupData(groups, id);
  }

  const handleCheckStatus = (groupId, taskId) => {
    //console.log(id);
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

  }

  const handleRemoveTask = (groupId, taskId) => {
    //console.log(id);
    var currentGroup = [];
    currentGroup = groups.find(item => item.id === groupId);
    console.log(currentGroup);
    currentGroup.tasks = currentGroup.tasks.filter(task => task.id !== taskId);
    //console.log(currentGroup);
    setGroups(groups.map((item) => item.id === groupId ? { ...item, currentGroup } : item));
    setTasks(currentGroup.tasks);
  }

  const handleRemoveGroup = (groupId) => {
     var currentGroup = [];

 /*   if (selectedId === groupId) {
       var id = currentGroup.findIndex(item => item.id === groupId);
       var newId = selectedId === groupId ? 1 : selectedId;
     }
*/
     currentGroup = groups.filter(item => item.id !== groupId);
     setGroups(currentGroup);
  }

  function initData(data) {
    updateGroupsData(data);
    const id = getFirstGroupId(data);
    updateSelectedGroupData(data, id);
    console.log(data, id);
  };

  function updateGroupsData(data) {
    setGroups(data);
  };

  function getFirstGroupId(data) {
    return data[0].id;
  };

  function updateSelectedGroupData(data, id) {
    updateGroupId(id);
    updateGroupTitle(data, id);
    updateGroupTasks(data, id);
  };

  function updateGroupId(id) {
    //console.log(id);
    setSelectedId(id);
  };

  function updateGroupTitle(data, id) {
    //console.log(data);
    //console.log(id);

    var groupTitle = null;
    var currentGroupData = null;

    currentGroupData = data.find(item => item.id === id)
    groupTitle = currentGroupData.title;
    setSelectedTitle(groupTitle);

    //console.log(groupTitle);
  };

  function updateGroupTasks(data, id) {
    var groupData = [];
    var groupTasks = [];

    groupData = data.find(item => item.id === id);
    if (groupData) groupTasks = groupData.tasks ;

    setTasks(groupTasks);

    //console.log(groupTasks);
  };


  return (
    <div className="App">
      <div className="Top_bar"></div>
      <div className="Sidebar">
        <GroupsList
            groupItems={groups}
            groupId={selectedId}
            handleChangeGroup={handleChangeGroup}
            handleRemoveGroup={handleRemoveGroup}/>
      </div>
      <div className="Content">
        <TasksList
            taskItems={tasks}
            groupId={selectedId}
            groupTitle={selectedTitle}
            handleCheckStatus={handleCheckStatus}
            handleRemoveTask={handleRemoveTask}/>
      </div>
    </div>
  );
}

export default App;