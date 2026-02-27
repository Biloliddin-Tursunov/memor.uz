import React from "react";
import ChatInterface from "../ChatInterface";

interface Props {
    onNext: () => void;
    initialMessage: string;
}

const ChatStep: React.FC<Props> = ({ onNext, initialMessage }) => (
    <div className="h-full min-h-[500px]">
        <ChatInterface
            onComplete={onNext}
            initialUserMessage={initialMessage}
        />
    </div>
);

export default ChatStep;
