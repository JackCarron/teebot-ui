import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import './styles.css';
import './userhome.css';
import TeebotLogo from '../images/Teebot.png';
import { Auth } from 'aws-amplify';

const UserHome: React.FC = () => {
  const [currentAuthUser, setCurrentAuthUser] = useState<any>({});
  
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((currentAuthUser) => {
      setCurrentAuthUser({...currentAuthUser, userId: currentAuthUser.username});
    });
  }, [Auth]);
  
  return (
    <div>
    <div>
        <img className="teebotLogo" src={TeebotLogo}></img>
        <h4>Welcome, {currentAuthUser.userId}!</h4>
        {/* Add more content specific to the user home page */}
    </div>
    <div className="container">
    <a href="/#/search">
    <section className="section">
        <h2>Setup Teebot Times ⛳</h2>
        <p>Setup teebot to look for teetimes while you're away</p>
    </section>
    </a>

    <a href="/#/teebot_times">
    <section className="section">
        <h2>Teebot Time Dashboard 🕤</h2>
        <p>View previously configured teetimes</p>
    </section>
    </a>

    <a href="/#/bookings">
    <section className="section">
        <h2>Review Your Bookings 📖</h2>
        <p>View verified teebot bookings</p>
    </section>
    </a>
    </div>
    </div>
  );
};

export default UserHome;
