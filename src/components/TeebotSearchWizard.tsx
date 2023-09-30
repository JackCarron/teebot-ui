import React, { useEffect, useState } from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import SelectComponent from './SelectComponent';
import { TeebotSearchParam } from './TeebotTeeTimeSelector';
import { getConfig, getEmptyTeebotSearchParm, getTeebotCoursesFromConfig, saveTeebotTime } from '../utils/teebotUtil';
import './teebotsearchwizard.css';
import { Auth } from 'aws-amplify';

interface Field {
  label: string;
  name: string;
  type: string;
  options?: any[];
  required?: boolean;
}

const MAX_STEP = 3;

const TeebotSearchWizard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [teebotSearchParam, setTeebotSearchParam] = useState<TeebotSearchParam>(getEmptyTeebotSearchParm());
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((currentAuthUser) => {
      setTeebotSearchParam({...teebotSearchParam, 
        userId: currentAuthUser.username});
    });
    getConfig().then(config => {
      setConfig(config);
    });
  }, [getConfig, Auth])

  const pages = [
    {
      id: 1,
      title: 'Setup TeeBot Search',
      fields: [
        {
          label: 'Select your favorite course',
          name: 'teebotCourse',
          type: 'select',
          options: getTeebotCoursesFromConfig(config),
          required: true,
        },
      ],
    },
    {
      id: 2,
      title: 'Teetime Details:',
      fields: [
        {
          label: 'Date:',
          name: 'teebotDate',
          type: 'date',
          required: true,
        },
        {
          label: 'Number of Players:',
          name: 'teebotNumberOfPlayers',
          type: 'select',
          options: [{label: '# of Players', value: 'NO_PLAYERS_SELECTED'}, {label: '1', value: '1'}, {label: '2', value: '2'}, 
          {label: '3', value: '3'}, {label: '4', value: '4'}],
          required: true,
        },
        {
          label: 'Number of Holes:',
          name: 'teebotNumberOfHoles',
          type: 'select',
          options: [{label: '# of Holes', value: 'NO_HOLES_SELECTED'}, {label: '9', value: '9'}, {label: '18', value: '18'}],
          required: true,
        },
        {
          label: 'Earliest Time:',
          name: 'teebotStartTime',
          type: 'time',
          required: true,
        },
        {
          label: 'Latest Time:',
          name: 'teebotEndTime',
          type: 'time',
          required: true,
        },
        {
          label: 'Min Price:',
          name: 'teebotMinPrice',
          type: 'number',
          required: true,
        },
        {
          label: 'Max Price:',
          name: 'teebotMaxPrice',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      id: 3,
      title: 'Review Teebot Search',
      fields: [
        {
          label: 'Course Name',
          name: 'teebotCourse',
          type: 'select',
          options: getTeebotCoursesFromConfig(config),
          required: true,
        },
        {
          label: 'Date:',
          name: 'teebotDate',
          type: 'date',
          required: true,
        },
        {
          label: 'Number of Players:',
          name: 'teebotNumberOfPlayers',
          type: 'select',
          options: [{label: '# of Players', value: 'NO_PLAYERS_SELECTED'}, {label: '1', value: '1'}, {label: '2', value: '2'}, 
          {label: '3', value: '3'}, {label: '4', value: '4'}],
          required: true,
        },
        {
          label: 'Earliest Time:',
          name: 'teebotStartTime',
          type: 'time',
          required: true,
        },
        {
          label: 'Latest Time:',
          name: 'teebotEndTime',
          type: 'time',
          required: true,
        },
        {
          label: 'Min Price:',
          name: 'teebotMinPrice',
          type: 'number',
          required: true,
        },
        {
          label: 'Max Price:',
          name: 'teebotMaxPrice',
          type: 'number',
          required: true,
        },
      ],
    },
  ];

  const showPage = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const nextPage = (): void => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTeebotSearchParam((prevTeebotState) => ({
      ...prevTeebotState,
      [name]: value,
    }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setTeebotSearchParam((prevTeebotState) => ({
      ...prevTeebotState,
      [name]: value,
    }));
  }

  const submitForm = (): void => {
    // Here, you can perform form validation and submission
    saveTeebotTime(teebotSearchParam);
    setCurrentPage(currentPage + 1);
  };

  const currentPageData = pages.find((page) => page.id === currentPage);

  return (
    <div>
      <h2>{currentPage > 1 ? config.TeebotCourses[teebotSearchParam.teebotCourse].courseName : undefined}</h2>
      <h2>{currentPageData?.title}</h2>
      
      {currentPage <= MAX_STEP ? (<form>
        {currentPageData?.fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'select' ? 
             <SelectComponent
             name={field.name}
             options={(field as Field)?.options ?? []}
             value={teebotSearchParam[field.name]}
             onChange={handleSelect}
             disabled={currentPage === MAX_STEP} />
            : <input
              type={field.type}
              id={field.name}
              name={field.name}
              required={field.required}
              value={teebotSearchParam[field.name]}
              onChange={handleChange}
              disabled={currentPage === MAX_STEP}
            />}
          </div>
        ))
        }

        <button type="button" onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {currentPage < pages.length ? (
          <button type="button" onClick={nextPage}>
            Next
          </button>
        ) : (
          <button type="button" onClick={submitForm}>
            Submit
          </button>
        )}
      </form>)
      : (
        <div className="teeBotSubmissionMessage">
        <h2 className="teeBotSubmissionMessage-title">Congratulations!</h2>
        <p className="teeBotSubmissionMessage-text">Thanks for submitting a Teebot time. We are working diligently to find you a tee time. 🚀</p>
        <p className="teeBotSubmissionMessage-button">
          <a href="/#/user_home">User Home</a>
        </p>
        <p className="teeBotSubmissionMessage-button">
          <a href="/#/teebot_times">Dashboard</a>
        </p>
      </div>
        )}

      <ProgressBar
        percent={(currentPage / 3 * 100)}
        filledBackground={currentPage >  3 ? "#0ed600" : "linear-gradient(to right, #0ed600, #fff)"}
      >
<Step transition="scale">
          {() => (
            <div style={{ filter: 
              `grayscale(${currentPage >= 1 ? 0 : 80}%)` 
            }}>⛳</div>
          )}
        </Step>
        <Step transition="scale">
          {() => (
            <div style={{ filter: 
              `grayscale(${currentPage >= 2 ? 0 : 80}%)` 
            }}>🤖</div>
          )}
        </Step>
        <Step transition="scale">
          {() => (
            <div style={{ filter: 
              `grayscale(${currentPage >= 3 ? 0 : 80}%)` 
            }}>🏌️</div>
          )}
        </Step>
      </ProgressBar>
      </div>
  );
};

export default TeebotSearchWizard;
