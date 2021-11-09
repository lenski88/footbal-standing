import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import isoFetch from "isomorphic-fetch";
import { seasonsLoadingStarted } from "../../redux/actions/seasonsAvailableAC";

import "./Main.css";

export const Main = () => {
  const dispatch = useDispatch();
  const selectedLeague = useSelector((state) => state.selectedLeague);
  const selectedLeagueRender = useSelector(
    (state) => state.seasonsAvailable.seasons
  );
  const [leagueLogoURL, setLeagueLogoURL] = useState("");
  useEffect(() => {
    if (selectedLeague) {
      dispatch(seasonsLoadingStarted(selectedLeague));
    }
    isoFetch(
      `https://api-football-standings.azharimm.site/leagues/${selectedLeague}`,
      { method: "GET" }
    )
      .then((response) => {
        if (!response.ok) {
          let Err = new Error("fetch error " + response.status);
          Err.message = "Ошибка связи";
          throw Err;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setLeagueLogoURL(data.data.logos.light);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedLeague]);

  return (
    <div className="main-block">
      <div className="main-block-title">
        <img src={leagueLogoURL} alt={selectedLeagueRender.name} />
        <h3>{selectedLeagueRender.name}</h3>
      </div>
    </div>
  );
};
