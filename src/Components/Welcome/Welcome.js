import { Fragment } from "react";
import ShowEmails from "../Emails/ShowEmails";
import { useDispatch } from "react-redux";
import classes from "./Welcome.module.css";
import { useHistory } from "react-router-dom";
import { authActions } from "../../Store/auth-slics";
const Welcome = () => {
    const history = useHistory();
  const dispatch = useDispatch();


  const composeHandler = () => {
    console.log("Clicked");
    history.replace("/composeMail");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace('/')
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>MailBox.com</h1>
        <button on onClick={logoutHandler}>Logout</button>
      </header>
      <div className={classes.div}>
        <div>
          <button onClick={composeHandler}>Compose Mail</button>
          <li className={classes.list}>
            <p>Inbox</p>
            <p>Unread</p>
            <p>Deleted</p>
          </li>
        </div>
        <div>
          <table className={classes.mail}>
            <th>From</th>

            <th className={classes.subject}>Subject</th>
          </table>
          <ShowEmails />
        </div>
      </div>
    </Fragment>
  );
};
export default Welcome;
