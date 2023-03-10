import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserActivity } from '../../services/MockedAPI';

import './DailyActivity.css';

/**
 * Set daily activity chart
 * @param {string} userId
 */
function DailyActivity({ userId }) {
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    let fetchData = async () => setUserData(await UserActivity({ userId }));
    fetchData();
  }, []);

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
  const customLegend = (userData) => {
    const { payload } = userData;
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
    <div className="daily-activity rounded">
      { userData && userData.error ? <div className="error">
        Impossible de charger les données des activitées quotidiennes. <em>Erreur au chargement des données.</em>
      </div> :
      <ResponsiveContainer  height={320}
                            width="99%">
        <BarChart barCategoryGap={8}
                  data={userData}
                  margin={{top: 24, right: 32, bottom: 24, left: 24}}>

          <CartesianGrid  stroke="rgba(222, 222, 222, 1)"
                          strokeDasharray="1 1"
                          vertical={false} />

          <Tooltip  content={customToolTip}
                    cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }}
                    wrapperStyle={{ outline: "none" }} />

          <Bar  barSize={7}
                dataKey="kilogram"
                fill="rgba(40, 45, 48, 1)"
                name="Poids (kg)"
                radius={[3.5, 3.5, 0, 0]} />

          <Bar  barSize={7}
                dataKey="calories"
                fill="rgba(230, 0, 0, 1)"
                name="Calories brûlées (kCal)"
                radius={[3.5, 3.5, 0, 0]} />

          <XAxis  dataKey="dayCount"
                  stroke="rgba(155, 158, 172, 1)"
                  tickLine={false} />

          <YAxis  axisLine={false}
                  dataKey="calories"
                  domain={[50, 'dataMax']}
                  orientation="right"
                  stroke="rgba(155, 158, 172, 1)"
                  tickLine={false}
                  type="number" />

          <Legend align="right"
                  content={customLegend}
                  height={90}
                  iconSize="8"
                  iconType="circle"
                  layout="horizontal"
                  verticalAlign="top" />

        </BarChart>
      </ResponsiveContainer> }
    </div>
  )
}

DailyActivity.propTypes = {
  userId: PropTypes.string
}

export default DailyActivity;