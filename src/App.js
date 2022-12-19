import React from "react";
import { Switch,Route } from "react-router-dom";
import Welcome from "./Components/Welcome/Welcome";
import AuthForm from "./Components/Authentication/AuthForm";

import './App.css';


function App() {
  return (
    <main>
      <switch>
        <Route path="/" exact>
          <AuthForm/>
        </Route>
        <Route path="/welcome">
          <Welcome/>
        </Route>
      </switch>
    </main>
  );
}

export default App;
