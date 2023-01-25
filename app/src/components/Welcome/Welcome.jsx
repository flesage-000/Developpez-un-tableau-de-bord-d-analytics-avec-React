import React from 'react';

import './Welcome.css';

function Welcome(userData) {
  const UserFirstName = userData.userData.userInfos.firstName;

  return (
    <div className="welcome">
      <h2>Bonjour <span>{ UserFirstName }</span></h2>
    </div>
  )
}

export default Welcome;