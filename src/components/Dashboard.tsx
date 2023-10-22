import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { User } from "../types/User";
import { deleteTeebotId, getTeebotListByUserId } from "../utils/teebotUtil";
import TeebotSearchParamTable from "./TeebotSearchParamTable"
import { TeebotSearchParam } from "./TeebotTeeTimeSelector";
import './styles.css'
import { Container, Grid, Paper, Typography } from "@mui/material";


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
        
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Typography variant="h4">Welcome to Your Futuristic Golf Dashboard</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3}>
            <Typography variant="h6">Golf Stats</Typography>
            {/* Add your golf stats components here */}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3}>
            <Typography variant="h6">Leaderboard</Typography>
            {/* Add your leaderboard components here */}
          </Paper>
        </Grid>
      </Grid>
    </Container>

        </div>
    )
}