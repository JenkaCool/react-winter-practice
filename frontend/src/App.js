import plus from './imgs/plus.svg';

import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import './App.css';

function App() {
  const [taskItems, setTaskItems] = useState([]);
  const [taskGroups, setTaskGroups] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3010/api/task-items')
      .then((res) => res.json())
      .then((result) => setTaskItems(result.data));

    fetch('http://localhost:3010/api/task-groups')
      .then((res) => res.json())
      .then((result) => setTaskGroups(result.data));
  }, []);

  return (
    <div className="App">
      <div className="Top_bar"></div>
      <div className="Sidebar">
        <h2 className="group_header"> Groups </h2>
          <div className="Task__groups">
            {taskGroups.map((item) => (
              <Form.Group key={item.id} className="Task__group">
                <Form.Control type="text" value={item.header} />
              </Form.Group>
          ))}
          <div className="button __add_group">
            <img src={plus} className="plus_img" alt="+" />
            <span>Add group...</span>
          </div>
        </div>
      </div>
      <div className="Content">
        <div className="Task__list">
          <h2 className="Header"> Task list </h2>
          {taskItems.map((item) => (
            <Form.Group key={item.id} className="Task__item">
              <Form.Check type="checkbox" checked={item.done} />
              <div className="task_field">
                <Form.Control type="text" value={item.header} />
                <Form.Control type="text" value={item.description} />
                <Form.Control type="text" value={item.deadline} />
              </div>
              <div className="status __in_process">
                <span className="deadline_img"/>
                <p>in process</p></div>
              <div className="small_button __watching"></div>
              <div className="small_button __delete"></div>
            </Form.Group>
          ))}
          <div className="button __add_task">
            <img src={plus} className="plus_img" alt="+" />
            <span>Add task...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;