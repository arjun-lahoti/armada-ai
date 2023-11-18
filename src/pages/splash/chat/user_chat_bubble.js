import React from "react";
import Header from "./header"


const User_Chat_Bubble = ({userChatInput}) => {
	
	return (
		<div className = 'user-chat-bubble'>

<h2>Dictionary Items:</h2>
      {Object.keys(userChatInput).length > 0 ? (
        <ul>
          {Object.entries(userChatInput).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      ) : (
        <p>The dictionary is empty.</p>
      )}


	  </div>
	);
};

export default User_Chat_Bubble;
