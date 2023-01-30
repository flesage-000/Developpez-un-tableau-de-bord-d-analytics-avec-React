import React from "react";
import { useParams } from 'react-router-dom';

import AverageSessions from "../../components/AverageSessions/AverageSessions";
import DailyActivity from "../../components/DailyActivity/DailyActivity";
import Indicator from "../../components/Indicators/Indicator";
import Intensity from "../../components/Intensity/Intensity";
import Score from "../../components/Score/Score";
import Welcome from "../../components/Welcome/Welcome";
import { UserActivity, UserAverageSessions, UserMainData, UserPerformance } from '../../services/MockedAPI';

import './Dashboard.css';
import imgSportSeeLogo from './../../assets/medias/sportsee_logo.png';
import imgYogaIconLogo from './../../assets/medias/icon-yoga.png';
import imgSwimIconLogo from './../../assets/medias/icon-swim.png';
import imgCycleIconLogo from './../../assets/medias/icon-cycle.png';
import imgDumbbellIconLogo from './../../assets/medias/icon-dumbbell.png';

/**
 * Dashboard page
 */
function Dashboard() {
  const { userId } = useParams();

  return(
    <>
      <header className="dashboard-header">

        <img  alt="logo SportSee"
              height="60.93px"
              src={imgSportSeeLogo}
              width="178px" />

        <nav className="dashboard-nav">
          <button>Accueil</button>
          <button>Profil</button>
          <button>Réglage</button>
          <button>Communauté</button>
        </nav>

      </header>

      <div className="dashboard-content">

        <aside className="dashboard-aside">
          <ul>
            <li>
              <img  alt="icon yoga"
                    height="32px"
                    src={imgYogaIconLogo}
                    width="36px" />
            </li>
            <li>
              <img  alt="icon nageur"
                    height="32px"
                    src={imgSwimIconLogo}
                    width="32px" />
            </li>
            <li>
              <img  alt="icon cycle"
                    height="32px"
                    src={imgCycleIconLogo}
                    width="38px" />
            </li>
            <li>
              <img  alt="icon haltère"
                    height="32px"
                    src={imgDumbbellIconLogo}
                    width="32px" />
            </li>
          </ul>

          <small>Copyright&nbsp;SportSee&nbsp;2020</small>

        </aside>

        <section>

          <Welcome  userData={ UserMainData({userId}) } />

          <div className="dashboard-board">

            <div className="dashboard-graphs">
              <DailyActivity userActivityData={ UserActivity({userId}) } />

              <div className="dashboard-details">
                <AverageSessions averageSessionsData={ UserAverageSessions({userId}) } />
                <Intensity userPerformanceData={ UserPerformance({userId}) } />
                <Score userScore={ UserMainData({userId}) } />
              </div>
              </div>

            <div className="dashboard-indicators">
              <Indicator userIndicator={ [UserMainData({userId}), 'calorieCount'] } />
              <Indicator userIndicator={ [UserMainData({userId}), 'proteinCount'] } />
              <Indicator userIndicator={ [UserMainData({userId}), 'carbohydrateCount'] } />
              <Indicator userIndicator={ [UserMainData({userId}), 'lipidCount'] } />
            </div>
          </div>

        </section>

      </div>
    </>

  )
}

export default Dashboard;