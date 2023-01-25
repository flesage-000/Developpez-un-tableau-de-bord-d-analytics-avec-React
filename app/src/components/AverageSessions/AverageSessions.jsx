import React from 'react';

import { ResponsiveContainer, LineChart, Line, Legend, YAxis, XAxis, Tooltip } from "recharts";

import './AverageSessions.css';

function AverageSessions(userAverageSessionsData) {
  const UserAverageSessionsData = userAverageSessionsData.averageSessionsData;

  /**
   * Generate custom tooltip
   */
  const customToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="linechart-tooltip">
          <p>{`${payload[0].value} min`}</p>
        </div>
      )
    }
  }

  return (
    <div className="average-sessions">
      <h3>Durée moyenne des sessions</h3>
      <LineChart  data={ UserAverageSessionsData }
                  width={500}
                  height={300}>

        <XAxis  axisLine={false}
                dataKey="dayInWeek"
                stroke="white" />
        <YAxis  dataKey="sessionLength"
                hide={true}
                stroke="white" />

        <Line dataKey="sessionLength"
              stroke="white"
              type="monotone" />

        <Tooltip  content={ customToolTip } />
      </LineChart>
    </div>
  )
}

export default AverageSessions;