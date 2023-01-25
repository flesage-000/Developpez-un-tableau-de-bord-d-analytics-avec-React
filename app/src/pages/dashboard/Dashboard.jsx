import React from "react";
import { useParams } from 'react-router-dom';

import AverageSessions from "../../components/AverageSessions/AverageSessions";
import DailyActivity from "../../components/DailyActivity/DailyActivity";
import Intensity from "../../components/Intensity/Intensity";
import Score from "../../components/Score/Score";
import { UserActivity, UserAverageSessions, UserMainData, UserPerformance } from '../../services/MockedAPI';


function Dashboard() {
  const { userId } = useParams();
  const isMock = window.location.href.split('?')[1] || false;
;
  return(
    <div>
      <h1>Dashboard</h1>
      <DailyActivity userActivityData={ UserActivity({userId, isMock}) } />
      <AverageSessions averageSessionsData={ UserAverageSessions({userId, isMock}) } />
      <Intensity userPerformanceData={ UserPerformance({userId, isMock}) } />
      <Score userScore={ UserMainData({userId, isMock}) } />
    </div>

  )
}

export default Dashboard;