import React from "react";
import ChatContainer from "./chat/chat_container";

import Header from "./header";



const Home = () => {
	
	return (
		<div>
			
			<div className = 'dynamic-br'></div>
			<Header/>
			<ChatContainer/>
	  </div>
	);
};

export default Home;
