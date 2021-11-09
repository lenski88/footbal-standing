import { SELECTED_LEAGUE } from "../actions/selectedLeagueAC";

const initialState = null;

export const selectedLeagueReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_LEAGUE: {
            return action.payload
        }
        default: {
            return state;
        }
    }
}