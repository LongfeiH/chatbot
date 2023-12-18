import styles from '@/styles/Chatbot.module.css';

function Bubble(props: any) {
    console.log(props);
    const { text } = props.message.text;
    return (
        <>
            <button
                className={styles.bubble}>
                {text}
            </button>
        </>
    );
}

export default Bubble;