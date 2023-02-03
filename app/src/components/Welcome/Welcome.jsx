import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { UserMainData } from '../../services/MockedAPI';

import './Welcome.css';

/**
 * Set "Welcome {name}"
 * @param {string} userId
 */
function Welcome({ userId }) {
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    if (process.env.REACT_APP_ENV_DATA === 'dev') {
      setUserData(UserMainData({ userId }));
    } else {
      async function dataAPI() {
        await fetch(`${process.env.REACT_APP_ENV_API_URL}user/${userId}`)
        .then(response => response.json())
        .then(data => setUserData(data.data))
        .catch(error => { console.log(error) })
      }
      dataAPI();
    }
  }, []);

  return (
    <div className="welcome">
      { userData && <h2>Bonjour <span>{ userData.userInfos.firstName }</span></h2> }
      <p>
        Félicitation ! Vous avez explosé vos objectifs hier <span aria-label="bravo" role="img">👏</span>
      </p>
    </div>
  )
}

Welcome.propTypes = {
  userId: PropTypes.string
}

export default Welcome;