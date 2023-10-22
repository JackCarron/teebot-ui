import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Box, Container, Typography, Button } from '@mui/material';
import Dashboard from '../views/dashboard/Dashboard';

const UserHome: React.FC = () => {
  const [currentAuthUser, setCurrentAuthUser] = useState<any>({});

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((currentAuthUser) => {
      setCurrentAuthUser({ ...currentAuthUser, userId: currentAuthUser.username });
    });
  }, []);

  return (
    
    <div className="user-home">
      <Dashboard></Dashboard>
    </div>
  );
};

export default UserHome;
