import React, { useState } from "react";
import Weather from "./components/Weather";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <Weather />
      </div>
      <div className="footer-info">
        <a href="https://github.com/sitiaminahak/project_module2_NTUSU/tree/main">
          Download Source Code
        </a>{" "}
        | Developed by{" "}
        <a
          target="_blank"
          href="https://www.linkedin.com/in/siti-aminah-abdul-karim-37582a129/"
        >
          Siti Aminah AK
        </a>{" "}
      </div>
    </React.Fragment>
  );
}

export default App;
