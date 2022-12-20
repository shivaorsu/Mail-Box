import React,{Fragment,useRef,useState} from "react";
import { Editor } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import classes from './Composes.module.css';
import { emailActions } from "../../Store/email-slice";
import { convertFromRaw } from "draft-js";
import { EditorState} from "draft-js";

const EditorComponent = () => {
  const [editorState, setEditorState]=useState(()=> EditorState.createEmpty())
    const emailInputRef=useRef();
    const subjectInputRef=useRef();
    
    const history = useHistory();

    const dispatch = useDispatch();

    const homeHandler = () => {
        history.replace('./welcome/index')
    }

    async function emailSubmitHandler (event) {
        event.preventDefault();

        const emailReciever= emailInputRef.current.value;
        const enteredSubject = subjectInputRef.current.value;
        const body = convertFromRaw(editorState.getCurrentContent()).blocks[0].text;
        let recieverEmail = emailReciever.replace(".", "").replace("@", "");
        let senderEmail = localStorage.getItem('email');

        const emailSender = senderEmail.replace(".", "").replace("@", "");

        const objSent={
          to:emailReciever,
          subject:enteredSubject,
          body:body
        }

       const objRecieved = {
        from: senderEmail,
        subject: enteredSubject,
       }

        fetch(
            `https://mail-chat-581a6-default-rtdb.firebaseio.com/recieved/${recieverEmail}.json`,
            {
              method: "POST",
              body: JSON.stringify({
                ...objRecieved,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          ).then(async (res) => {
            const data = await res.json();
            dispatch(
              emailActions.recievedEmail({
                id: data.name,
                from: objRecieved.from,
                subject: objRecieved.subject,
                body: objRecieved.body,
                read: objRecieved.read,
              })
            )
          })

          fetch(
            `https://mail-box-7af32-default-rtdb.firebaseio.com/sent/${emailSender}.json`,
            {
              method: "POST",
              body: JSON.stringify({
                ...objSent,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          ).then(async (res) => {
            const data = await res.json();
            dispatch(
              emailActions.sentBox({
                id: data.name,
                to: objSent.to,
                subject: objSent.subject,
                body: objSent.body,


              })
            )
          })

        alert("Sent successfully")  
    }

    

  return (
    <Fragment>
        <button onClick={homeHandler}>Go to home page</button>
      <form className={classes.form} onSubmit={emailSubmitHandler}>
        <div>
          <label htmlFor="email">To</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" required ref={subjectInputRef} />
        </div>
        <div>

          <Editor  editorState={editorState} onEditorStateChange={setEditorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            wrapperStyle={{ width: 800, border: "1px solid black" }}

             />
        </div>
        <button>Send</button>
      </form>
    </Fragment>
  );

  }
export default EditorComponent;