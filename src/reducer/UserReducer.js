import * as UserTypes from '../actionType/user'

const user = {
  uid: null,
  user: null,
  lang: 1
}
//將cookie值取出的方法
const getCookie = () => {
  var value = "; " + document.cookie;
  var parts = value.split("; " + 'language' + "=");
  if (parts.length == 2) {
    return parts
      .pop()
      .split(";")
      .shift();
  };
}
export default function User(state = user, action) {
  switch (action.type) {
    case UserTypes.SAVE_UID: {
      return { ...state, uid: action.uid }
    }
    case UserTypes.GET_USER: {
      return { ...state, user: action.user }
    }
    case UserTypes.GET_COOKIE: {
      let lang = state.lang
      if (getCookie()) lang = parseInt(getCookie())
      return { ...state, lang }
    }
    default:
      return state
  }
}