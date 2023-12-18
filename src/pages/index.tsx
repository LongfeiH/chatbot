import React, { useState } from 'react';
import styles from '@/styles/Chatbot.module.css';
import { BiSolidSend } from "react-icons/bi";
import Bubble from '@/components/bubble';

function Main() {
  const [inputValue, setInputValue] = useState('');
  const messageArray = [
    { text: 'Hello', role: 'yourself' },
    { text: 'How are you?', role: 'yourself' },
    { text: 'I am doing great!', role: 'yourself' },
    { text: 'Nice to meet you. I am vary happy. How do you think? I am fine too.', role: 'yourself' },
  ];
  const [messages, setMessages] = useState(messageArray);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const handleSendClick = () => {
    if (inputValue.trim() !== '') {
      const newMessage = { text: inputValue, role: 'yourself' };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  return (
    <div className={styles.container}>
    <div className={styles.messageContainer}>
      <Bubble messages={messages} />
    </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          required
          className={styles.input}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type something..."
        />
        <BiSolidSend
        className={styles.sendButton}
        onClick={handleSendClick}/>
      </div>
    </div>
  );
}

export default Main;