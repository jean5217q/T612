import * as BudgetType from '../actionType/budget';

const budget = {
  budgetDayIdList: [],
  budgetDayList: null,
  budgetCataList: null,
  itemLoading: false,
  checkArr: null
}

export default function getBudget(state = budget, action) {
  switch (action.type) {
    case BudgetType.GET_ALL: {
      let type =
        ['transportation', 'shopping', 'entertainment', 'food', 'hotel', 'others']
      let temp = action.list.map(el => el.item)
      let tempCataList = {}
      let checkArr = null
      type.forEach(type => {
        tempCataList[type] = []
        temp.forEach(arr => {
          arr[type].forEach(i => {
            if (i) {
              checkArr = []
              checkArr.push(i)
            }
            tempCataList[type].push(i)
          })
        })
      })
      return {
        ...state,
        itemLoading: false,
        budgetDayIdList: action.list,
        budgetCataList: tempCataList,
        checkArr
      }
    }
    case BudgetType.GET_DAY_LIST: {
      return {
        ...state,
        budgetDayList: action.list,
        itemLoading: false
      }
    }
    case BudgetType.GET_DAY_TIME: {
      return {
        ...state,
        dayTime: action.item
      }
    }
    case BudgetType.REMOVE_DAY_LIST: {
      return { ...state, budgetDayList: null }
    }
    case BudgetType.REMOVE_All: {
      return {
        ...state,
        budgetCataList: null,
        budgetDayIdList: [],
        checkArr: null
      }
    }
    case BudgetType.LOADING: {
      return { ...state, itemLoading: action.boolean }
    }
    default:
      return state
  }
}