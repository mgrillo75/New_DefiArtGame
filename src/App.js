import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// import components
import MainRouter from "./routes";

const App = () => {
  return (
    <div className="App">
      <MainRouter />
    </div>
  );
};

export default App;
