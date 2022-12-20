import React from "react";
import AllEmails from "./AllEmails";
import { useSelector } from "react-redux";

const ShowEmails = (props) => {
  const showEmails = useSelector((state) => state.email.recievedEmails);
  return (
    <ul>
      {showEmails.map((item) => (
        <AllEmails

          item={{

            id: item.id,
            from: item.from,
            subject: item.subject,
            read:item.read

          }}

        />
      ))}
    </ul>
    
  );
};

export default ShowEmails;
