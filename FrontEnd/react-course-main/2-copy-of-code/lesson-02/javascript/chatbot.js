

// ChatMessage function - handles message display logic
function ChatMessage(message, sender) {
  // Same logic as React version but using vanilla JS concepts
  const result = {
    message: message,
    sender: sender,
    hasRobotImage: sender === 'robot',
    hasUserImage: sender === 'user'
  };
  return result;
}

// App function - matches React App structure
function App() {
  // Initialize like React version
  const messages = [
    ChatMessage('hello chatbot', 'user'),
    ChatMessage('Hello! How can I help you?', 'robot'),
    ChatMessage('can you get me todays date?', 'user'),
    ChatMessage('Today is September 27', 'robot')
  ];
  
  console.log('App initialized with:', messages);
}

// Initialize like React version
App();