import React from 'react';
import ChatInterface from '../ChatInterface';

const ChatStep: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="h-[600px]">
    <ChatInterface onComplete={onNext} />
  </div>
);

export default ChatStep;