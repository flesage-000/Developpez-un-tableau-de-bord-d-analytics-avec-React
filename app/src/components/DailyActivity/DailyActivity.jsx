import React from 'react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import './DailyActivity.css';

function DailyActivity(userActivityData) {
  const UserActivityData = userActivityData.userActivityData;

  /**
   * Generate custom tooltip
   */
  const customToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="barchart-tooltip">
          <p>{`${payload[0].value}kg`}</p>
          <p>{`${payload[1].value}Kcal`}</p>
        </div>
      )
    }
  }

  /**
   * Generate custom legend
   */
  const customLegend = (UserActivityData) => {
    const { payload } = UserActivityData;
    return(
      <div className="barchart-legend rounded">
        <h3>Activité quotidienne</h3>
        <ul className="bar-legend">
          {
            payload.map((data, index) => (
              <li key={`${index++}`}>
                <span className="icon"
                      style={{
                        "--icon-size": data.payload.barSize + 'px',
                        "--icon-color": data.payload.fill
                      }}></span>
                <p className="legend-label">{data.value}</p>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }

  return (
    <div className="daily-activity">
      <ResponsiveContainer  height={320}
                            width="100%">
        <BarChart barCategoryGap={8}
                  data={UserActivityData}>

          <CartesianGrid  stroke="#dedede"
                          strokeDasharray="3 3"
                          vertical={false} />

          <Tooltip  content={customToolTip} />

          <Bar  barSize={7}
                dataKey="kilogram"
                fill="#282D30"
                name="Poids (kg)"
                radius={[3.5, 3.5, 0, 0]} />

          <Bar  barSize={7}
                dataKey="calories"
                fill="#E60000"
                name="Calories brûlées (kCal)"
                radius={[3.5, 3.5, 0, 0]} />

          <XAxis  dataKey="dayCount"
                  stroke="#9b9eac" />

          <YAxis  axisLine={false}
                  dataKey="calories"
                  orientation="right"
                  stroke="#9b9eac" />

          <Legend align="right"
                  content={customLegend}
                  iconSize="8"
                  iconType="circle"
                  layout="horizontal"
                  verticalAlign="top" />

        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DailyActivity;