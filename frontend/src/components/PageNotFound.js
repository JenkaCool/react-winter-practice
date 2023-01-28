import React from 'react'
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page-content not-found center-page-align inside-padding">
      <h1> #404 Oh, no!  </h1>
      <h2> This page not found. </h2>
      <br></br>
      <p> An error has occurred! Don't worry, we've already assigned this task to our best robot. </p>
      <br></br>
       <Link to="/" className="page-link"> Return to home page </Link>
    </div>
  );
}

export { PageNotFound }