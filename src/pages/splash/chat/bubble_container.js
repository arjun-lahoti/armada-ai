import React, { useRef, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import andy_propic from '../../../assets/andy-propic.png'; // Import the image

const BubbleContainer = ({userChats, responseChats}) => {

	// Reference to scroll container for auto scroll
	const scrollableDivRef = useRef(null);

	// Auto scroll to bottom of chat container to view most recent chat on submit
	const scrollToBottom = () => {
		if (scrollableDivRef.current) {
		  const { scrollHeight, clientHeight } = scrollableDivRef.current;
		  const maxScrollTop = scrollHeight - clientHeight;
		  const bottomPos = maxScrollTop > 0 ? maxScrollTop : 0;
	
		  scrollableDivRef.current.scrollTo({
			top: bottomPos,
			behavior: 'smooth', // Adding smooth behavior
		  });
		}
	  };

	// Scroll to bottom when user or response chat is updated
	useEffect(() => {
		scrollToBottom();
	  }, [userChats, responseChats]);

	
	return (
		<div ref={scrollableDivRef} className='bubble-container'>

        	{userChats.map((item, index) => (
			<div>
				<h1 className="user-label">You</h1>
				<table className = 'user-response'>
					<td><div className = 'user-bubble' key={index}>{item}</div></td>
					<td><div className="profile-circle">Y</div></td>
				</table>

				<div>
				{responseChats[index] && <div><h1 className="andy-label">Andy</h1>
				<table className = 'gpt-response'>
					<td><img className = 'andy-propic' src={andy_propic} alt="andy" /></td>
					<td><div className = 'response-bubble' key={index}>{responseChats[index]}</div></td>
				</table></div>}
				</div>

				<div>
					{!responseChats[index] && <div className = 'typing'><TypeAnimation
						sequence={[
							'Andy is typing...',
							1000,
						]}
						speed={50}
						style={{ fontSize: '2em' }}
						repeat={Infinity}
						/></div>}
				</div>
				<br/><br/>
			</div>	  
			))}
		</div>
	);
};

export default BubbleContainer;
