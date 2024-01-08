import styles from '@/styles/Chatbot.module.css';

function Bubble(props: { messages: any }) {
    const messages = props.messages;
    console.log(messages);
    return (
        <>
            {messages?.map((message: any, index: number) => (
                <button
                    key={index}
                    className={message.role === 'User' ? styles.bubble : styles.chatbotBubble}
                >
                    {message.message}
                </button>
            ))}
        </>
    );
}

export default Bubble;