import isoFetch from "isomorphic-fetch";

export const SEASONS_LOADING = "SEASONS_LOADING";
export const SEASONS_SUCCESS = "SEASONS_SUCCSESS";
export const SEASONS_FAILURE = "SEASONS_FAULURE";

export const seasonsLoadingStarted = (leagueID) => {
  return (dispatch) => {
    dispatch(seasonsLoadingAC());
    isoFetch(
      `https://api-football-standings.azharimm.site/leagues/${leagueID}/seasons`,
      { method: "GET" }
    )
      .then((response) => {
        if (!response.ok) {
          let Err = new Error("fetch error " + response.status);
          Err.userMessage = "Ошибка связи";
          throw Err;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        dispatch(seasonsSuccessAC(data.data));
      })
      .catch((error) => {
        dispatch(seasonsFailureAC(error));
      });
  };
};

export const seasonsLoadingAC = () => {
  return {
    type: SEASONS_LOADING,
  };
};

export const seasonsSuccessAC = (seasons) => {
  return {
    type: SEASONS_SUCCESS,
    payload: seasons,
  };
};

export const seasonsFailureAC = (error) => {
  return {
    type: SEASONS_FAILURE,
    payload: error,
  };
};
