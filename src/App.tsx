import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ContactPreference, User } from './types/User';
import CreateUser from './components/CreateUser';
import LandingPage from './components/LandingPage';
import TeebotTeeTimeSelector from './components/TeebotTeeTimeSelector';
import LoginRegister from './components/LoginRegister';
import UserHome from './components/UserHome';
import { Dashboard } from './components/Dashboard';
import { Bookings } from './components/Bookings';
import TeebotSearchWizard from './components/TeebotSearchWizard';

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
        <Route path="/login_or_register" component={() => <LoginRegister />} />
        <Route path="/login" component={() => <Login />} />
        <Route path="/register" component={() => <CreateUser />} />
        <Route path="/user_home" component={() => <UserHome user={user}/>} />
        <Route path="/search" component={() => <TeebotTeeTimeSelector user={user}/>} />
        <Route path="/searchV2" component={() => <TeebotSearchWizard />} />
        <Route path="/teebot-times" component={() => <Dashboard />} />
        <Route path="/bookings" component={() => <Bookings />} />
        <Route path="/" component={() => <LandingPage />} />
      </Switch>
    </HashRouter>
      </header>
    </div>
  );
}

export default App;
