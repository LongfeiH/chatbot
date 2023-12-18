import React, { useState } from 'react';
import styles from '@/styles/Chatbot.module.css';
import { BiSolidSend } from "react-icons/bi";
import Bubble from '@/components/bubble';

function Main() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const message = {
    text: 'nihaoaaaaaaaaaa',
    role: 'yourself'
  }

  return (
    <>
    <div className={styles.messageContainer}>
      <Bubble message={message} />
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
        <BiSolidSend className={styles.sendButton} />
      </div>
    </>
  );
}

export default Main;