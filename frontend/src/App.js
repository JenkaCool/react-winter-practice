import plus from './imgs/plus.svg';

import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import './App.css';
import TasksList from './components/TasksList.js';
import GroupsList from './components/GroupsList.js';

function App() {
  const [taskItems, setTaskItems] = useState([]);
  const [groupItems, setGroupItems] = useState([]);
//  const [tasks, setTasks] = useState(initTasks);

  useEffect(() => {
    fetch('http://localhost:3010/api/task-items')
      .then((res) => res.json())
      .then((result) => setTaskItems(result.data));

    fetch('http://localhost:3010/api/task-groups')
      .then((res) => res.json())
      .then((result) => setGroupItems(result.data));
  }, []);

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
        <GroupsList groupItems={groupItems}/>
      </div>
      <div className="Content">
        <TasksList taskItems={taskItems}/>
      </div>
    </div>
  );
}

export default App;