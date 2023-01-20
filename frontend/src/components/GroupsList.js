import plus from '../imgs/plus.svg';

import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

const GroupsList = (props) => {
  const groupItems = props.groupItems;

  const [selectedGroupId, setSelectedGroupId] = useState(1);

  function selectGroup(groupId) {
    setSelectedGroupId(groupId);
    console.log(groupId);
  }

  return (
    < >
      <h2 className="group_header"> Groups </h2>
        <div className="Task__groups">
          {groupItems.map((item) => (

            <div className="Task__group">
              <div key={item.id}
                   className={item.id === selectedGroupId ? "button __selected-group" : "button" }
                   onClick={() => selectGroup(item.id)}>
                {item.header}
              </div>
              <div className="button_small __menu">...</div>
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