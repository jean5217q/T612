import * as ItineratyType from '../actionType/itinerary'

const itinerary = {
  allProject: null,
  projectBasic: null,
  projectDayIdList: null,
  dateBasic: null,
  dateList: null,
  item: {},
  itemLoading: false
}

export default function getItinerary(state = itinerary, action) {
  switch (action.type) {
    case ItineratyType.GET_ALL_PROJECT: {
      return {
        ...state,
        allProject: action.list
      }
    }
    case ItineratyType.GET_PROJECT_BASIC: {
      return {
        ...state,
        projectBasic: action.info
      }
    }
    case ItineratyType.GET_PROJECT_DAY_ID: {

      return {
        ...state,
        itemLoading: false,
        projectDayIdList: action.IDlist
      }
    }
    case ItineratyType.GET_DATE_BASIC: {
      return {
        ...state,
        dateBasic: action.info
      }
    }
    case ItineratyType.GET_DATE_ITINERARY: {
      return {
        ...state,
        itemLoading: false,
        dateList: action.list
      }
    }
    case ItineratyType.GET_DATE_ITEM: {
      return {
        ...state,
        item: action.item
      }
    }
    case ItineratyType.DELETE_DATE_ITEM: {
      return {
        ...state,
        item: {}
      }
    }
    case ItineratyType.REMOVE_LIST_ITEM: {
      return {
        ...state,
        dateList: null
      }
    }
    case ItineratyType.LOADING: {
      return {
        ...state,
        itemLoading: action.boolean
      }
    }
    default:
      return state
  }
}