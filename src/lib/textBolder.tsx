type TextBolderProps = {
    text: string;
};

export default function TextBolder({ text }: TextBolderProps){
    const boldRegex = /\*\*(.*?)\*\*/g;

    return (
        <p>
        {text.split(boldRegex).map((part, index) =>
            // Every second element in the array is a match and should be bolded
            index % 2 === 1 ? <b key={index}>{part}</b> : part
        )}
        </p>
    );
};