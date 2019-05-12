//合併多個reducer
import { combineReducers } from 'redux';
//引入所有reducer
import user from './UserReducer';
import itinerary from './ItineraryReducer';
import budget from './BudgetReducer';



const Main_Reducer = combineReducers({
  user,
  itinerary,
  budget
})

export default Main_Reducer;