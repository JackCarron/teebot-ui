import React, { useState } from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import SelectComponent from './SelectComponent';

interface FormData {
  name: string;
  email: string;
  address: string;
}

const TeebotSearchWizard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
  });

  const pages = [
    {
      id: 1,
      title: 'Page 1',
      fields: [
        {
          label: 'Select a course:',
          name: 'teebotCourse',
          type: 'select',
          options: [],
          required: true,
        },
      ],
    },
    {
      id: 2,
      title: 'Page 2',
      fields: [
        {
          label: 'Email:',
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
    {
      id: 3,
      title: 'Page 3',
      fields: [
        {
          label: 'Address:',
          name: 'address',
          type: 'text',
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitForm = (): void => {
    // Here, you can perform form validation and submission
    console.log(formData);
  };

  const currentPageData = pages.find((page) => page.id === currentPage);

  if (!currentPageData) {
    return null; // Return an appropriate fallback if the current page is not found
  }

  return (
    <div>
      <h2>{currentPageData.title}</h2>
      <form>
        {currentPageData.fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'select' ? 
             <SelectComponent
             name={field.name}
             options={[]}
             value={''}
             onChange={() => {}} />
            : <input
              type={field.type}
              id={field.name}
              name={field.name}
              required={field.required}
              onChange={handleChange}
            />}
          </div>
        ))}

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
      </form>

      <ProgressBar
        percent={75}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
<Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/9d/Pichu.png/revision/latest?cb=20170407222851"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/97/Pikachu_%28Smiling%29.png/revision/latest?cb=20170410234508"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
            />
          )}
        </Step>
      </ProgressBar>
    </div>
  );
};

export default TeebotSearchWizard;
