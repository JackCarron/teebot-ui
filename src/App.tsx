import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import { HashRouter, Route, Switch, useLocation } from 'react-router-dom';
import { ContactPreference, User } from './types/User';
import CreateUser from './components/CreateUser';
import LandingPage from './components/LandingPage';
import LoginRegister from './components/LoginRegister';
import UserHome from './components/UserHome';
// import { Dashboard } from './components/Dashboard';
import { Bookings } from './components/Bookings';
import { Dashboard } from './components/Dashboard';

const user: User = {
  userId: 'john.jack.carron@gmail.com',
  contactPreference: ContactPreference.EMAIL,
  email: 'john.jack.carron@gmail.com',
  password: 'test123'
}

interface AppHeader {
  appHeaderClass: string;
  appHeaderImageClass: string;
}

const AppHeaderStyles: { [key: string] : AppHeader } =
{ 
  APP_HEADER_CENTER_LARGE: {
    appHeaderClass: 'App-header-center',
    appHeaderImageClass: 'App-header-image-lg'
  },
  APP_HEADER_CENTER_SMALL: {
    appHeaderClass: 'App-header-center',
    appHeaderImageClass: 'App-header-image-sm'
  },
  APP_HEADER_LEFT_LARGE: {
    appHeaderClass: 'App-header-left',
    appHeaderImageClass: 'App-header-image-lg'
  },
  APP_HEADER_LEFT_SMALL: {
    appHeaderClass: 'App-header-left',
    appHeaderImageClass: 'App-header-image-sm'
  },
  APP_HEADER_NONE: {
    appHeaderClass: 'App-header-none',
    appHeaderImageClass: 'App-header-image-none'
  }
}

const pathToHeaderMap: {[key: string]: AppHeader} = {
  '/': AppHeaderStyles.APP_HEADER_CENTER_LARGE,
  '/user_home': AppHeaderStyles.APP_HEADER_NONE,
  'default': AppHeaderStyles.APP_HEADER_LEFT_SMALL
}

function App() {
  const location = useLocation();
  const headerForPage: AppHeader = pathToHeaderMap[location.pathname] ?? 
    pathToHeaderMap['default'];
  return (
    <div className="App">
      <div className="App-wrapper">
      {headerForPage === AppHeaderStyles.APP_HEADER_NONE ? '' : <header className={headerForPage.appHeaderClass}>
        <p>
          <a href="/#/">
            <img className={headerForPage.appHeaderImageClass} src="https://see.fontimg.com/api/renderfont4/nRpjJ/eyJyIjoiZnMiLCJoIjoxMzAsInciOjIwMDAsImZzIjo2NSwiZmdjIjoiIzAwMDAwMCIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/VGVlYm90/kerney-script-personal-use-regular.png" alt="Jersey fonts" />
          </a>
        </p>
      </header>
      }
      <div className="App-body">
      <Switch>
        <Route path="/register" component={() => <CreateUser />} />
        <Route path="/login" component={() => <Login />} />
        <Route path="/user_home" component={() => <Dashboard/>} />
        <Route path="/teebot_times" component={() => <Dashboard />} />
        <Route path="/bookings" component={() => <Bookings />} />
        <Route path="/" component={() => <LandingPage />} />
      </Switch>
      </div>
      </div>

    </div>
  );
}

export default App;
