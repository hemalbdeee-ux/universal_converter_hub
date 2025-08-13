import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/ui/Button';

const LiveChatSection = ({ isBusinessHours }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatStatus, setChatStatus] = useState('offline'); // offline, connecting, connected, typing
  const [waitTime, setWaitTime] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [showUserForm, setShowUserForm] = useState(true);
  const messagesEndRef = useRef(null);

  const chatTopics = [
    { id: 'general', label: 'General Question', icon: '💬' },
    { id: 'technical', label: 'Technical Issue', icon: '🔧' },
    { id: 'billing', label: 'Account & Billing', icon: '💳' },
    { id: 'feature', label: 'Feature Request', icon: '✨' },
    { id: 'bug', label: 'Bug Report', icon: '🐛' },
    { id: 'partnership', label: 'Business Inquiry', icon: '🤝' }
  ];

  const predefinedQuestions = [
    'How do I convert between units?',
    'Why are my results different from other calculators?',
    'How can I save my conversion history?',
    'Is there a mobile app available?',
    'How do I report a calculation error?',
    'Can I use this for commercial purposes?'
  ];

  const autoResponses = {
    'hello': 'Hi there! How can I help you today?',
    'hours': 'Our support hours are Monday-Friday 9 AM to 5 PM in your local time zone.',
    'pricing': 'Our basic conversion tools are completely free. For advanced features and API access, please check our pricing page.',
    'accuracy': 'We use industry-standard conversion factors and regularly audit our calculations for accuracy.',
    'mobile': 'Yes! Our website is fully responsive and works great on mobile devices. We also have dedicated mobile apps coming soon.',
    'api': 'Our API allows you to integrate conversion functionality into your applications. Check our developer documentation for details.'
  };

  useEffect(() => {
    if (isChatOpen && messages?.length === 0) {
      // Initialize chat with welcome message
      const welcomeMessage = {
        id: Date.now(),
        text: isBusinessHours 
          ? "Hello! I'm here to help you with any questions about our conversion tools. How can I assist you today?" :"Thanks for reaching out! While our live agents are currently offline, I can help answer common questions or you can leave a message for our team.",
        sender: 'agent',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, [isChatOpen, isBusinessHours]);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Simulate wait time countdown when connecting
    let timer;
    if (chatStatus === 'connecting' && waitTime > 0) {
      timer = setInterval(() => {
        setWaitTime(prev => {
          if (prev <= 1) {
            setChatStatus('connected');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [chatStatus, waitTime]);

  const startChat = () => {
    if (!userInfo?.name || !userInfo?.email) {
      setShowUserForm(true);
      return;
    }
    
    setIsChatOpen(true);
    setShowUserForm(false);
    
    if (isBusinessHours) {
      setChatStatus('connecting');
      setWaitTime(30); // 30 seconds estimated wait
    } else {
      setChatStatus('offline');
    }
  };

  const sendMessage = (messageText = currentMessage) => {
    if (!messageText?.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');

    // Simulate typing indicator
    setChatStatus('typing');
    
    // Auto-response logic
    setTimeout(() => {
      const lowerText = messageText?.toLowerCase();
      let responseText = "I understand your question. ";
      
      // Check for keyword matches
      const foundKeyword = Object.keys(autoResponses)?.find(keyword => 
        lowerText?.includes(keyword)
      );
      
      if (foundKeyword) {
        responseText = autoResponses?.[foundKeyword];
      } else if (isBusinessHours) {
        responseText += "Let me connect you with one of our specialists who can provide more detailed assistance.";
      } else {
        responseText += "I'll make sure our team gets your message first thing during business hours. Is there anything else I can help clarify?";
      }

      const response = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'agent',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, response]);
      setChatStatus('connected');
    }, 1500 + Math.random() * 1000); // Random delay for realism
  };

  const selectPredefinedQuestion = (question) => {
    sendMessage(question);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getStatusIndicator = () => {
    switch (chatStatus) {
      case 'connecting':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
            <span className="text-sm text-warning">Connecting... ({waitTime}s)</span>
          </div>
        );
      case 'connected':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success">Agent connected</span>
          </div>
        );
      case 'typing':
        return (
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-info rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-info rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-1 bg-info rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm text-info">Agent is typing...</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-muted rounded-full"></div>
            <span className="text-sm text-text-secondary">
              {isBusinessHours ? 'Available now' : 'Outside business hours'}
            </span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Chat Overview */}
      <div className="bg-surface rounded-lg p-8 shadow-brand">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Live Chat Support</h2>
            <p className="text-text-secondary">
              Get instant assistance from our support team. Available during business hours 
              with automated help available 24/7.
            </p>
          </div>
          <div className="text-right">
            {getStatusIndicator()}
          </div>
        </div>

        {/* Quick Topic Selection */}
        <div className="mb-6">
          <h3 className="font-semibold text-text-primary mb-3">What can we help you with?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {chatTopics?.map(topic => (
              <button
                key={topic?.id}
                onClick={() => setSelectedTopic(topic?.id)}
                className={`
                  flex items-center space-x-2 p-3 rounded-lg border text-left transition-all duration-200
                  ${selectedTopic === topic?.id
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/30 text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                <span className="text-lg">{topic?.icon}</span>
                <span className="text-sm font-medium">{topic?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* User Information Form */}
        {showUserForm && (
          <div className="bg-background border border-border rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-text-primary mb-4">Start a conversation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Name *</label>
                <input
                  type="text"
                  value={userInfo?.name}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, name: e?.target?.value }))}
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Email *</label>
                <input
                  type="email"
                  value={userInfo?.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e?.target?.value }))}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* Chat Actions */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            {isBusinessHours ? (
              <span className="text-success">✓ Live agents available now</span>
            ) : (
              <span className="text-warning">⚠ Outside business hours - Leave a message</span>
            )}
          </div>
          
          <Button
            onClick={startChat}
            disabled={!userInfo?.name || !userInfo?.email}
            className="min-w-[120px]"
          >
            {isChatOpen ? 'Chat Active' : 'Start Chat'}
          </Button>
        </div>
      </div>

      {/* Chat Interface */}
      {isChatOpen && (
        <div className="bg-surface rounded-lg shadow-brand overflow-hidden">
          {/* Chat Header */}
          <div className="bg-primary text-primary-foreground p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
                <div>
                  <h3 className="font-semibold">Support Chat</h3>
                  <p className="text-sm opacity-90">
                    {selectedTopic ? chatTopics?.find(t => t?.id === selectedTopic)?.label : 'General Support'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-primary-foreground/80 hover:text-primary-foreground"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages?.map(message => (
              <div
                key={message?.id}
                className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                    ${message?.sender === 'user' ?'bg-primary text-primary-foreground' :'bg-background border border-border text-text-primary'
                    }
                  `}
                >
                  <p className="text-sm">{message?.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {formatTime(message?.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages?.length <= 1 && (
            <div className="border-t border-border p-4">
              <p className="text-sm text-text-secondary mb-3">Common questions:</p>
              <div className="grid grid-cols-1 gap-2">
                {predefinedQuestions?.slice(0, 3)?.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => selectPredefinedQuestion(question)}
                    className="text-left text-sm text-primary hover:text-primary-dark hover:underline"
                  >
                    • {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="border-t border-border p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!currentMessage?.trim() || chatStatus === 'typing'}
                size="sm"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Features and Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-lg p-6 shadow-brand">
          <h3 className="font-semibold text-text-primary mb-4">Chat Features</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex items-center space-x-2">
              <span className="text-success">✓</span>
              <span>Instant response during business hours</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-success">✓</span>
              <span>Screen sharing for technical issues</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-success">✓</span>
              <span>File attachment support</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-success">✓</span>
              <span>Chat history saved to your account</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-success">✓</span>
              <span>Multi-language support available</span>
            </li>
          </ul>
        </div>

        <div className="bg-surface rounded-lg p-6 shadow-brand">
          <h3 className="font-semibold text-text-primary mb-4">Response Times</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Business Hours</span>
              <span className="text-sm font-medium text-success">Instant</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">After Hours</span>
              <span className="text-sm font-medium text-warning">Next business day</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Technical Issues</span>
              <span className="text-sm font-medium text-info">Priority queue</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Business Inquiries</span>
              <span className="text-sm font-medium text-info">Specialist referral</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChatSection;