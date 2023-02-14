import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../assets/mock/data';

/**
 * Load data "Welcome", "Score", "indicators" ("id", "userInfos", "todayScore", "keyData")
 * @param {object} userId
 * @returns object
 */
export async function UserMainData(userId) {
  let pData = {};
  if (process.env.REACT_APP_ENV_DATA === 'dev') {
    pData = USER_MAIN_DATA.find(user => user.id === userId.userId * 1)
  } else {
    await fetch(`${process.env.REACT_APP_ENV_API_URL}user/${userId.userId}`)
      .then((response) => response.json())
      .then((data) => pData = data.data)
      .catch((error) => pData.error = error);
  }

  return pData
}

/**
 * Load data for "Daily activity" ("day", "kilogram", "calories", "dayCount")
 * @param {object} userId
 * @returns object
 */
export async function UserActivity(userId) {
  let pData = {};
  if (process.env.REACT_APP_ENV_DATA === 'dev') {
    pData = USER_ACTIVITY.find(user => user.userId === userId.userId * 1)
    pData.sessions = getDayCount(pData.sessions);
  } else {
    await fetch(`${process.env.REACT_APP_ENV_API_URL}user/${userId.userId}/activity`)
      .then((response) => response.json())
      .then((data) => pData = data.data)
      .catch((error) => pData.error = error);
  }
  // In case of error
  if (pData.error) return pData;

  pData.sessions = getDayCount(pData.sessions);

  return pData.sessions
}

/**
 * Load data for "Average user sessions" ("day", "sessionLength", "dayInWeek")
 * @param {object} datas
 * @returns object
 */
export async function UserAverageSessions(datas) {
  let pData = {};
  if (process.env.REACT_APP_ENV_DATA === 'dev') {
    pData = USER_AVERAGE_SESSIONS.find(user => user.userId === datas.userId * 1);
  } else {
    await fetch(`${process.env.REACT_APP_ENV_API_URL}user/${datas.userId}/average-sessions`)
      .then((response) => response.json())
      .then((data) => pData = data.data)
      .catch((error) => pData.error = error);
  }
  // In case of error
  if (pData.error) return pData;

  return setDayInWeek(pData.sessions)
}

/**
 * Load data for "Intensity" chart ("cardio", "energy", "endurance", "strength", "speed", "intensity")
 * @param {object} datas
 * @returns object
 */
export async function UserPerformance(datas) {
  let pData = {};
  if (process.env.REACT_APP_ENV_DATA === 'dev') {
    pData = USER_PERFORMANCE.find(user => user.userId === datas.userId*1)
    // pData = setUserPerformanceData(pData);
  } else {
    await fetch(`${process.env.REACT_APP_ENV_API_URL}user/${datas.userId}/performance`)
      .then((response) => response.json())
      .then((data) => pData = data.data)
      .catch((error) => pData.error = error);
  }
  // In case of error
  if (pData.error) return pData;

  pData = setUserPerformanceData(pData)

  return pData
}

/**
 * Translate english performance name to french
 * @param {string} data
 * @returns string
 */
function setPerformanceNameInFrench(data) {
  let name = null;

  switch(data) {
    case "cardio":
      name = "Cardio";
      break;
    case "energy":
      name = "Energie";
      break;
    case "endurance":
      name = "Endurance";
      break;
    case "strength":
      name = "Force";
      break;
    case "speed":
      name = "Vitesse";
      break;
    default:
    // case "":
      name = "Intensité";
  }
  return name
}

/**
 * Create user performance Array
 * @param object} datas
 * @returns Array
 */
export function setUserPerformanceData(datas) {
  let newArray = [];
  const kind = Object.values(datas.kind);
  let data = datas.data;

  data.forEach((element, index) => {

    const activityName = setPerformanceNameInFrench(kind[index++])

    const newObject = {
      activity: activityName,
      kind: element.value,
      fullMark: 200
    };

    newArray.push(newObject);
  });
  return newArray;
}

/**
 *  Add 'dayCount' property to object.
 * @param {object} data
 * @returns object
 */
function getDayCount(data) {
  const dataLen = data.length;
  for(let i = 0; i < dataLen; i++) data[i].dayCount = i + 1;

  return data
}

/**
 * Add 'dayInWeek' property to object.
 * @param {object} data
 * @returns object
 */
export function setDayInWeek(data) {
  const dataLen = data.length;
  let dayInwWeek = null;

  for(let i = 0; i < dataLen; i++) {
    switch (data[i].day) {
      case 1:
        dayInwWeek = "L";
        break;
      case 2:
      case 3:
        dayInwWeek = "M";
        break;
      case 4:
        dayInwWeek = "J";
        break;
      case 5:
        dayInwWeek = "V";
        break;
      case 6:
        dayInwWeek = "S";
        break;
      default:
        dayInwWeek = "D";
    }
    data[i].dayInWeek = dayInwWeek;
  }

  return data
}