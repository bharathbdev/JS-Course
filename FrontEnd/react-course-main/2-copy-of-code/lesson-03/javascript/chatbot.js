// Chatbot library from supersimpledev - loaded externally
// Now using: const response = Chatbot.getResponse(inputText);

// State management like React useState
let chatMessages = [{
  message: 'hello chatbot',
  sender: 'user',
  id: 'id1'
}];

let inputText = '';

// ChatInput functionality - matches React version
function ChatInput() {
  const input = document.getElementById('chatInput');
  const button = document.getElementById('sendButton');
  
  // saveInputText equivalent to onChange in React
  function saveInputText(event) {
    inputText = event.target.value;
  }
  
  // sendMessage equivalent to onClick in React
  function sendMessage() {
    // Add user message
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: 'user_' + Date.now()
      }
    ];
    
    chatMessages = newChatMessages;
    
    // Get robot response
    const response = Chatbot.getResponse(inputText);
    chatMessages = [
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: 'robot_' + Date.now()
      }
    ];
    
    // Clear input like setInputText('') in React
    inputText = '';
    input.value = '';
    console.log('new data', chatMessages);
    // Update display
    ChatMessages();
  }
  
  // Set up event listeners
  input.addEventListener('input', saveInputText);
  button.addEventListener('click', sendMessage);
}

// ChatMessage functionality - matches React version
function ChatMessage(message, sender) {
  const div = document.createElement('div');
  
  if (sender === 'robot') {
    const img = document.createElement('img');
    img.src = 'robot.png';
    img.width = 50;
    div.appendChild(img);
  }
  
  const span = document.createElement('span');
  span.textContent = message;
  div.appendChild(span);
  
  if (sender === 'user') {
    const img = document.createElement('img');
    img.src = 'user.png';
    img.width = 50;
    div.appendChild(img);
  }
  
  return div;
}

// ChatMessages functionality - matches React version
function ChatMessages() {
  const container = document.getElementById('chatMessages');
  // Clear existing messages
  container.innerHTML = '';
  
  // Add all messages from state
  chatMessages.forEach((chatMessage) => {
    const messageElement = ChatMessage(chatMessage.message, chatMessage.sender);
    container.appendChild(messageElement);
  });
}

// App functionality - matches React version structure
function App() {
  // Initialize like React version
  ChatInput();
  ChatMessages();
  console.log('Chatbot App initialized with working functionality');
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', App);