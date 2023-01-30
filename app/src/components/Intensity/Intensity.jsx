import React from "react";

import { PolarAngleAxis , PolarGrid, PolarRadiusAxis, Radar , RadarChart, ResponsiveContainer } from 'recharts';

import './Intensity.css';

/**
 * Set user intensity chart
 * @param {object} userPerformanceData
 */
function Intensity(userPerformanceData) {
  const UserPerformanceData = userPerformanceData.userPerformanceData;

  return (
    <div className="intensity rounded">

      <ResponsiveContainer width="99%">
        <RadarChart data={UserPerformanceData}
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

export default Intensity;