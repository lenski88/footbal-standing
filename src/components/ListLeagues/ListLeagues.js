import React, { useState, useEffect } from "react";
import isoFetch from "isomorphic-fetch";
import { selectedLeagueAC } from "../../redux/actions/selectedLeagueAC";
import { useDispatch } from "react-redux";
import { Preloader } from "../Preloader/Preloader";

import "./ListLeagues.css";

export const ListLeagues = () => {
  const [leagues, setLeagues] = useState(null);
  const [loadData, setLoadData] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    isoFetch("https://api-football-standings.azharimm.site/leagues", {
      method: "GET",
    })
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
        setLeagues(data.data);
        setLoadData(data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChooseLeague = (eo) => {
    dispatch(selectedLeagueAC(eo.target.id));
  };
  let listLeagues;
  if (loadData) {
    listLeagues = leagues.map((league) => {
      return (
        <li key={league.id} className="leagues-item">
          <span className='leagues-item-span' id={league.id} onClick={handleChooseLeague}>
            <img src={league.logos.light} alt={league.abbr} /> {league.name}
          </span>
        </li>
      );
    });
  }
  return (
    <div className="leagues-block">
      {loadData ? <ul className="leagues-list">{listLeagues}</ul> : <Preloader/>}
    </div>
  );
};
