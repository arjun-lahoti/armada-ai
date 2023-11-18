import React, { useRef, useEffect } from 'react';
import andy_propic from '../../../assets/andy-propic.png'; // Import the image



const Bubble_Container = ({userChats, responseChats}) => {

	const scrollableDivRef = useRef(null);
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


	useEffect(() => {
		// Function to scroll the div to the bottom
		
	
		// Call the function to scroll to the bottom after rendering
		scrollToBottom();
	  }, [userChats, responseChats]);

	
	return (
		<div ref={scrollableDivRef} className='bubble-container'>

        {userChats.map((item, index) => (
			<div>

			<h1 className="user-label">You</h1>

			<table className = 'user-response'><td>
				<div className = 'user-bubble' key={index}>{item}</div></td>
				
				<td><div className="profile-circle">Y</div></td></table>
			<br/><br/>

			<div className = 'andy-response'>
			<img className = 'andy-propic' src={andy_propic} alt="andy" /><h1 className="andy-label">Andy</h1>
			</div>
			<div className = 'response-bubble' key={index}>{responseChats[index]}</div><br/><br/>


			</div>
          
		  
        ))}

		
		</div>

	);
};

export default Bubble_Container;
