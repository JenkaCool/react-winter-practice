import plus from '../imges/plus.svg';
import wastebasket from '../imges/wastebasket.svg';

import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';


const Group = ({group, selectedId, handleSelect}) => {
  const navigate = useNavigate();

  function changeTaskStatus(taskId)  {
    console.log('Status changed');
  }

  function printMessage() {
    console.log('Field changed');
  }

  const handleRemoveGroup = (id) => {
    fetch(`http://localhost:8000/groups/${id}`,{
      method: 'DELETE',
    }).then(() => {
      console.log(`Group deleted`);
      if (selectedId === id) {
        navigate('/');
      }
    })

 /*    var currentGroup = [];
     if (selectedId === groupId) {
       var id = currentGroup.findIndex(item => item.id === groupId);
       var newId = selectedId === groupId ? 1 : selectedId;
     }
*/
/*
     currentGroup = groups.filter(item => item.id !== groupId);
     setGroups(currentGroup);
 */
  }

  return (
    <div className="Task__group">
      <div onClick={() =>handleSelect(group.id)}>
        <Link className="button-link" to={`groups/${group.id}` }>
        {console.log(group.id)}
        {console.log(selectedId)}
        <div key={group.id}
          className={`button ${group.id === selectedId ? "__selected-group" : "" }`}>
          {group.title}
        </div>
        </Link>
      </div>
      <button className="button_control" onClick={() => handleRemoveGroup(group.id)}>
        <img src={wastebasket} className="wastebasket_img" alt="Remove task" />
      </button>
    </div>
  );
}

export default Group;