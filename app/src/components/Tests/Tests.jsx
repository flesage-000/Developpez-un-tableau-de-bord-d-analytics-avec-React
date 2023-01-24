import React from 'react';
import { useParams } from 'react-router-dom';

import { UserMainData, UserActivity, UserAverageSessions, UserPerformance } from '../../services/MockedAPI';

function Tests(params) {
  const { userId } = useParams();
  const isMock = window.location.href.split('?')[1] || false;

  UserMainData(userId, isMock);

  UserActivity(userId, isMock);

  UserAverageSessions(userId, isMock);

  UserPerformance(userId, isMock);

  return(
    <div>
      Plopd {userId} plop
    </div>
  )
}

export default Tests;