import React from "react";
import { useState, useEffect } from 'react';
import { Link, Routes, Route, } from "react-router-dom";

import './App.css';
import { Start } from './components/Start';
import { TasksList } from './components/TasksList';
import { GroupsList } from './components/GroupsList';
import { PageNotFound } from './components/PageNotFound';


function App() {
  return (
    <div className="App">
      <div className="Top_bar"></div>
      <div className="Sidebar">
        <GroupsList/>
      </div>
      <div className="Content">
        <Routes>
          <Route exact path='/' element={<Start/>}/>
          <Route path='/groups/:groupId' element={<TasksList/>}/>
          <Route path='/*' element={<PageNotFound/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;