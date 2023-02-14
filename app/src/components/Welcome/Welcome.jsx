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
    let fetchData = async () => setUserData(await UserMainData({ userId }));
    fetchData();
  }, []);

  return (
    <div className="welcome">
      { userData && userData.error && <div className="error">
        Impossible de charger les données de l'utilisateur. <em>Erreur au chargement des données.</em>
      </div> }
      { userData && userData.userInfos && <>
        <h2>Bonjour <span>{ userData.userInfos.firstName }</span></h2>
        <p>
          Félicitation ! Vous avez explosé vos objectifs hier <span aria-label="bravo" role="img">👏</span>
        </p>
      </> }
    </div>
  )
}

Welcome.propTypes = {
  userId: PropTypes.string
}

export default Welcome;