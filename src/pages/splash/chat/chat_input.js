import React, { useState } from 'react';



const Chat_Input = () => {

	const [userChatInput, setUserChatInput] = useState('');
	const [userChatKey, setUserChatKey] = useState(0);
	const [userChats, setUserChats] = useState([]);

	const handleInputChange = (event) => {
		setUserChatInput(event.target.value);
	  };

	const handleSubmit = (event) => {

		const obj = {'key':userChatKey, 'msg':userChatInput};
		const current_chats = userChats;
		current_chats.push(obj);
		setUserChats(current_chats);
		console.log(userChats);
		var key = userChatKey
		key++;
		setUserChatKey(key);
		event.preventDefault();
	  };
	  
	
	return (
		<form onSubmit={handleSubmit}>
        <input className = 'text-input'
          type="text"
          value={userChatInput}
          onChange={handleInputChange}
          placeholder="Type something..."
        />
      <button className = 'submit-btn' type="submit">Submit</button>
    </form>
	);
};

export default Chat_Input;
