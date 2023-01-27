import React from 'react';

import './Indicator.css';
import iconCalories from './../../assets/medias/icon-calories.png';
import iconGlucides from './../../assets/medias/icon-glucides.png';
import iconLipides from './../../assets/medias/icon-lipides.png';
import iconProteines from './../../assets/medias/icon-proteines.png';


function Indicator(datas) {
  const data = datas.userIndicator[0].keyData; console.log("data", data);
  const dataType = datas.userIndicator[1];

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

export default Indicator;