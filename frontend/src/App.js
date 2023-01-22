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


  const handelChangeGroup = (id) => {
    console.log(id);
    updateSelectedGroupData(groups, id);
  }

  function initData(data) {
    updateGroupsData(data);
    var id = getFirstGroupId(data);
    updateSelectedGroupData(data, id);
    console.log(data, id);
  }

  function updateGroupsData(data) {
    setGroups(data);
  }

  function getFirstGroupId(data) {
    return data[0].id;
  }

  function updateSelectedGroupData(data, id) {
    updateGroupId(id);
    updateGroupTitle(data, id);
    updateGroupTasks(data, id);
  }

  function updateGroupId(id) {
    //console.log(id);
    setSelectedId(id);
  }

  function updateGroupTitle(data, id) {
    //console.log(data);
    //console.log(id);

    var groupTitle = null;
    var currentGroupData = null;

    currentGroupData = data.find(item => item.id === id)
    groupTitle = currentGroupData.title;
    setSelectedTitle(groupTitle);

    //console.log(groupTitle);
  }

  function updateGroupTasks(data, id) {
    var groupData = [];
    var groupTasks = [];

    groupData = data.find(item => item.id === id);
    if (groupData) groupTasks = groupData.tasks ;

    setTasks(groupTasks);

    //console.log(groupTasks);
  }

/*
  function changeTaskStatus(taskId) {
    console.log(tasks);
    const changedTasksList = [...tasks];
    const task = changedTasksList.find(
      item => item.id === taskId);
    if (task)
      task.done = !task.done;
    setTasks(changedTasksList);
    console.log('Status changed');
  }
*/

  return (
    <div className="App">
      <div className="Top_bar"></div>
      <div className="Sidebar">
        <GroupsList
            groupItems={groups}
            groupId={selectedId}
            handelChangeGroup={handelChangeGroup}/>
      </div>
      <div className="Content">
        <TasksList
            taskItems={tasks}
            groupId={selectedId}
            groupTitle={selectedTitle}/>
      </div>
    </div>
  );
}

export default App;