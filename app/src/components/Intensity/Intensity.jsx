import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { PolarAngleAxis , PolarGrid, PolarRadiusAxis, Radar , RadarChart, ResponsiveContainer } from 'recharts';
import { UserPerformance } from '../../services/MockedAPI';

import './Intensity.css';

/**
 * Set user intensity chart
 * @param {string} userId
 */
function Intensity(userId) {
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(UserPerformance(userId));
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