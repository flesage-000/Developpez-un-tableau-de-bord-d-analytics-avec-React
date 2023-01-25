import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../assets/mock/data';

export function UserMainData(id, isMock) {
  if(isMock) {
    const data = USER_MAIN_DATA.find(user => user.id === id*1)
    // console.log("UserMainData", data);
    return data
  }
}

export function UserActivity(info) { // console.log("info.isMock", info);
  if(info.isMock) {
    let data = USER_ACTIVITY.find(user => user.userId === info.userId * 1)
    // console.log("UserActivity", data);
    data.sessions = getDayCount(data.sessions);
    return data.sessions
  }
}

export function UserAverageSessions(datas) { // console.log("datas.isMock", datas);
  if(datas.isMock) {
    let data = USER_AVERAGE_SESSIONS.find(user => user.userId === datas.userId * 1)
    // console.log("UserAverageSessionsdd", data);
    data = setDayInWeek(data)
    return data.sessions
  }
}

export function UserPerformance(datas) { console.log("datas.isMock", datas);
  if(datas.isMock) {
    let data = USER_PERFORMANCE.find(user => user.userId === datas.userId*1)
    console.log("UserPerformance", data);
    data = setUserPerformanceData(data);
    return data
  }
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
    const newObject = {
      activity: kind[index++],
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
        dayInwWeek = "m";
        break;
      case 3:
        dayInwWeek = "m";
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