import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import isoFetch from "isomorphic-fetch";
import { seasonsLoadingStarted } from "../../redux/actions/seasonsAvailableAC";
import { Standing } from "../Standing/Standing";

import "./Main.css";

export const Main = () => {
  const dispatch = useDispatch();
  const selectedLeague = useSelector((state) => state.selectedLeague);
  const selectedLeagueRender = useSelector(
    (state) => state.seasonsAvailable.seasons
  );
  const [leagueLogoURL, setLeagueLogoURL] = useState("");
  const [year, setYear] = useState('2021')
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

  let years;
  if (selectedLeagueRender.length !== 0) {
    years = selectedLeagueRender.seasons.map((season) => {
      return <option key={season.year} value={season.year}>{season.year}</option>;
    });
  }

  const handleSelectedYear = (eo) => {
    setYear(eo.target.value)
  }
  return selectedLeague ? (
    <div className="main-block">
      <div className="main-block-title">
        <img src={leagueLogoURL} alt={selectedLeagueRender.name} />
        <h2>{selectedLeagueRender.name}</h2>
        <select onClick={handleSelectedYear}>{years}</select>
      </div>
      <Standing league={selectedLeague} year={year}/>
    </div>
  ) : null;
};
