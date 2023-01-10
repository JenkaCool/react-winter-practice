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
      <div className="Top_bar">

      </div>
      <div className="Sidebar">
        <h2> Groups </h2>
          <div className="Task__groups">
            {taskGroups.map((item) => (
              <Form.Group key={item.id} className="Task__group">
                <Form.Control type="text" value={item.header} />
              </Form.Group>
            ))}
        </div>
      </div>
      <div className="Content">
        <div className="Task__list">
          <h2 className="Header"> Task list </h2>
          {taskItems.map((item) => (
            <Form.Group key={item.id} className="Task__item">
              <Form.Check type="checkbox" checked={item.done} />
              <Form.Control type="text" value={item.header} />
              <Form.Control type="text" value={item.description} />
              <Form.Control type="text" value={item.deadline} />
            </Form.Group>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;