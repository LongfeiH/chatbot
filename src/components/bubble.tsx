import styles from '@/styles/Chatbot.module.css';

function Bubble(props: {messages:any}) {
    const messages = props.messages;
    return (
        <>
            {messages.map((message:any, index:number) => (
            <button
                key={index}
                className={styles.bubble}
            >
                {message.text}
            </button>
        ))}
        {messages.map((message:any, index:number) => (
            <button
                key={index}
                className={styles.chatbotBubble}
            >
                {message.text}
            </button>
        ))}
        </>
    );
}

export default Bubble;