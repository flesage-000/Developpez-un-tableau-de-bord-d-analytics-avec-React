import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Label, } from "recharts";
import { UserMainData } from '../../services/MockedAPI';

import './Score.css';

/**
 * Set score chart to give percentage achieved in goal
 * @param {string} userId
 */
function Score({ userId }) {
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    let fetchData = async () => setUserData(await UserMainData({ userId }));
    fetchData();
  }, []);

  if (userData && userData.error) {
    return(
      <div className="user-score rounded">
        <div className="error">
          Impossible de charger les données du score de l'utilisateur. <em>Erreur au chargement des données.</em>
        </div>
      </div>
    )
  } else if (userData && (userData.todayScore || userData.score)) {
    const data = [
      { name: "Score", value: (userData.todayScore || userData.score) * 100 },
      { name: "Total", value: 100 - (userData.todayScore || userData.score) },
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
                    r="38%" />

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
}

Score.propTypes = {
  userId: PropTypes.string
}

export default Score;