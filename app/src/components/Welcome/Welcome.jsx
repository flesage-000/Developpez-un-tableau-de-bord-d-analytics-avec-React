import React from 'react';

import './Welcome.css';

/**
 * Set "Welcome {name}"
 * @param {object} userData
 */
function Welcome(userData) { console.log("typeof", typeof userData)
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

export default Welcome;