import plus from '../imges/plus.svg';
import Group from './Group';

import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';

const GroupsList = () => {
  const { groupId } = useParams();

  const [groups, setGroups] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState(null);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8000/groups/`)
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
        setIsPending(false);
        setError(error.message);
      })
  }, [groupId]);

  function initData(data) {
    setGroups(data);
  };

  return (
    <>
      <h2 className="group_header"> Groups </h2>
      { isPending && <div className="__loading"> Loading... </div> }
      {groups && <>
        <div className="Task__groups">
          {groups.map((item) => (
            <Group key={item.id} group={item} groupId={groupId}/>
          ))}
          <div className="button __add_group">
            <img src={plus} className="plus_img" alt="+" />
            <span>Add group...</span>
          </div>
        </div>
      </>}
    </>
  );
}

export { GroupsList }