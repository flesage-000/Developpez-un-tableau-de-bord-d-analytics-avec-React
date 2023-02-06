import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../assets/mock/data';

/**
 * Load data "Welcome", "Score", "indicators" ("id", "userInfos", "todayScore", "keyData")
 * @param {object} userId
 * @returns object
 */
export function UserMainData(userId) {
  let data = null;
  if (process.env.REACT_APP_ENV_DATA === 'dev') {
    data = USER_MAIN_DATA.find(user => user.id === userId.userId * 1)
  } else {
    async function dataAPI() {
      await fetch(`${process.env.REACT_APP_ENV_API_URL}user/${userId}`)
      .then(response => response.json())
      .then(data => { return data.data })
      .catch(error => { console.log(error) })
    }
    dataAPI();
  }
  return data
}

/**
 * Load data for "Daily activity" ("day", "kilogram", "calories", "dayCount")
 * @param {object} userId
 * @returns object
 */
export function UserActivity(userId) {
  let data = null;
  if (process.env.REACT_APP_ENV_DATA === 'dev') {
    data = USER_ACTIVITY.find(user => user.userId === userId.userId * 1)
  } else {
    async function dataAPI() {
      await fetch(`${process.env.REACT_APP_ENV_API_URL}user/${userId}/activity`)
      .then(response => response.json())
      .then(data => { return data.data.sessions })
      .catch(error => { console.log(error) })
    }
    dataAPI();
  }
  data.sessions = getDayCount(data.sessions);

  return data.sessions
}

/**
 * Load data for "Average user sessions" ("day", "sessionLength", "dayInWeek")
 * @param {object} datas
 * @returns object
 */
export function UserAverageSessions(datas) {
  let data = null;
  if (process.env.REACT_APP_ENV_DATA === 'dev') {
    data = USER_AVERAGE_SESSIONS.find(user => user.userId === datas.userId * 1);
  } else {
    async function dataAPI() {
      await fetch(`${process.env.REACT_APP_ENV_API_URL}user/${datas.userId}/average-sessions`)
      .then(response => response.json())
      .then(data => {
        data = setDayInWeek(data.data.sessions);
        return data
      })
      .catch(error => { console.log(error) })
    }
    dataAPI();
  }

  return setDayInWeek(data.sessions)
}

/**
 * Load data for "Intensity" chart ("cardio", "energy", "endurance", "strength", "speed", "intensity")
 * @param {object} datas
 * @returns object
 */
export function UserPerformance(datas) {
  let data = null;
  if (process.env.REACT_APP_ENV_DATA === 'dev') {
    data = USER_PERFORMANCE.find(user => user.userId === datas.userId*1)
    data = setUserPerformanceData(data);
  } else {
    async function dataAPI() {
      await fetch(`${process.env.REACT_APP_ENV_API_URL}user/${datas.userId}/performance`)
      .then(response => response.json())
      .then(data => {
        data = setUserPerformanceData(data.data);
        return data
      })
      .catch(error => { console.log(error) })
    }
    dataAPI();
  }

    return data
}

/**
 * Translate english performance name to french
 * @param {string} data
 * @returns string
 */
function setPerformanceNameInFrench(data) { // console.log("setPerformanceNameInFrench", data);
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