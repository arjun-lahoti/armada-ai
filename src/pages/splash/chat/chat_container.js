import React, { useState, useRef } from "react";
import Bubble_Container from "./bubble_container";
import axios from "axios";

const Chat_Container = () => {
  const [userChatInput, setUserChatInput] = useState("");
  const [userChats, setUserChats] = useState([]);
  const [responseChats, setResponseChats] = useState([]);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setUserChatInput(event.target.value);
    const inputElement = inputRef.current;
    if (inputElement) {
      setUserChatInput(inputElement.textContent);
      console.log(userChatInput);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userChatInput.trim() === "") {
      return false;
    } else {
      setUserChats([...userChats, userChatInput]);

      axios
        .post("http://127.0.0.1:8000/submit-chat", { data: userChatInput })
        .then((response) => {
          console.log(response.data);
          // Update the state with the fetched data
          setResponseChats([...responseChats, response.data]);

          //setUserChats(([...userChats, [userChatInput,response.data]]));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      setUserChatInput("");
    }
  };

  return (
    <div className="center-div">
      <div className="chat-container">
        <div className="bubble-container">
          <Bubble_Container
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
