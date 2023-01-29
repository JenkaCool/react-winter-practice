import plus from '../imges/plus.svg';
import wastebasket from '../imges/wastebasket.svg';

import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';


const Group = ({group, groupId}) => {
  const navigate = useNavigate();


  function changeTaskStatus(taskId)  {
    console.log('Status changed');
  }

  function printMessage() {
    console.log('Field changed');
  }

  const handleRemoveGroup = (id) => {
    console.log('Remove');
    fetch(`http://localhost:8000/groups/${id}`,{
      method: 'DELETE',
    }).then(() => {
      if (groupId === id) {
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
      <Link className="button-link" to={`groups/${group.id}` }>
      {console.log(group.id)}
      {console.log(groupId)}
      <div key={group.id}
        className={`button ${group.id === groupId ? "__selected-group" : "" }`}>
        {group.title}
      </div>
      </Link>
      <button className="button_control" onClick={() => handleRemoveGroup(group.id)}>
        <img src={wastebasket} className="wastebasket_img" alt="Remove task" />
      </button>
    </div>
  );
}

export default Group;