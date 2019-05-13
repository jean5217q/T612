export const db = firebase.firestore()

export const getQueryId = () => {
  let query = window.location.href
  query = query.split('?')[1].split('&')
  let projectId = null
  let dateId = null
  query.forEach(el => {
    if (el.indexOf('project') !== -1) projectId = el.split('=')[1]
    if (el.indexOf('date') !== -1) dateId = el.split('=')[1]
  })
  return {
    projectId,
    dateId,
  }
}

//檢查登入狀態
export const checkLogInStatus = (callback, prop) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const uid = user.uid
      callback(uid)
    }
    else {
      prop.history.push('/')
    }
  })
}

//月份時間格式化
export const setDateToNumber = (time) => {
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

export const formateTime = (time) => {
  let t =  new Date(time*1000)
  let h = t.getHours()
  let m = t.getMinutes()
  h = h<10 ? '0'+h : h
  m = m<10 ? '0'+m : m
  return `${h}:${m}`
}

export const formateStartDate = (date) => {
  let formate = date
  formate.setHours(0)
  formate.setMinutes(0)
  formate.setSeconds(0)
  return formate
}
