import React, { FormEvent, useEffect, useState } from 'react';
import { User } from '../types/User';
import { API_NAME } from '../constants';
import SelectComponent from './SelectComponent';
import { v4 as uuidv4 } from 'uuid';
import './styles.css';
import { Auth, API } from 'aws-amplify';
import { TeebotSearchParamTable } from './TeebotSearchParamTable';

export interface TeebotSearchParam {
  teebotSearchParamId: string;
  teebotCourse: string;
  teebotNumberOfHoles: string;
  teebotDate: string;
  teebotStartTime: string;
  teebotEndTime: string;
  teebotMaxPrice: string;
  teebotMinPrice: string;
  userId: string;
  teebotNumberOfPlayers: string;
  [key: string]: string;
}

interface TeebotTeeTimeSelectorProps {
  user: User;
}

const defaultState: TeebotSearchParam = {
  teebotSearchParamId: uuidv4(),
  teebotCourse: "",
  teebotNumberOfHoles: "",
  teebotDate: "",
  teebotStartTime: "",
  teebotEndTime: "",
  teebotMaxPrice: "",
  teebotMinPrice: "",
  userId: "",
  teebotNumberOfPlayers: ""
};


const getTeebotListByUserId = async (userId: string) => {
  try {
    const response = await API.get(API_NAME, `/teebot-search-params?userId=${userId}`, {
      headers: {Authorization: `Bearer ${await (await Auth.currentSession()).getIdToken().getJwtToken()}`?? ''}
    });
    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
  }
}

const getConfig = async () => {
  try {
    const response = await API.get(API_NAME, `/config`, {
      headers: {Authorization: `Bearer ${await (await Auth.currentSession()).getIdToken().getJwtToken()}`?? ''}
    });
    const data = await response;
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

const TeebotTeeTimeSelector = ({user}: TeebotTeeTimeSelectorProps) => {
  const [state, setState] = useState<TeebotSearchParam>({...defaultState, userId: ''});
  const [selectedTeeTimes, setSelectedTeeTimes] = useState<TeebotSearchParam[]>([]);
  const [config, setConfig] = useState<any>({});

  const handleStateChange = (event: any) => {
    const { name, value } = event.target;
    console.log(event);
    console.log(event.target);
    console.log(name);
    console.log(value);
    setState({ ...state, [name]: value });  
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    saveTeebotTime();
    setSelectedTeeTimes([...selectedTeeTimes, {...state}]);
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((currentAuthUser) => {
      getTeebotListByUserId(currentAuthUser.username).then(selectedTeeTimes => {
        setSelectedTeeTimes(selectedTeeTimes);
        setState({...defaultState, userId: currentAuthUser.username});
      });
    })
      getConfig().then(config => {
        setConfig(config);
      })
  }, []);

  const saveTeebotTime = async () => {
    try {
      const response = await API.post(API_NAME, `/teebot-search-params`, {
        headers: {Authorization: `Bearer ${await (await Auth.currentSession()).getIdToken().getJwtToken()}`?? ''},
        body: state
      });
      const data = await response;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const getTeebotCoursesFromConfig = (configFromUI: any): any[] => {
    console.log(configFromUI);
    let teebotCourses = [{label: 'Pick a Course', value: 'NO_COURSE_SELECTED'}];
    if(configFromUI['TeebotCourses'] === undefined) return [];
    teebotCourses.push(...Object.keys(configFromUI['TeebotCourses']).map(teebotCourseKey => {
      return {
        label: configFromUI['TeebotCourses'][teebotCourseKey]['courseName'],
        value: teebotCourseKey
      }
    }));
    return teebotCourses;
  }
 
  return (
    <div>
      <header>
        <p>Hello {state.userId}</p>
      </header>
      <section>
        <form className='form-container' onSubmit={handleSubmit}>
        <p>Select your date, time and course that you would like to scrape:</p>
        <label htmlFor="course-selector">Select a course:</label>
        <div className='form-field'>
          <SelectComponent
            name='teebotCourse'
            options={getTeebotCoursesFromConfig(config)}
            value={state.teebotCourse}
            onChange={handleStateChange}>
          </SelectComponent>
        </div>
        <label htmlFor="number-of-holes">Number of holes:</label>
        <div className='form-field'>
          <SelectComponent
            name='teebotNumberOfHoles'
            options={[{label: '# of holes', value: 'NO_HOLES_SELECTED'}, {label: '9', value: '9'}, {label: '18', value: '18'}]}
            value={state.teebotNumberOfHoles}
            onChange={handleStateChange}>
          </SelectComponent>
        </div>
        <label htmlFor="number-of-players">Number of players:</label>
        <div className='form-field'>
          <SelectComponent
            name='teebotNumberOfPlayers'
            options={[{label: '# of Players', value: 'NO_PLAYERS_SELECTED'}, {label: '1', value: '1'}, {label: '2', value: '2'}, 
            {label: '3', value: '3'}, {label: '4', value: '4'}]}
            value={state.teebotNumberOfPlayers}
            onChange={handleStateChange}>
          </SelectComponent>
        </div>
        <label htmlFor="date-selector">Select a date:</label>
        <input
          type="date"
          id="date-selector"
          className='form-field'
          name="teebotDate"
          value={state.teebotDate}
          onChange={handleStateChange}
        />
        <label htmlFor="start-time-selector">Select a start time:</label>
        <input
          type="time"
          id="start-time-selector"
          className='form-field'
          name="teebotStartTime"
          value={state.teebotStartTime}
          onChange={handleStateChange}
        />
        <label htmlFor="end-time-selector">Select a end time:</label>
        <input
          type="time"
          id="end-time-selector"
          className='form-field'
          name="teebotEndTime"
          value={state.teebotEndTime}
          onChange={handleStateChange}
        />
        <label htmlFor="min-price-selector">Minimum Price:</label>
        <input
          type="text"
          id="min-price-selector"
          className='form-field'
          name="teebotMinPrice"
          value={state.teebotMinPrice}
          onChange={handleStateChange}
        />
        <label htmlFor="min-price-selector">Maximum Price:</label>
        <input 
          type="text"
          id="max-price-selector"
          className='form-field'
          name="teebotMaxPrice"
          value={state.teebotMaxPrice}
          onChange={handleStateChange}
        />
        <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default TeebotTeeTimeSelector;
