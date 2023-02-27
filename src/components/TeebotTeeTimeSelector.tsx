import React, { FormEvent, useEffect, useState } from 'react';
import { User } from '../types/User';
import { BASE_API_URL } from '../constants';
import SelectComponent from './SelectComponent';
import { v4 as uuidv4 } from 'uuid';
import './styles.css';

export interface TeebotTime {
  teeBotId: string;
  teeBotCourse: string;
  teeBotDate: string;
  teeBotStartTime: string;
  teeBotTimeEndTime: string;
  // foreign key: User.userId
  userId: string;
}

interface TeebotTeeTimeSelectorProps {
  user: User;
}

const getUserTeeTimes = (user: User) :TeebotTime[] => {
  return [];
}

const defaultState: TeebotTime = {teeBotId: uuidv4(), teeBotCourse: 'Los Verdes', teeBotDate:'', teeBotStartTime: '', teeBotTimeEndTime: '', userId: ''};

const getTeeBotListByUserId = async (userId: string) => {
  try {
    const response = await fetch(BASE_API_URL + `teebottime?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

const deleteTeeBotId = async (teebotId: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}teebottime/${teebotId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

const TeebotTeeTimeSelector = ({user}: TeebotTeeTimeSelectorProps) => {
  const [state, setState] = useState<TeebotTime>({...defaultState, userId: user.userId});
  const [selectedTeeTimes, setSelectedTeeTimes] = useState<TeebotTime[]>([]);

  const handleStateChange = (event: any) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });  
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    saveTeeBotTime();
    setSelectedTeeTimes([...selectedTeeTimes, {...state}]);
  };

  useEffect(() => {
    getTeeBotListByUserId(user.userId).then(selectedTeeTimes => {
      setSelectedTeeTimes(selectedTeeTimes);
      setState({...defaultState, userId: user.userId});
    }); 
  }, [user])

  const handleDelete = (index: number): void => {
    deleteTeeBotId(selectedTeeTimes[index].teeBotId)
    selectedTeeTimes.splice(index, 1);
    console.log(selectedTeeTimes);
    setSelectedTeeTimes([...selectedTeeTimes]);
  }

  const saveTeeBotTime = async () => {
    try {
      const response = await fetch(BASE_API_URL + 'teebottime', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(state)
        });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
 
  return (
    <div>
      <header>
        <p>Hello {user.userId}</p>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
        <p>Select your date, time and course that you would like to scrape:</p>
        <label htmlFor="course-selector">Select a course:</label>
        <div>
          <SelectComponent
            name='teeBotCourse'
            options={['Los Verdes', 'Aguila']}
            value={state.teeBotCourse}
            onChange={handleStateChange}>
          </SelectComponent>
        </div>
        <label htmlFor="date-selector">Select a date:</label>
        <input
          type="date"
          id="date-selector"
          name="teeBotDate"
          value={state.teeBotDate}
          onChange={handleStateChange}
        />
        <input
          type="time"
          id="time-selector"
          name="teeBotStartTime"
          value={state.teeBotStartTime}
          onChange={handleStateChange}
        />
        <input
          type="time"
          id="time-selector"
          name="teeBotTimeEndTime"
          value={state.teeBotTimeEndTime}
          onChange={handleStateChange}
        />
        <button type="submit">Submit</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {selectedTeeTimes.map((row, index) => (
              <tr key={index}>
                <td>{row.teeBotCourse}</td>
                <td>{row.teeBotDate}</td>
                <td>{row.teeBotStartTime}</td>
                <td>{row.teeBotTimeEndTime}</td>
                <td><button onClick={() => {handleDelete(index)}}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <button onClick={saveTeeBotTime}>Save Tee Bot Time List</button>
    </div>
  );
};

export default TeebotTeeTimeSelector;
