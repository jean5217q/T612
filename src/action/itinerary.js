import * as ItineratyType from '../actionType/itinerary';

export const itemLoading = (boolean) => {
  return {
    type: ItineratyType.LOADING,
    boolean
  }
}

// user所有project_描述物件
export const getProjectAll = (list) => {
  return {
    type: ItineratyType.GET_ALL_PROJECT,
    list
  }
}
// project基本資訊_async function
export const asyncGetProjectAll = (uid) => {
  return dispatch => {
    let list = []
    const db = firebase.firestore();
    db.collection('project').where("uid", "==", uid).orderBy('time').get()
      .then(q => {
        q.forEach(doc => list.push({ id: doc.id, item: doc.data() }))
        dispatch(getProjectAll(list))
      })
      .catch(err => console.log(err))
  }
}
// // project基本資訊_描述物件
export const getProjectBasic = (info) => {
  return {
    type: ItineratyType.GET_PROJECT_BASIC,
    info
  }
}
// project基本資訊_async function
export const asyncGetProjectBasic = (projectId) => {
  return dispatch => {
    const db = firebase.firestore();
    db.collection('project').doc(projectId).get()
      .then(doc => {
        console.log('rerer')
        dispatch(getProjectBasic(doc.data()))
      })
      .catch(err => console.log(err))
  }
}

// project天數資訊_描述物件
export const getProjectDayID = (IDlist) => {
  return {
    type: ItineratyType.GET_PROJECT_DAY_ID,
    IDlist
  }
}
// project天數資訊_async function
export const asyncGetProjectDayID = (projectId) => {
  return dispatch => {
    const db = firebase.firestore();
    let list = []
    db.collection('project').doc(projectId)
      .collection('itinerary').orderBy('time').get()
      .then(q => {
        q.forEach(doc => list.push({ id: doc.id, item: doc.data() }))
        dispatch(getProjectDayID(list))
      })
      .catch(err => console.log(err))
  }
}


// 當日基本資訊_描述物件
export const getDateBasic = (info) => {
  return {
    type: ItineratyType.GET_DATE_BASIC,
    info
  }
}
// 當日基本資訊_async function
export const asyncGetDateBasic = (projectId, dateId) => {
  return dispatch => {
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId).get()
      .then(doc => {
        dispatch(getDateBasic(doc.data()))
      })
      .catch(err => console.log(err))
  }
}

// 當日所有行程_描述物件
export const getDateItinerary = (list) => {
  return {
    type: ItineratyType.GET_DATE_ITINERARY,
    list
  }
}
// 當日所有行程_async function
export const asyncGetDateItinerary = (projectId, dateId) => {
  return dispatch => {
    const db = firebase.firestore();
    let list = [];
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId)
      .collection('dateItem').orderBy("time").get()
      .then(q => {
        q.forEach(doc => list.push({ id: doc.id, item: doc.data() }))
        dispatch(getDateItinerary(list))
      })
      .catch(err => console.log(err))
  }
}

// 當日行程指定項目_描述物件
export const getDateItem = (item) => {
  return {
    type: ItineratyType.GET_DATE_ITEM,
    item
  }
}
// 當日行程指定項目_async function
export const asyncGetDateItem = (projectId, dateId, itemId) => {
  return dispatch => {
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId)
      .collection('dateItem').doc(itemId).get()
      .then(doc => {
        dispatch(getDateItem(doc.data()))
      })
      .catch(err => console.log(err))
  }
}

// 清除當日指定行程項目
export const deleteDateItem = () => {
  return {
    type: ItineratyType.DELETE_DATE_ITEM
  }
}
export const asyncDeleteDateItem = (projectId, dateId, itemId) => {
  return dispatch => {
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId)
      .collection('dateItem').doc(itemId).delete()
      .then(doc => {
        dispatch(getDateItem(doc.data()))
      })
      .catch(err => console.log(err))
  }
}

////////////////////////////////////////////-add
// 添加行程_描述物件
export const addDateItinerary = (list) => {
  return {
    type: ItineratyType.ADD_DATE_ITINERARY,
    list
  }
}
// 添加行程_async function
export const asyncaddDateItinerary = (projectId, dateId) => {
  return dispatch => {
    const db = firebase.firestore();
    let list = [];
    db.collection('project').doc(projectId)
      .collection('itinerary').doc(dateId)
      .collection('dateItem').orderBy("time").get()
      .then(q => {
        q.forEach(doc => list.push({ id: doc.id, item: doc.data() }))
        dispatch(getDateItinerary(list))
      })
      .catch(err => console.log(err))
  }
}


export const removeDayList = () => {
  return {
    type: ItineratyType.REMOVE_LIST_ITEM,
  }
}



export const createProject = (obj) => {
  return {
    type: ItineratyType.CREATE_PROJECT,
    obj
  }
}