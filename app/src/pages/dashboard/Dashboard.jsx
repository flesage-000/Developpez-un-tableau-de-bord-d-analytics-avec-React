import React from "react";

import AverageSessions from "../../components/AverageSessions/AverageSessions";
import DailyActivity from "../../components/DailyActivity/DailyActivity";


function Dashboard() {
  return(
    <div>
      <h1>Dashboard</h1>
      <DailyActivity />
      <AverageSessions />
    </div>

  )
}

export default Dashboard;