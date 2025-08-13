import React, { useState } from 'react';
import { MessageCircle, Users, Clock, Send } from 'lucide-react';
import Button from '../../../components/ui/Button';

const LiveChatWidget = ({ isBusinessHours }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I\'m the Universal Converter Hub AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage?.trim()) return;

    const userMessage = {
      id: messages?.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages?.length + 2,
        sender: 'ai',
        text: 'Thank you for your message. I\'ll help you with that right away. If you need human assistance, I can connect you with our support team.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">Live Chat Support</h2>
        </div>
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
          isBusinessHours 
            ? 'bg-green-100 text-green-800' :'bg-yellow-100 text-yellow-800'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isBusinessHours ? 'bg-green-500' : 'bg-yellow-500'
          }`}></div>
          <span>{isBusinessHours ? 'Online' : 'AI Only'}</span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Chat Features</h3>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Real-time assistance during business hours</li>
            <li>• AI-powered responses available 24/7</li>
            <li>• Seamless handoff to human agents</li>
            <li>• Screen sharing for technical issues</li>
            <li>• Multilingual support available</li>
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>
              {isBusinessHours 
                ? 'Human agents available now' :'AI assistant active • Human agents available tomorrow 9:00 AM PST'
              }
            </span>
          </div>
          
          <Button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            variant={isChatOpen ? "outline" : "default"}
            className="bg-green-600 hover:bg-green-700"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {isChatOpen ? 'Close Chat' : 'Start Chat'}
          </Button>
        </div>

        {isChatOpen && (
          <div className="border rounded-lg">
            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages?.map((message) => (
                <div
                  key={message?.id}
                  className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message?.sender === 'user' ?'bg-blue-600 text-white' :'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message?.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message?.timestamp?.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e?.target?.value)}
                  onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveChatWidget;