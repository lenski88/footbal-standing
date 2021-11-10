import React, { useEffect, useState } from "react";
import isoFetch from "isomorphic-fetch";
import { Preloader } from "../Preloader/Preloader";

import "./Standing.css";

export const Standing = (props) => {
  const [standing, setStanding] = useState(null);
  useEffect(() => {
    setStanding(null)
    isoFetch(
      `https://api-football-standings.azharimm.site/leagues/${props.league}/standings?season=${props.year}&sort=asc`,
      { method: "GET" }
    )
      .then((response) => {
        if (!response.ok) {
          let Err = new Error("fetch error: " + response.status);
          Err.message = "Ошибка связи";
          throw Err;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setStanding(data.data.standings);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.league, props.year]);
  let table;
  if (standing) {
    table = standing.map((index) => {
      return (
        <tr key={index.team.id}>
          <td>{index.stats[8].value}</td>
          <td className="team">{index.team.shortDisplayName}</td>
          <td>{index.stats[3].value}</td>
          <td>{index.stats[0].value}</td>
          <td>{index.stats[2].value}</td>
          <td>{index.stats[1].value}</td>
          <td>{index.stats[4].value}</td>
          <td>{index.stats[5].value}</td>
          <td>{index.stats[6].value}</td>
        </tr>
      );
    });
  }
  return (
   standing ? <div className="standing">
      <table className="standing-table">
          <caption>Турнирная таблица. Сезон {`${props.year}-${Number(props.year) + 1}`}</caption>
        <tbody>
          <tr>
            <th>№</th>
            <th>Команда</th>
            <th>И</th>
            <th>В</th>
            <th>Н</th>
            <th>П</th>
            <th>ГЗ</th>
            <th>ГП</th>
            <th>О</th>
          </tr>
          {table}
        </tbody>
      </table>
    </div> : <Preloader/>
  );
};
