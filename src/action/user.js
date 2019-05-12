import * as UserTypes from '../actionType/user'
//取得使用者UID
export const saveUid = (uid) => {
  return {
    type: UserTypes.SAVE_UID,
    uid
  }
}
//取得使用者使用的語言
export const getLangFromCookie = () => {
  return {
    type: UserTypes.GET_COOKIE,
  }
}
//取得使用者個人資訊 (描述物件)
export const getUserDetail = (user) => {
  return {
    type: UserTypes.GET_USER,
    user
  }
}
//取得使用者個人資訊 (執行事件)
export const asyncGetUserDetail = (uid, callback) => {
  return dispatch => {
    const db = firebase.firestore();
    db.collection('user').doc(uid).get()
      .then(doc => {
        dispatch(getUserDetail(doc.data()))
        if (callback) callback()
      })
      .catch(err => alert('Error!'))
  }
}
