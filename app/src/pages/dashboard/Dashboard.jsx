import React from "react";
import { useParams } from 'react-router-dom';

import AverageSessions from "../../components/AverageSessions/AverageSessions";
import DailyActivity from "../../components/DailyActivity/DailyActivity";
import { UserActivity } from '../../services/MockedAPI';


function Dashboard() {
  const { userId } = useParams();
  const isMock = window.location.href.split('?')[1] || false;

  const UserActivityData = UserActivity({userId, isMock});
  return(
    <div>
      <h1>Dashboard</h1>
      <DailyActivity userActivityData={ UserActivityData } />
      <AverageSessions />
    </div>

  )
}

export default Dashboard;