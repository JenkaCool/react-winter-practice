import plus from '../imges/plus.svg';
import Group from './Group';

import { groups, isPending, handleDragOver, handleDropTask } from '../handleTaskDrag';

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
  const [title, setTitle] = useState(null);
  const [tasks, setTasks] = useState([]);

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
      .catch(error => {
        if (error.name === 'AbortError')
          console.log('Fetched aborted')
        else {
          setIsPending(false);
          setError(error.message);
        }
      })
      return () => abortControl.abort();
  }, []);

  function initData(data) {
    setGroups(data);
    setLen(data.length);
    setId(data[data.length - 1].id + 1);
  };

/*
  function handleDropTask(e, group) {
    group.task.push(currentTask)
    const currentIndex = currentGroup.tasks.findIndex(currentTask)
    currentGroup.tasks.splice(currentIndex, 1);

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

handleDragOver={(e) => handleDragOver(e)}
handleDropTask={(e) => handleDropTask(e, group)}

*/

  const handleSubmit= (e) => {
    e.preventDefault();
    if (!title)
      setTitle(`New group ${len}`);
    const newGroup = { title, tasks };

    setIsPending(true);

    fetch(`http://localhost:8000/groups/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newGroup)
    }).then(( ) => {
      console.log(`New blog added`);
      setIsPending(false);
    })
  }

  return (
    <>
      <h2 className="group_header"> Groups </h2>
      { error && <div className="__error"> {error} </div> }
      { isPending && <div className="__loading"> Loading... </div> }
      {groups && <>
        <div className="Task__groups">
          {groups.map((item) => (
            <Group key={item.id}
              group={item}
              groupId={groupId}/>
          ))}
          <form
            className="button __add_group"
            onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add new group..."
              onChange={(e) => setTitle(e.target.value)}/>
            <button className="button_control">
              <img src={plus} className="plus_img" alt="+" />
            </button>
          </form>
        </div>
      </>}
    </>
  );
}

export { GroupsList }