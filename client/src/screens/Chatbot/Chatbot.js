import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/style.css";
import { personalities } from "../../personalites/personalites";

const ChatBot = () => {
  const [character, setCharacter] = useState("");
  const [error, setError] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "you are an assistant",
    },
  ]);

  const handleOptionSelect = (option) => {
    setMessages([
      { role: "system", content: `I want you to act as ${option}` },
    ]);
    setSelectedOption(option);
    setCharacter(option);
  };

  //scroll to bottom of chatContainer
  useEffect(() => {
    const chatContainer = document.getElementById("chatContainer");
    const scrollOptions = {
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    };
    chatContainer.scrollTo(scrollOptions);
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Send a request to the server only if there is  a user message
    if (inputMessage.trim() !== "") {
      try {
        //Add the user message to the messages array
        const updatedMessages = [
          ...messages,
          { role: "user", content: inputMessage },
        ];
        setMessages(updatedMessages);
        const response = await axios.post("/api/chatbot", {
          messages: updatedMessages,
        });
        const serverResponse = response.data;

        //Add the server response to the messages array
        const updatedMessages2 = [
          ...updatedMessages,
          {
            role: "assistant",
            content: serverResponse.data.choices[0].message.content,
          },
        ];
        setMessages(updatedMessages2);
        setInputMessage("");
      } catch (error) {
        console.log("An error occured", error);
        setError("An error occured");
      }
    }
  };

  return (
    <div>
      <div className="d-flex flex-column chat-page">
        <div id="personalites">
          <h3 className="text-center">
            {character
              ? `You are chatting with ${character}`
              : "Please select a character"}
          </h3>
          <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center">
              {personalities.map((personality, index) => (
                <div key={index} className="text-center rounded">
                  <img
                    src={require(`../../personalites/images/${index + 1}.png`)}
                    alt={personality.title}
                    className={`img-fluid rounded-circle w-100 h-50 ${
                      selectedOption === personality.title ? "selected" : ""
                    }`}
                    onClick={() => handleOptionSelect(personality.title)}
                  />
                  <h6>{personality.title}</h6>
                  <p>{personality.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="chatContainer" className="flex-fill overflow-auto text-center">
          {messages.map(
            (message, index) =>
              message?.role !== "system" && (
                <div
                  key={index}
                  className={`${
                    message.role === "user"
                      ? "alert alert-info"
                      : "alert alert-success"
                  }`}
                >
                  {message.content}
                </div>
              )
          )}

          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
        <form
          className="form-horizontal mb-3 container-fluid"
          onSubmit={handleSubmit}
        >
          <div className="row form-group mt-2">
            <div className="col-sm-11">
              <div className="form-floating">
                <input
                  className="form-control custom-input"
                  id="floatingInput"
                  placeholder="Enter a prompt"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <label htmlFor="floatingInput">Prompt</label>
              </div>
            </div>
            <div className="col-sm-1">
              <button type="submit" className="btn btn-primary custom-button">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
