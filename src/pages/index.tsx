import React, { useState, useEffect } from 'react';
import styles from '@/styles/Chatbot.module.css';
import { BiSolidSend } from "react-icons/bi";
import Bubble from '@/components/bubble';
import { table } from 'console';

function Main() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<any>();
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tableName: 'conversation' }),
        });
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    }
    
    fetchData();  
  }, []);

  async function insertData(tableName:string,role:string,message:string) {
    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName, role, message }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  }

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const handleSendClick = () => {
    if (inputValue.trim() !== '') {
      const newMessage = { message: inputValue, role: 'User' };
      insertData('conversation','User',inputValue);
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