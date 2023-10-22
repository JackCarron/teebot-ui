import { Auth } from 'aws-amplify';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { ContactPreference, User } from '../types/User';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import './createuser.css';
import './styles.css';
import { Alert, AlertColor, Button, IconButton } from '@mui/material';
import { TurnLeft } from '@mui/icons-material';

interface AlertState {
  isShowing: boolean;
  severity?: string;
  alertText?: string;
}

function CreateUser() {
  const history = useHistory();
  const [user, setUser] = useState<User>({
    userId: '',
    contactPreference: ContactPreference.EMAIL,
    email: '',
    password: '',
    otp: ''
  });
  const [showOTP, setShowOTP] = useState(false);
  const [alertState, setAlertState] = useState<AlertState>({isShowing: false, alertText: '', severity: ''});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const signUpResponse = await Auth.signUp({
        username: user.userId,
        password: user.password,
        attributes: {
          email: user.email
        },
      });
      setShowOTP(true);
      setAlertState({
        isShowing: true,
        alertText: `Your Username and Password was expected. Please visit your email (${user.email}) to see OTP`,
        severity: 'info'
      });
    } catch (error) {
      if (error instanceof Error) {
        setAlertState({
          isShowing: true,
          alertText: error.message,
          severity: 'error'
        });
      } else {
        setAlertState({
          isShowing: true,
          alertText: 'An unexpected error occured, please refresh the page and try again or contact our support',
          severity: 'error'
        });
      }
    }
  }

  const submitOtp = () => {
    const otpResponse = Auth.confirmSignUp(user.userId, user.otp ?? '');
    history.push('/login');
    console.log(otpResponse);
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setAlertState({
      isShowing: false
    });
  };
  

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="CreateUser">
      <Snackbar
        open={alertState.isShowing}
        autoHideDuration={20000}
        onClose={handleClose}
        message={alertState.alertText} // Display the error message
        action={action}
      > 
        <Alert severity={alertState.severity as AlertColor ?? 'error'}>{alertState.alertText}</Alert>
      </Snackbar>
      <div>
        <h3>Create Account</h3>
      </div>
      <form className="CreateUser-form" onSubmit={handleSubmit}>
        <label>
          UserId:
          <input type="text" name="userId" value={user.userId} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={user.password} onChange={handleChange} />
        </label>
        {showOTP ?
          <><label>
            OTP:
            <input type="text" name="otp" value={user.otp} onChange={handleChange} />
          </label><button className="CreateUser-otpButton" onClick={submitOtp}>Submit OTP</button></>
          : undefined}
        <p></p>
        {!showOTP ? <button type="submit">Create User</button> : undefined}
      </form>
      <div>
        <a className='login-page-button' href="/#/login"><u>Already have an account? Click here</u></a>
      </div>
    </div>
  );
}

export default CreateUser;
