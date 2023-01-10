import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import './App.css';

function App() {
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3010/api/task-items')
      .then((res) => res.json())
      .then((result) => setTaskItems(result.data));
  }, []);

  return (
    <div>
      {taskItems.map((item) => (
        <Form.Group key={item.id} className="app__task-item">
          <Form.Check type="checkbox" checked={item.done} />
          <Form.Control type="text" value={item.text} />

        </Form.Group>
      ))}
    </div>
  );
}

export default App;