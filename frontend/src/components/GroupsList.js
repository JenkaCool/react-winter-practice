import plus from '../imges/plus.svg';
import wastebasket from '../imges/wastebasket.svg';

import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

const GroupsList = ({groupItems, groupId, handleChangeGroup, handleRemoveGroup}) => {
  return (
    < >
      <h2 className="group_header"> Groups </h2>
        <div className="Task__groups">
          {groupItems.map((item) => (

            <div className="Task__group">
              <div key={item.id}
                   className={item.id === groupId ? "button __selected-group" : "button" }
                   onClick={() => handleChangeGroup(item.id)}>
                {item.title}
              </div>
              <button className="button_control" onClick={() => handleRemoveGroup(item.id)}>
                <img src={wastebasket} className="wastebasket_img" alt="Remove task" />
              </button>
            </div>
        ))}
        <div className="button __add_group">
        <img src={plus} className="plus_img" alt="+" />
          <span>Add group...</span>
        </div>
      </div>
    </>
  );
}

export default GroupsList;