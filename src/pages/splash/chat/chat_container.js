import React, { useState, useRef } from "react";
import BubbleContainer from "./bubble_container";
import axios from "axios";

const Chat_Container = () => {
  const [userChatInput, setUserChatInput] = useState("");
  const [userChats, setUserChats] = useState([]);
  const [responseChats, setResponseChats] = useState([]);
  const inputRef = useRef(null);

  // Creating state variables

  const [userChatInput, setUserChatInput] = useState("");
  const [userChats, setUserChats] = useState([]);
  const [responseChats, setResponseChats] = useState([]);
  const inputRef = useRef(null);

  // Update userChatInput when user types in input field
  const handleInputChange = (event) => {
    setUserChatInput(event.target.value);
    const inputElement = inputRef.current;
    if (inputElement) {
      setUserChatInput(inputElement.textContent);
      console.log(userChatInput);
    }
  };

  // Handle submit when user submits chat
  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();

    // Prevent submission if input field is empty
    if (userChatInput.trim() === "") {
      return false;
    }

    // If input field not empty...
    else {
      // Update userCharts prop passed to BubbleContainer child
      setUserChats([...userChats, userChatInput]);

      // Call submit-chat api which processes user input and returns response
      axios
        .post("http://127.0.0.1:8000/submit-chat", { data: userChatInput })
        .then((response) => {
          // Update responseChats prop passed to BubbleContainer child
          setResponseChats([...responseChats, response.data]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      // Set userChatInput to default
      setUserChatInput("");
      inputRef.current.innerHTML = "";
    }
  };

  return (
    <div className="center-div">
      <div className="chat-container">
        <div className="bubble-container">
          <BubbleContainer
            userChats={userChats}
            responseChats={responseChats}
          />
        </div>
        <div className="chat-input">
          <form onSubmit={handleSubmit}>
            <div
              ref={inputRef}
              className="text-input"
              contentEditable="true"
              onInput={handleInputChange}
            ></div>
            <button className="submit-btn" type="submit">
              &uarr;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat_Container;
