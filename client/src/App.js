/*
JOSEPH P. PASAOA
Client App MAIN Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS & LOCALS */
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingPage from './components/LoadingPage';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import AddShowForm from './pages/AddShowForm';
import UserProfile from './pages/UserProfile';
import UsersList from './pages/UsersList';
import UserShowProfile from './pages/UserShowProfile';
import ShowsList from './pages/ShowsList';
import About from './pages/About';


/* MAIN */
const App = () => {
  const [ isDoneLoading, setIsDoneLoading ] = useState(true);
  return (
    <div className="App">
      <ErrorBoundary>
        <div id="stage--padding-right">
          <div id="stage--column-flex">
            <Switch>
              <Route path={`/users/:id/addShow`} component={AddShowForm} />
              <Route path={`/users/:id`} render={(setIsDoneLoading) => <UserProfile setIsDoneLoading={setIsDoneLoading} />} />
              <Route path={`/users`} component={UsersList} />
              <Route path={`/shows/:show_id/user/:user_id`} component={UserShowProfile} />
              <Route path={`/shows`} component={ShowsList} />
              <Route path={`/about`} component={About} />
              <Route path={`/`} component={Home} />
            </Switch>
            <LoadingPage isDoneLoading={isDoneLoading} />
          </div>
        </div>
      </ErrorBoundary>
      <NavBar />
    </div>
  );
}


export default App;
