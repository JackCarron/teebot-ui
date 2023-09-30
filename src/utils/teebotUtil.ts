import { API, Auth } from "aws-amplify";
import { TeebotSearchParam } from "../components/TeebotTeeTimeSelector";
import { API_NAME } from "../constants";
import { v4 as uuidv4 } from 'uuid';

export const getTeebotListByUserId = async (userId: string) => {
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

export const deleteTeebotId = async (teebotId: string) => {
    try {
      const response = await API.del(API_NAME, `/teebot-search-params/${teebotId}`, {
        headers: {Authorization: `Bearer ${await (await Auth.currentSession()).getIdToken().getJwtToken()}`?? ''}
      });
      const data = await response;
      return data;
    } catch (error) {
      console.error(error);
    }
}

export const getConfig = async () => {
  try {
    const response = await API.get(API_NAME, `/config`, {
      headers: {Authorization: `Bearer ${await (await Auth.currentSession()).getIdToken().getJwtToken()}`?? ''}
    });
    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getEmptyTeebotSearchParm = (): TeebotSearchParam => {
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
  return defaultState;
}

export const getTeebotCoursesFromConfig = (configFromUI: any): any[] => {
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

export const saveTeebotTime = async (teebotSearchParam: TeebotSearchParam) => {
  try {
    const response = await API.post(API_NAME, `/teebot-search-params`, {
      headers: {Authorization: `Bearer ${await (await Auth.currentSession()).getIdToken().getJwtToken()}`?? ''},
      body: teebotSearchParam
    });
    const data = await response;
  } catch (error) {
    console.error(error);
  }
}