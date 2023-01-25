import React from 'react';

import './Indicator.css';

function Indicator(datas) {
  const data = datas.userIndicator[0].keyData; console.log("data", data);
  const dataType = datas.userIndicator[1];

  let indicator = {};
  let unit = null;
  let label = null;
  switch(dataType) {
    case 'calorieCount':
      label = 'Calories';
      unit = 'kCal';
      break;
    case 'proteinCount':
      label = 'Protéines';
      unit = 'g';
      break;
    case 'carbohydrateCount':
      label = 'Glucides';
      unit = 'g';
      break;
    case 'lipidCount':
      label = 'Lipides';
      unit = 'g';
      break;
  }
  indicator.label = label;
  indicator.value = data[dataType] + unit;

  return(
    <div className="indicator">
      <div className="icon-container">
        <i className="icon"></i>
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