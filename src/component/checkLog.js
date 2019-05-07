import { get } from "http";

export const checkLogInStatus = (callback, prop) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log('login')
      const uid = user.uid
      if(callback) callback(uid)
    }
    else {
      console.log('no-login')
      prop.history.push('/')
    }
  })
}
//取得該使用者基本資訊文件
export const getCorrespondUser = (email, callback, other) => {
  const db = firebase.firestore();
  db.collection('user').where('email', '==', email).get()
    .then(q => callback(q, other))
}

//取得單個大行程基本資訊array
export const getAllItinerary = (q,id) => {
  let array = []
    q.forEach(doc => {
      doc.ref.collection('itinerary')
      .doc(id).collection('itinerary').orderBy("time").get()
      .then(q => {
        q.forEach(doc => {
          array.push(doc.data())
        })
        console.log(array)
    })
  })
}

export const formateTime = (time) => {
  let t =  new Date(time*1000)
  let h = t.getHours()
  let m = t.getMinutes()
  h = h<10 ? '0'+h : h
  m = m<10 ? '0'+m : m
  return `${h}:${m}`
}
//取得該天基本資訊
