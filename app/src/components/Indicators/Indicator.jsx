import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { UserMainData } from '../../services/MockedAPI';

import './Indicator.css';
import iconCalories from './../../assets/medias/icon-calories.png';
import iconGlucides from './../../assets/medias/icon-glucides.png';
import iconLipides from './../../assets/medias/icon-lipides.png';
import iconProteines from './../../assets/medias/icon-proteines.png';

/**
 * Set the user indicator
 * @param {string} userId
 */
function Indicator({ userId, type }) {
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(UserMainData({ userId }));
  }, []);

  if(!userData) return <></>

  const data = userData.keyData;
  const dataType = type;

  let indicator = {};
  let icon = null;
  let unit = null;
  let label = null;
  switch(dataType) {
    case 'calorieCount':
      label = 'Calories';
      icon = iconCalories;
      unit = 'kCal';
      break;
    case 'proteinCount':
      label = 'Protéines';
      icon = iconProteines;
      unit = 'g';
      break;
    case 'carbohydrateCount':
      label = 'Glucides';
      icon = iconGlucides;
      unit = 'g';
      break;
    default:
    // case 'lipidCount':
      label = 'Lipides';
      icon = iconLipides;
      unit = 'g';
      break;
  }
  indicator.label = label;
  indicator.icon = icon;
  indicator.value = data[dataType].toLocaleString() + unit;

  return(
    <div className="indicator rounded">
      <div className="icon-container">
        <img  alt={ indicator.label }
              height="60px"
              src={ indicator.icon }
              width="60px" />
      </div>
      <div className="informations">
        <p className="information-value">
          { indicator.value }
        </p>
        <p className="information-type">
        { indicator.label }
        </p>
      </div>
    </div>
  )
}

Indicator.propTypes = {
  userId: PropTypes.string,
  type: PropTypes.string
}

export default Indicator;