import plus from '../imges/plus.svg';

import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

const GroupsList = ({groupItems, groupId, handelChangeGroup}) => {
  return (
    < >
      <h2 className="group_header"> Groups </h2>
        <div className="Task__groups">
          {groupItems.map((item) => (

            <div className="Task__group">
              <div key={item.id}
                   className={item.id === groupId ? "button __selected-group" : "button" }
                   onClick={() => handelChangeGroup(item.id)}>
                {item.title}
              </div>
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