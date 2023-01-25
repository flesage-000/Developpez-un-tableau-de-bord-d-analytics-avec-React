import React from "react";
import { useParams } from 'react-router-dom';

import AverageSessions from "../../components/AverageSessions/AverageSessions";
import DailyActivity from "../../components/DailyActivity/DailyActivity";
import { UserActivity, UserAverageSessions, UserPerformance } from '../../services/MockedAPI';


function Dashboard() {
  const { userId } = useParams();
  const isMock = window.location.href.split('?')[1] || false;
;
  return(
    <div>
      <h1>Dashboard</h1>
      <DailyActivity userActivityData={ UserActivity({userId, isMock}) } />
      <AverageSessions averageSessionsData={ UserAverageSessions({userId, isMock}) } />
      <UserPerformance userPerformanceData={ UserPerformance({userId, isMock}) } />
    </div>

  )
}

export default Dashboard;