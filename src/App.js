import React from 'react';
import {makeStyles} from "@material-ui/core";
import './App.css';
import ButtonAppBar from "./components/ButtonAppBar";
import TasksList from "./containers/TaskList";
import Task from "./containers/Task";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const useStyles = makeStyles(() => ({
  rootContainer: {
    margin: '0 auto 0 auto ',
    maxWidth: 800,
    minWidth: 375,
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <ButtonAppBar/>
      <Router >
        <div className={classes.rootContainer}>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/newTask">
              <Task  winType = {true}/>
            </Route>
            <Route path="/tasks/:id">
              <Task  winType = {false}/>
            </Route>
            <Route path="/">
              <TasksList />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
