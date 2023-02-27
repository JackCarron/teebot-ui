import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { HashRouter, Route, Switch } from 'react-router-dom';
import TeebotTeeTimeSelector from './components/TeebotTeeTimeSelector';
import { ContactPreference, User } from './types/User';
import CreateUser from './components/CreateUser';

const user: User = {
  userId: 'john.jack.carron@gmail.com',
  contactPreference: ContactPreference.EMAIL,
  email: 'john.jack.carron@gmail.com',
  password: 'test123'
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <HashRouter>
      <Switch>
        <Route path="/login" component={() => <Login />} />
        <Route path="/register" component={() => <CreateUser />} />
        <Route path="/time-selector" component={() => <TeebotTeeTimeSelector user={user}/>} />
      </Switch>
    </HashRouter>
      </header>
    </div>
  );
}

export default App;
