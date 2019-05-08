import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';


class Navigator extends Component {
    render() {
      return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler navbar-toggler-right" type="button"
      data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
      aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand" to="/Home">Home</Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/CustomerList">Customer</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/TrainingsList">Training</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/Calendar">Calendar</Link>
        </li>
        </ul>
        </div>
        </nav>
        );
    }
}

export default Navigator;