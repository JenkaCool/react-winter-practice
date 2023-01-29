import plus from '../imges/plus.svg';
import Group from './Group';

import { groups, handleDragOver, handleDropTask } from '../handleTaskDrag';

import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';

const GroupsList = () => {
  const { groupId } = useParams();

  const [groups, setGroups] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const [len, setLen] = useState(null);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("New Group");
  const [tasks, setTasks] = useState([]);

  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    const abortControl = new AbortController();
    fetch(`http://localhost:8000/groups/`, {signal: abortControl.signal} )
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
  }, []);

  function initData(data) {
    setGroups(data);
    setLen(data.length);
    setId(data[data.length - 1].id);
  };

   function handleSelect(id) {
     setSelectedId(id);
   }

  const handleSubmit= (e) => {
    const newGroup = { title, tasks };

    setIsPending(true);

    fetch(`http://localhost:8000/groups/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newGroup)
    }).then(( ) => {
      setIsPending(false);
      console.log(`Group added`);
    })
  }

  return (
    <>
      <h2 className="group_header"> Groups </h2>
      { error && <div className="__error"> {error} </div> }
      {groups && <>
        <div className="Task__groups">
          {groups.map((item) => (
            <Group key={item.id}
              group={item}
              selectedId={selectedId}
              handleSelect={handleSelect}/>
          ))}
          <form
            className="button __add_group"
            onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add new group..."
              onChange={(e) => {e.target.value ? setTitle(e.target.value) : setTitle("New Group")}}/>
            { !isPending &&
              <button className="button_control">
                <img src={plus} className="plus_img" alt="+" />
              </button>
            }
            { isPending &&
              <button disabled className="button_control">
                <img src={plus} className="plus_img" alt="+" />
              </button>
            }
          </form>
        </div>
      </>}
    </>
  );
}

export { GroupsList }