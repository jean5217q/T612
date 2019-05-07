export const getQuery = () => {
  let q = window.location.href
  q = q.split('?')[1].split('&')
  let projectId = null
  let dateId = null
  let countryId = null
  q.forEach(el => {
    if (el.indexOf('project') !== -1) projectId = el.split('=')[1]
    if (el.indexOf('date') !== -1) dateId = el.split('=')[1]
    if (el.indexOf('country') !== -1) countryId = el.split('=')[1].split('+').splice(1)
  })
  return {
    projectId,
    dateId,
    countryId
  }
}


// 取得project&date query
export const getItineraryQuery = () => {
  let q = window.location.href
  q = q.split('?')[1].split('&')
  let projectId = null
  let dateId = null
  let countryId = null
  q.forEach(el => {
    if (el.indexOf('project') !== -1) projectId = el.split('=')[1]
    if (el.indexOf('date') !== -1) dateId = el.split('=')[1]
    if (el.indexOf('country') !== -1) countryId = el.split('=')[1].split('+').splice(1)
  })
  return {
    projectId,
    dateId,
    countryId
  }
}

export const getItemQuery = () => {
  let q = window.location.href
  q = q.split('?')[1].split('&')
  let projectId = q[0].split('=')[1]
  let dateId = q[1]
  let itemId = q[2].split('=')[1]
  return {
    projectId,
    dateId,
    itemId
  }
}

//檢查登入狀態
export const checkLogInStatus = (callback, prop) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log('login')
      const uid = user.uid
      callback(uid)
    }
    else {
      console.log('no-login')
      prop.history.push('/')
    }
  })
}
//月份時間格式化
export const formateMonthDay = (time) => {
  let t = new Date(time * 1000)
  let y = t.getFullYear()
  let m = t.getMonth() + 1
  let d = t.getDate()
  let w = t.getDay()
  var week =
    ["SUN", "MON", "TUE", "WED",
      "THU", "FRI", "SAT",
    ];
  w = week[w]
  d = d < 10 ? '0' + d : d
  m = m < 10 ? '0' + m : m
  return {
    y, m, d, w
  }
}

export const formateStartDate = (date) => {
  let formate = date
  formate.setHours(0)
  formate.setMinutes(0)
  formate.setSeconds(0)
  return formate
}
export const formateEndDate = (date) => {
  let formate = date
  formate.setHours(23)
  formate.setMinutes(59)
  formate.setSeconds(59)
  return formate
}