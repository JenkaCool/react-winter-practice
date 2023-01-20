import plus from '../imgs/plus.svg';

import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

const GroupsList = (props) => {
  const groupItems = props.groupItems;
//  const title = props.groupTitle;
//  <h2> { title } </h2>

  return (
    < >
      <h2 className="group_header"> Groups </h2>
        <div className="Task__groups">
          {groupItems.map((item) => (
            <Form.Group key={item.id} className="Task__group">
              <Form.Control type="text" value={item.header} readOnly/>
              <div className="button_small __menu">...</div>
            </Form.Group>
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