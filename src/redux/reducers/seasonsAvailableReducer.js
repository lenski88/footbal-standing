import {SEASONS_LOADING, SEASONS_SUCCESS, SEASONS_FAILURE} from "../actions/seasonsAvailableAC";


const initialState = {
  loading: false,
  seasons: [],
  error: null,
};

export const seasonsAvailableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEASONS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SEASONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        seasons:  action.payload,
      };
    }
    case SEASONS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }

  }
};
