import React from 'react';
import PropTypes from 'prop-types';

import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Label, } from "recharts";

import './Score.css';

/**
 * Set score chart to give percentage achieved in goal
 * @param {object} userScore
 */
function Score(userScore) {
  // Because key has different score name
  const UserScore = (userScore.userScore.todayScore || userScore.userScore.score) * 100;
  const total = 100 - UserScore;

  const data = [
    { name: "Score", value: UserScore },
    { name: "Total", value: total },
  ];
  const colors = ["red", "#FBFBFB"];

  const customLegend = () => {
    return (
      <p  className="user-score-legend">
        Score
      </p>
    );
  };

  function CustomLabel({ viewBox, value1, value2 }) {
    const { cx, cy } = viewBox;
    return (
      <>
        <text className="recharts-text recharts-label"
              dominantBaseline="central"
              fill="rgba(32, 37, 58, 1)"
              textAnchor="middle"
              x={cx}
              y={cy - 15}>
          <tspan  alignmentBaseline="middle"
                  fontSize="26px"
                  fontWeight={700}>
            {value1}
          </tspan>
        </text>
        <text className="recharts-text recharts-label"
              dominantBaseline="central"
              fill="rgba(116, 121, 140, 1)"
              textAnchor="middle"
              x={cx}
              y={cy}>
          <tspan  fontSize="16px"
                  fontWeight={500}>{ value2 }</tspan>
        </text>
      </>
    );
  }

  return(
    <div className="user-score rounded">

      <ResponsiveContainer width="99%">

        <PieChart>

          <Legend align="left"
                  content={ customLegend }
                  verticalAlign="top" />

          <circle cx="50%"
                  cy="60%"
                  fill="rgba(255, 255, 255, 1)"
                  r="33%" />

          <Pie  data={data}
                dataKey="value"
                endAngle={450}
                innerRadius="90%"
                label={false}
                outerRadius="100%"
                paddingAngle={0}
                startAngle={90}>

            <Label  content={
                      <CustomLabel  value1={data[0].value + "%"}
                                    value2={`de votre objectif`} />
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

Score.propTypes = {
  userScore: PropTypes.object
}

export default Score;