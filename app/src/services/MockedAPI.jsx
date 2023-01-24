import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../assets/mock/data';

export function UserMainData(id, isMock) {
  if(isMock) {
    const data = USER_MAIN_DATA.find(user => user.id === id*1)
    console.log("UserMainData", data);
    return data
  }
}

export function UserActivity(info) { console.log("info.isMock", info);
  if(info.isMock) {
    let data = USER_ACTIVITY.find(user => user.userId === info.userId*1)
    console.log("UserActivity", data);
    data.sessions = getDayCount(data.sessions);
    return data.sessions
  }
}

export function UserAverageSessions(id, isMock) {
  if(isMock) {
    const data = USER_AVERAGE_SESSIONS.find(user => user.userId === id*1)
    console.log("UserAverageSessions", data);
    return data
  }
}

export function UserPerformance(id, isMock) {
  if(isMock) {
    const data = USER_PERFORMANCE.find(user => user.userId === id*1)
    console.log("UserPerformance", data);
    return data
  }
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