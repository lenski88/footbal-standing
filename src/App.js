import React from "react";
import { ListLeagues } from "./components/ListLeagues/ListLeagues";
import { Main } from "./components/Main/Main";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ListLeagues />
      <Main/>
    </div>
  );
}

export default App;
