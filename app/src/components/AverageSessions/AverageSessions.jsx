import React from 'react';
import PropTypes from 'prop-types';

import { ResponsiveContainer, LineChart, Line, YAxis, XAxis, Tooltip } from "recharts";

import './AverageSessions.css';

/**
 * Set user average session
 * @param {object} userAverageSessionsData
 */
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
    <div className="average-sessions rounded">

      <h3>Durée moyenne des sessions</h3>

      <ResponsiveContainer width="99%">
        <LineChart  data={ UserAverageSessionsData }>
          <defs>
            <linearGradient id="linear">
              <stop offset="0%"
                    stopColor="rgba(255, 255, 255, .5" />
              <stop offset="100%"
                    stopColor="rgba(255, 255, 255, 1" />
            </linearGradient>
          </defs>

          <XAxis  axisLine={false}
                  dataKey="dayInWeek"
                  stroke="rgba(255, 255, 255, 1)"
                  tickLine={false} />

          <YAxis  dataKey="sessionLength"
                  hide={true}
                  stroke="rgba(255, 255, 255, 1)"
                  wrapperStyle={{fontSize: 12}} />

          <Line activeDot={false}
                dataKey="sessionLength"
                dot={false}
                stroke="url(#linear)"
                type="basis"
                strokeWidth={2} />

          <Tooltip  content={ customToolTip }
                    wrapperStyle={{ outline: "none" }} />
        </LineChart>
      </ResponsiveContainer>

    </div>
  )
}

AverageSessions.propTypes = {
  userData: PropTypes.object
}

export default AverageSessions;