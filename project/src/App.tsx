import React, { useState, useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { Message, ChatState } from './types/chat';
import { generateResponse } from './data/mockResponses';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [{
      id: '1',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date()
    }],
    isTyping: false
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true
    }));

    // Generate and add AI response
    const response = await generateResponse(content);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      role: 'assistant',
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, aiMessage],
      isTyping: false
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4 flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <Bot className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-semibold text-white">AI Customer Assistant</h1>
          </div>

          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto px-6 py-4 space-y-4">
            {chatState.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {chatState.isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot size={20} className="text-blue-600" />
                </div>
                <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t px-6 py-4 bg-gray-50">
            <ChatInput onSend={handleSendMessage} disabled={chatState.isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;