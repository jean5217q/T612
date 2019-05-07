import * as BudgetType from '../actionType/budget';
//LOADING
export const itemLoading = (boolean) => {
  return {
    type: BudgetType.LOADING,
    boolean
  }
}
// 所有天數的資訊(描述物件)
export const getProjectAllBudget = (list) => {
  return {
    type: BudgetType.GET_ALL,
    list
  }
}
// 所有天數的資訊(執行事件)
export const asyncGetProjectAllBudget = (projectId) => {
  return dispatch => {
    let list = []
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('budget').orderBy('time').get()
      .then(q => {
        q.forEach(doc => list.push({ id: doc.id, item: doc.data() }))
        dispatch(getProjectAllBudget(list))
      })
      .catch(err => alert('Error!!'))
  }
}
// 當日List資訊(描述物件)
export const getBudgetDayList = (list) => {
  return {
    type: BudgetType.GET_DAY_LIST,
    list
  }
}
// 當日List資訊(執行事件)
export const asyncGetBudgetDayList = (projectId, dateId) => {
  return dispatch => {
    const db = firebase.firestore();
    db.collection('project').doc(projectId)
      .collection('budget').doc(dateId).get()
      .then(doc => dispatch(getBudgetDayList(doc.data())))
      .catch(err => alert('Error!!'))
  }
}
// 移除當日List
export const removeBudgetDayList = () => {
  return { type: BudgetType.REMOVE_DAY_LIST }
}
// 移除所有List
export const removeBudgetAllList = () => {
  return { type: BudgetType.REMOVE_All }
}

