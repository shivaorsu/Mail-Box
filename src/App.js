import React,{useEffect} from "react";
import { Switch,Route } from "react-router-dom";
import Welcome from "./Components/Welcome/Welcome";
import AuthForm from "./Components/Authentication/AuthForm";
//import Editorcomponent from "./Components/Composes/ComposesMail";
import { emailActions } from "./Store/email-slice";
import './App.css';
import { useDispatch } from "react-redux";


function App() {
  let email = localStorage.getItem("email").replace(".", "").replace("@", "");
  const dispatch=useDispatch();
  useEffect(() => {
    fetch(
      `https://mail-chat-581a6-default-rtdb.firebaseio.com/${email}.json`,
      {
        method: "GET",
      }
    )
      .then(async (res) => {
        const data = await res.json();
        for (const key in data) {
          const item = data[key];
          item.id = key;
          dispatch(emailActions.sentEmail(item));
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, [dispatch, email]);
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
