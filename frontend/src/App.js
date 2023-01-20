import { useState, useEffect } from 'react';
import './App.css';
import TasksList from './components/TasksList.js';
import GroupsList from './components/GroupsList.js';

function App() {
  const [groups, setGroups] = useState([]);
  const [taskItems, setTaskItems] = useState([ ]);
  const [groupItems, setGroupItems] = useState([ ]);
//  const [tasks, setTasks] = useState(initTasks);

  useEffect(() => {
    fetch('http://localhost:3010/api/all-tasks')
      .then((res) => res.json())
      .then((result) => setGroups(result.data));
  }, []);
/*
  function getGroupsList() {

  }

  function getAllGroupsTasks() {

  }

  function setSelectedGroupId(groupId) {
    setSelectedGroupId(groupId);
  }

  function getSelectedGroupTitle(groupId) {
    const currentTitle = groupItems.filter(item => {
      return item.id === groupId
    });
    setSelectedGroup(currentTitle);
    return currentTitle;
  }

  function getSelectedGroupTasks() {

  }
*/

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
        <GroupsList groupItems={groups}/>
      </div>
      <div className="Content">
        <TasksList taskItems={taskItems}/>
      </div>
    </div>
  );
}

export default App;