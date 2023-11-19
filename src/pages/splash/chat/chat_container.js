import React, { useState, useRef } from "react";
import BubbleContainer from "./bubble_container";
import axios from "axios";
import ChatCards from "./chat_cards";


const ChatContainer = () => {

	// Creating state variables

	const [userChatInput, setUserChatInput] = useState('');
	const [userChats, setUserChats] = useState([]);
	const [responseChats, setResponseChats] = useState([]);
	const [isEditable, setIsEditable] = useState("true");
	const inputRef = useRef(null);

	// Update userChatInput when user types in input field
	const handleInputChange = (event) => {
		setUserChatInput(event.target.value);
		const inputElement = inputRef.current;
		if (inputElement) {
			setUserChatInput(inputElement.textContent);
			console.log(userChatInput)
    	}
	};

	// Handle submit when user submits chat
	const handleSubmit = async (event) => {

		// Prevent page reload
		event.preventDefault();
		setIsEditable("false");

		// Prevent submission if input field is empty
		if (userChatInput.trim() === "") {
			return false;
		}

		// If input field not empty...
		else{

			// Update userCharts prop passed to BubbleContainer child 
			setUserChats(([...userChats, userChatInput]));
	
			// Call submit-chat api which processes user input and returns response 
			axios.post('http://127.0.0.1:8000/submit-chat', {data:userChatInput})
			.then(response => {
				// Update responseChats prop passed to BubbleContainer child
				setResponseChats(([...responseChats, response.data]));
				setIsEditable("true");
				
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});

			// Set userChatInput to default
			setUserChatInput('');
			inputRef.current.innerHTML = '';
		}	
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
		  event.preventDefault();
		  handleSubmit(event);
		}
	}


	return (

		<div>

		<div className = 'center-div'>
			
			<div className = 'chat-container'>

			{!userChats[0] && <ChatCards/>}
				
				<div className = 'bubble-container'>
					<BubbleContainer userChats = {userChats} responseChats = {responseChats}/>

				</div>
					<div className = 'chat-input'>
						<form onSubmit={(e) => e.preventDefault()}>
							<div
								ref={inputRef}
								className="text-input"
								contentEditable={isEditable}
								onInput={handleInputChange}
								onKeyPress={handleKeyPress}
							></div>
							<button className = 'submit-btn' type="submit" onClick={handleSubmit}>&uarr;</button>
						</form>
					</div>
    	
	  		</div>
			
		</div>
		</div>
	);
};

export default ChatContainer;
