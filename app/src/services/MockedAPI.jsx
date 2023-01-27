import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../assets/mock/data';

const isProd = process.env.REACT_APP_ENV; console.log("isProd", isProd);

export function UserMainData(datas) { // console.log("UserMainData", datas);
  if(isProd === 'dev') {
    const data = USER_MAIN_DATA.find(user => user.id === datas.userId*1)
    // console.log("UserMainData", data);
    return data
  }
}

export function UserActivity(info) { // console.log("info.isMock", info);
  if(isProd === 'dev') {
    let data = USER_ACTIVITY.find(user => user.userId === info.userId * 1)
    // console.log("UserActivity", data);
    data.sessions = getDayCount(data.sessions);
    return data.sessions
  }
}

export function UserAverageSessions(datas) { // console.log("datas.isMock", datas);
  if(isProd === 'dev') {
    let data = USER_AVERAGE_SESSIONS.find(user => user.userId === datas.userId * 1)
    // console.log("UserAverageSessionsdd", data);
    data = setDayInWeek(data)
    return data.sessions
  }
}

export function UserPerformance(datas) { // console.log("datas.isMock", datas);
  if(isProd === 'dev') {
    let data = USER_PERFORMANCE.find(user => user.userId === datas.userId*1)
    data = setUserPerformanceData(data);
    return data
  }
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
function setUserPerformanceData(datas) {
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
function setDayInWeek(data) {
  const dataLen = data.sessions.length;
  let dayInwWeek = null;

  for(let i = 0; i < dataLen; i++) {
    switch (data.sessions[i].day) {
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
    data.sessions[i].dayInWeek = dayInwWeek;
  }

  return data
}