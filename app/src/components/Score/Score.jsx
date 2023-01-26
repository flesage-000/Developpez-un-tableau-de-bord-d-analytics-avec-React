import React from 'react';

import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Label, } from "recharts";

import './Score.css';

function Score(userScore) {
  const UserScore = userScore.userScore.todayScore * 100;
  const total = 100 - UserScore;

  const data = [
    { name: "Score", value: UserScore },
    { name: "Total", value: total },
  ];
  const colors = ["red", "#FBFBFB"];

  const customLegend = () => {
    return (
      <p  className="piechart-legend"
          style={{ paddingLeft: `7%` }}>
        {data[0].name}
      </p>
    );
  };

  function CustomLabel({ viewBox, value1, value2 }) {
    const { cx, cy } = viewBox;
    return (
      <>
        <text className="recharts-text recharts-label"
              dominantBaseline="central"
              fill="black"
              textAnchor="middle"
              x={cx}
              y={cy - 5}>
          <tspan  alignmentBaseline="middle"
                  fontSize="35px">
            {value1}
          </tspan>
        </text>
        <text className="recharts-text recharts-label"
              dominantBaseline="central"
              fill="#74798C"
              textAnchor="middle"
              x={cx}
              y={cy + 20}>
          <tspan  fontSize="12.3px">{ value2 }</tspan>
        </text>
      </>
    );
  }

  return(
    <div className="user-score rounded">
      <ResponsiveContainer>
        <PieChart height={250}
                  width={730}>
          <Legend align="left"
                  content={ customLegend }
                  verticalAlign="top" />
          <circle cx="50%"
                  cy="51.6%"
                  fill="white"
                  r="33%" />
          <Pie  cornerRadius={50}
                cx="50%"
                cy="40%"
                data={ data }
                dataKey="value"
                endAngle={450}
                innerRadius={88}
                label={ false }
                outerRadius={97}
                paddingAngle={0}
                startAngle={90}
                stroke="">
            <Label  content={
                      <CustomLabel
                        value1={data[0].value + "%"}
                        value2="de votre objectif"
                      />
                    }
                    position="center" />
            {
              data.map((entry, index) => (
                <Cell fill={ colors[index % colors.length] }
                      key={ `cell-${index}` } />
              ))
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Score;