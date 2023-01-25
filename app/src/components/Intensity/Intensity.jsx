import React from "react";

import { PolarAngleAxis , PolarGrid, PolarRadiusAxis, Radar , RadarChart } from 'recharts';

import './Intensity.css';

function Intensity(userPerformanceData) {
  const UserPerformanceData = userPerformanceData.userPerformanceData;
  console.log("UserPerformanceData", UserPerformanceData);

  return (
    <div className="intensity">
      <h3>Intensité</h3>
      <RadarChart cx="50%"
                  cy="50%"
                  data={UserPerformanceData}
                  height={250}
                  outerRadius={85}
                  width={730}>

        <PolarGrid  radialLines={false}
                    stroke="white" />

        <PolarAngleAxis dataKey="activity"
                        fontSize="12"
                        stroke="white"
                        tickLine={false} />

        <PolarRadiusAxis  axisLine={false}
                          tick={false} />

        <Radar  dataKey="kind"
                fill="rgba(255, 1, 1, 0.7)"
                fillOpacity={0.65}
                stroke="red" />

      </RadarChart>

    </div>
  )
}

export default Intensity;