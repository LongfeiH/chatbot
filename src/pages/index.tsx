import React, { useState, useEffect, useRef  } from "react";
import styles from "@/styles/Chatbot.module.css";
import { BiSolidSend } from "react-icons/bi";
import Bubble from "@/components/bubble";
import { table } from "console";

function Main() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<any>();
  const messageContainerRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (messageContainerRef.current) {
      const chatContainer = messageContainerRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]); // 依赖于messages的更新
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({ tableName: "conversation" }),
        });
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    }

    fetchData();
  }, []);

  async function insertData(tableName: string, role: string, message: string) {
    let api_output
    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ tableName, role, message }),
      });
      const data = await res.json();
    } catch (error) {
      console.error("Fetch Error:", error);
    }


    try {
      const pdf_response = await fetch("/api/server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ py_name:'qdrant', message: message }),
      });
      const pdf_output = await pdf_response.json();

      const api_input_message = pdf_output.stdout + message;

      try {
        const api_response = await fetch("/api/server", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({ py_name:'chat_api',message: api_input_message }),
        });
        api_output = await api_response.json();
      } catch (error) {
        console.error("Fetch Error:", error);
      }
      

      const newMessage = { message: api_output.stdout, role: "Chatbot" };

      try {
        const res = await fetch("/api/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            tableName,
            role: "Chatbot",
            message: api_output.stdout,
          }),
        });
        const data = await res.json();

        setMessages((prevMessages: any) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error("Fetch Error:", error);
      }

    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const handleSendClick = () => {
    if (inputValue.trim() !== "") {
      const newMessage = { message: inputValue, role: "User" };
      insertData("conversation", "User", inputValue);
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.messageContainer} ref={messageContainerRef}>
        <Bubble messages={messages} />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          required
          className={styles.input}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type something..."
        />
        <BiSolidSend className={styles.sendButton} onClick={handleSendClick} />
      </div>
    </div>
  );
}

export default Main;
