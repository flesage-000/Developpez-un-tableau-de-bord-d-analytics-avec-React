import React from 'react';
import PropTypes from 'prop-types';

import './Welcome.css';

/**
 * Set "Welcome {name}"
 * @param {object} userData
 */
function Welcome(userData) {
  const UserFirstName = userData.userData.userInfos.firstName;

  return (
    <div className="welcome">
      <h2>Bonjour <span>{ UserFirstName }</span></h2>
      <p>
        Félicitation ! Vous avez explosé vos objectifs hier <span aria-label="bravo" role="img">👏</span>
      </p>
    </div>
  )
}

Welcome.propTypes = {
  userData: PropTypes.object
}

export default Welcome;