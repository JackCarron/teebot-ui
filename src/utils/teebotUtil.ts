import { API, Auth } from "aws-amplify";
import { API_NAME } from "../constants";

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
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
}