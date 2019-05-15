import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigator from './Components/Navigator'
import CustomerList from './Components/CustomerList';
import TrainingsList from './Components/TrainingsList';
import "react-table/react-table.css";
import './App.css';
import Calendar from './Components/Calendar';

class App extends Component {
  render() {
  return (
    <div className="App">
    <header className="App-header">
    <h1>Personal Trainers Co.</h1>
    <legend>Create and Custom your Trainings</legend>
    </header>
    <BrowserRouter>
      <Navigator />
      <Switch>
        <Route exact path="/" component={CustomerList} />
        <Route path="/CustomerList" component={CustomerList} />
        <Route path="/TrainingsList" component={TrainingsList} />
        <Route path="/Calendar" component={Calendar} />
      </Switch>
    </BrowserRouter>
  </div>
  );
}
}

export default App;
