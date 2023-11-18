import React, { useRef, useEffect } from 'react';



const Bubble_Container = ({userChats}) => {

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
	  }, [userChats]);


	
	return (
		<div ref={scrollableDivRef} className='bubble-container'>

        {userChats.map((item, index) => (
			<div>

			<h1 className="user-label">You</h1>
			<div className = 'user-bubble' key={index}>{item[0]}</div><br/><br/>
			<h1 className="user-label">Andy</h1>
			<div className = 'response-bubble' key={index}>{item[1]}</div><br/><br/>


			</div>
          
		  
        ))}

		
		</div>

	);
};

export default Bubble_Container;
