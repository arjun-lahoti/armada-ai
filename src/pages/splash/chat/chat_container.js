import React, { useState } from "react";
import Chat_Input from "./chat_input";
import Bubble_Container from "./bubble_container";
import axios from "axios";


const Chat_Container = () => {

	const [userChatInput, setUserChatInput] = useState('');
	const [userChats, setUserChats] = useState([]);

	const handleInputChange = (event) => {
		setUserChatInput(event.target.value);
	  };

	const handleSubmit = (event) => {
		event.preventDefault();

		if (userChatInput.trim() === "") {
			return false;
		}

		else{
			axios.post(`http://127.0.0.1:8000/submit-chat`)
          .then(response => {
            // Update the state with the fetched data

			setUserChats(([...userChats, [userChatInput,response.data]]));
			
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });

		  setUserChatInput('');
		  
		}	
	  };

	return (


	<div className = 'center-div'>
		<div className = 'chat-container'>
		<div className="andy-bubble">Andy - Procurement Expert</div>
		<div className = 'chat-breaker'></div>
		

		<div className = 'bubble-container'>

			<Bubble_Container userChats = {userChats}/>

		</div>
		<div className = 'chat-input'><form onSubmit={handleSubmit}>
        <input className = 'text-input'
          type="text"
          value={userChatInput}
          onChange={handleInputChange}
          placeholder="Type something..."
        />
      	<button className = 'submit-btn' type="submit">&uarr;</button>
    	</form></div>
			
	  	</div>
	</div>
	);
};

export default Chat_Container;
