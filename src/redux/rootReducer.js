import { combineReducers } from "redux";
import { selectedLeagueReducer } from "./reducers/selectedLeagueReducer";
import { seasonsAvailableReducer } from "./reducers/seasonsAvailableReducer";

export const rootReducer = combineReducers({
    selectedLeague: selectedLeagueReducer,
    seasonsAvailable: seasonsAvailableReducer,
})
