// Chatbot library equivalent - matches React version functionality
const Chatbot = {
  getResponse: function(inputText) {
    // Simple responses like the supersimpledev chatbot library would provide
    const responses = {
      'hello': 'Hello! How can I help you?',
      'hi': 'Hello! How can I help you?',
      'date': 'Today is September 27',
      'time': 'The current time is 3:30 PM',
      'weather': 'It\'s sunny today!',
      'how are you': 'I\'m doing great, thank you for asking!'
    };
    
    const lowerInput = inputText.toLowerCase();
    for (let key in responses) {
      if (lowerInput.includes(key)) {
        return responses[key];
      }
    }
    return 'I\'m not sure how to respond to that. Can you try asking something else?';
  }
};

// State management like React useState
let chatMessages = [{
  message: 'hello chatbot',
  sender: 'user',
  id: 'id1'
}, {
  message: 'Hello! How can I help you?',
  sender: 'robot',
  id: 'id2'
}, {
  message: 'can you get me todays date?',
  sender: 'user',
  id: 'id3'
}, {
  message: 'Today is September 27',
  sender: 'robot',
  id: 'id4'
}];

let inputText = '';

// ChatInput functionality - matches React version with styled elements
function ChatInput() {
  const input = document.getElementById('chatInput');
  const button = document.getElementById('sendButton');
  
  function saveInputText(event) {
    inputText = event.target.value;
  }
  
  function sendMessage() {
    if (inputText.trim() === '') return;
    
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: 'user_' + Date.now()
      }
    ];
    
    chatMessages = newChatMessages;
    
    const response = Chatbot.getResponse(inputText);
    chatMessages = [
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: 'robot_' + Date.now()
      }
    ];
    
    inputText = '';
    input.value = '';
    
    ChatMessages();
    
    // Auto scroll to bottom like React useEffect
    const container = document.getElementById('chatMessages');
    container.scrollTop = container.scrollHeight;
  }
  
  input.addEventListener('input', saveInputText);
  button.addEventListener('click', sendMessage);
  
  // Handle Enter key
  input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
}

// ChatMessage functionality - matches React version with proper CSS classes
function ChatMessage(message, sender) {
  const div = document.createElement('div');
  div.className = sender === 'user' ? 'chat-message-user' : 'chat-message-robot';
  
  if (sender === 'robot') {
    const img = document.createElement('img');
    img.src = 'robot.png';
    img.className = 'chat-message-profile';
    div.appendChild(img);
  }
  
  const textDiv = document.createElement('div');
  textDiv.className = 'chat-message-text';
  textDiv.textContent = message;
  div.appendChild(textDiv);
  
  if (sender === 'user') {
    const img = document.createElement('img');
    img.src = 'user.png';
    img.className = 'chat-message-profile';
    div.appendChild(img);
  }
  
  return div;
}

// ChatMessages functionality - matches React version with auto-scroll
function ChatMessages() {
  const container = document.getElementById('chatMessages');
  container.innerHTML = '';
  
  chatMessages.forEach((chatMessage) => {
    const messageElement = ChatMessage(chatMessage.message, chatMessage.sender);
    container.appendChild(messageElement);
  });
  
  // Auto scroll to bottom after adding messages
  container.scrollTop = container.scrollHeight;
}

// App functionality - matches React version structure
function App() {
  ChatInput();
  ChatMessages();
  console.log('Advanced Chatbot App initialized with full styling');
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', App);