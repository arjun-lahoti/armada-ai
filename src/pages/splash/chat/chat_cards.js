import React from "react";
import chat from "../../../assets/chat_bubble.png";
import capabilities from "../../../assets/capabilities.png"

const ChatCards= () => {
	
	return (
		<div>


			<table className = 'card-container'>
				<td> 
					<div className = 'card'>
						<table>
							<tr><td><div className = 'card-header'><img className="chat-bubble" alt = "chat-bubble" src ={chat}/></div></td></tr>
							<tr><td><div className = 'card-header'>Examples</div></td></tr>

							<tr><td><div className = 'card-entry'>"What available dimensions are there for gaskets?"</div></td></tr>
							<tr><td><div className = 'card-entry'>"Find me a gasket with the product ID x "</div></td></tr>
							<tr><td><div className = 'card-entry'>"Find me a gasket with these specific dimensions: x y z "</div></td></tr>
						
						</table> 
					</div>
				</td>
				<td>
					<div className = 'card'>
						<table>
							<tr><td><div className = 'card-header'><img className="chat-bubble" alt = "capabilities" src ={capabilities}/></div></td></tr>
							<tr><td><div className = 'card-header'>Capabilities</div></td></tr>

							<tr><td><div className = 'card-entry'>Find the right gasket for your repair</div></td></tr>
							<tr><td><div className = 'card-entry'>General repair work advice</div></td></tr>
							<tr><td><div className = 'card-entry'>Find me a gasket from PartsTown </div></td></tr>
				
						</table> 
					</div>
				</td>
			</table>
	  </div>
	);
};

export default ChatCards;
