import plus from '../imges/plus.svg';
import wastebasket from '../imges/wastebasket.svg';

import { useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import Form from 'react-bootstrap/Form';


const Group = ({group, groupId}) => {

  function changeTaskStatus(taskId)  {
    console.log('Status changed');
  }

  function printMessage() {
    console.log('Field changed');
  }

  const handleRemoveGroup = (groupId) => {
    console.log('Remove');
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

  const handleChangeGroup = (id) => {
    console.log('Change');
    //console.log(id);
     /*---
    updateSelectedGroupData(groups, id);
     */
  }

  return (
    <div className="Task__group">
      <Link className="button-link" to={`groups/${group.id}` }>
      <div key={group.id}
        className={group.id === groupId ? "button __selected-group" : "button" }>
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