import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { User } from "../types/User";
import { deleteTeebotId, getTeebotListByUserId } from "../utils/teebotUtil";
import TeebotSearchParamTable from "./TeebotSearchParamTable"
import { TeebotSearchParam } from "./TeebotTeeTimeSelector";


export const Dashboard = () => {
    const [selectedTeeTimes, setSelectedTeeTimes] = useState<TeebotSearchParam[]>([]);

    useEffect(() => {
        Auth.currentAuthenticatedUser().then((currentAuthUser) => {
          getTeebotListByUserId(currentAuthUser.username).then(selectedTeeTimes => {
            setSelectedTeeTimes(selectedTeeTimes);
          });
        })
      }, []);

      const handleDelete = (index: number): void => {
        deleteTeebotId(selectedTeeTimes[index].teebotSearchParamId)
        selectedTeeTimes.splice(index, 1);
        setSelectedTeeTimes([...selectedTeeTimes]);
      }

    return (
        <div>
            <h1>Dashboard</h1>
            <TeebotSearchParamTable searchParams={selectedTeeTimes} handleDelete={handleDelete}></TeebotSearchParamTable>
        </div>
    )
}