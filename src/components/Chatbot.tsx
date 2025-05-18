
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const botResponses: Record<string, string[]> = {
  greetings: [
    "Namaskara! Welcome to Mysuru Assist. How can I help you today?",
    "Hello! I'm your Mysuru guide. What would you like to know?",
    "Welcome to the cultural capital of Karnataka! How can I assist you?"
  ],
  tourist: [
    "Popular attractions in Mysuru include Mysore Palace, Chamundi Hills, Brindavan Gardens, and Mysuru Zoo.",
    "I recommend visiting the Mysore Palace, especially in the evening when it's illuminated. The light show is spectacular!",
    "Don't miss the local cuisine! Try Mysore Pak (sweet), Mysore Masala Dosa, and Mylari Dosa."
  ],
  citizen: [
    "You can report civic issues through the Citizen Reporter section. We'll ensure it reaches the concerned department.",
    "For water billing issues, please contact our helpline at 0821-2438888 or visit the City Corporation office.",
    "Property tax can be paid online through our portal or at designated centers across Mysuru."
  ],
  weather: [
    "Mysuru generally has pleasant weather throughout the year. The best time to visit is from October to March.",
    "Current weather in Mysuru is pleasant with moderate temperatures.",
    "Monsoon season in Mysuru is from June to September. Carry an umbrella if you're visiting during this time."
  ],
  transport: [
    "City buses connect most attractions in Mysuru. Auto-rickshaws are also readily available.",
    "You can hire a private taxi for a day tour of Mysuru attractions.",
    "The Mysuru Railway Station is well-connected to major cities like Bangalore, Chennai, and Mumbai."
  ],
  default: [
    "I'm sorry, I didn't understand that. Could you rephrase your question?",
    "I'm still learning about Mysuru. Could you ask something about tourist attractions, civic services, or local transport?",
    "I don't have information on that yet. Would you like to know about tourist places or civic services instead?"
  ]
};

const getResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('namaskara') || lowerMsg.includes('welcome')) {
    return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
  }
  
  if (lowerMsg.includes('palace') || lowerMsg.includes('tourist') || lowerMsg.includes('visit') || lowerMsg.includes('attraction') || lowerMsg.includes('food')) {
    return botResponses.tourist[Math.floor(Math.random() * botResponses.tourist.length)];
  }
  
  if (lowerMsg.includes('complaint') || lowerMsg.includes('report') || lowerMsg.includes('issue') || lowerMsg.includes('tax') || lowerMsg.includes('water')) {
    return botResponses.citizen[Math.floor(Math.random() * botResponses.citizen.length)];
  }
  
  if (lowerMsg.includes('weather') || lowerMsg.includes('rain') || lowerMsg.includes('climate') || lowerMsg.includes('temperature')) {
    return botResponses.weather[Math.floor(Math.random() * botResponses.weather.length)];
  }
  
  if (lowerMsg.includes('bus') || lowerMsg.includes('train') || lowerMsg.includes('transport') || lowerMsg.includes('travel') || lowerMsg.includes('auto')) {
    return botResponses.transport[Math.floor(Math.random() * botResponses.transport.length)];
  }
  
  return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Auto-scroll to bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Add welcome message when opening chat for the first time
    if (!isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: Date.now().toString(),
            text: "Namaskara! Welcome to Mysuru Assist. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
      }, 500);
    }
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };
  
  return (
    <>
      {/* Chatbot Icon */}
      <button
        className="chatbot-trigger group"
        onClick={toggleChat}
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>
      
      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-mysore-royal-purple flex items-center justify-center mr-3">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-medium">Mysuru Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask me anything about Mysuru</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Messages */}
          <div className="p-4 h-[calc(100%-8rem)] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "max-w-[80%] mb-3",
                  msg.sender === 'user' ? "ml-auto" : "mr-auto"
                )}
              >
                <div className="flex items-start gap-2">
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-mysore-royal-purple flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageCircle className="h-3 w-3 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "rounded-lg p-3",
                      msg.sender === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-[10px] mt-1 opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-mysore-marigold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="max-w-[80%] mb-3 mr-auto">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-mysore-royal-purple flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle className="h-3 w-3 text-white" />
                  </div>
                  
                  <div className="rounded-lg p-3 bg-muted">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="border-t p-4">
            <form 
              className="flex items-center gap-2" 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!message.trim()}
                className="bg-mysore-royal-purple hover:bg-mysore-royal-purple/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
