import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { PolarAngleAxis , PolarGrid, PolarRadiusAxis, Radar , RadarChart, ResponsiveContainer } from 'recharts';
import { UserPerformance, setUserPerformanceData } from '../../services/MockedAPI';

import './Intensity.css';

/**
 * Set user intensity chart
 * @param {string} userId
 */
function Intensity(userId) {
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    if (process.env.REACT_APP_ENV_DATA === 'dev0') {
      setUserData(UserPerformance(userId));
    } else {
      async function dataAPI() {
        await fetch(`${process.env.REACT_APP_ENV_API_URL}user/${userId.userId}/performance`)
        .then(response => response.json())
        .then(data => {
          data = setUserPerformanceData(data.data);
          return setUserData(data)
        })
        .catch(error => { console.log(error) })
      }
      dataAPI();
    }
  }, []);

  if (!userData) return <></>

  return (
    <div className="intensity rounded">

      <ResponsiveContainer width="99%">
        <RadarChart data={userData}
                    outerRadius={50}>

          <PolarGrid  radialLines={false}
                      stroke="rgba(255, 255, 255, 1)" />

          <PolarAngleAxis dataKey="activity"
                          fontSize="12"
                          stroke="rgba(255, 255, 255, 1)"
                          tickLine={false} />

          <PolarRadiusAxis  axisLine={false}
                            tick={false} />

          <Radar  dataKey="kind"
                  fill="rgba(255, 1, 1, 0.7)"
                  fillOpacity={0.65} />

        </RadarChart>
      </ResponsiveContainer>

    </div>
  )
}

Intensity.propTypes = {
  userId: PropTypes.string
}

export default Intensity;