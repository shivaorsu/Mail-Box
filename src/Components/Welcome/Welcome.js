import { Fragment } from "react";
import ShowEmails from "../Emails/ShowEmails";
import { useDispatch } from "react-redux";
import classes from "./Welcome.module.css";
import { useHistory } from "react-router-dom";
import { authActions } from "../../Store/auth-slics";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { emailActions } from "../../Store/email-slice";
//import SentEmails from "../Emails/SentEmail";
import { useParams } from "react-router-dom";



const Welcome = () => {
  const params=useParams();
    const history = useHistory();
  const dispatch = useDispatch();
  const unreadcount=useSelector((state)=>state.email.unread)


  const composeHandler = () => {
    console.log("Clicked");
    history.replace("/composeMail");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(emailActions.remove())
    history.replace('/')
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Mail Box.com</h1>
        <button className={classes.btn} onClick={logoutHandler}>Logout</button>
      </header>
      <div className={classes.div}>
        <div>
          <button onClick={composeHandler}>Compose Mail</button>
          <li className={classes.list}>
          <Link to={"/welcome/inbox"}>
            <p>Inbox ({unreadcount} unread Emails)</p>
            </Link>
            <Link to={"/welcome/sent"}>
            <p>Sent</p>
            </Link>
            <p>Deleted</p>
          </li>
        </div>
        <div>
          <table className={classes.mail}>
          
            <th>From</th>

            <th className={classes.subject}>Subject</th>
            
          </table>
          {params === 'indox' &&<ShowEmails />}
          {params === 'sent' &&<ShowEmails />}
        </div>
      </div>
    </Fragment>
  );
};
export default Welcome;
