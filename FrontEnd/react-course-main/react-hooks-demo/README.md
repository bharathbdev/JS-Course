# React Hooks Progressive Learning - 4 File Demo Series

This project teaches React hooks through 4 progressive files, each building upon the previous one. Perfect for beginners to learn `useState`, `useEffect`, and `useContext` step by step.

## 🎯 Progressive Learning Structure

### 📝 [Demo 1: useState Hook](demo1-useState.html)

- **Focus**: Basic state management only
- **Form Fields**: Name, Age, Password
- **Features**: Live state preview, controlled inputs
- **Code Added**: `useState` hooks for each field

### 🔄 [Demo 2: useState + useEffect](demo2-useEffect.html)

- **Previous Code**: All Demo 1 code included
- **Focus**: Add submit functionality with side effects
- **New Features**:
  - Submit button with loading states
  - Dummy API simulation (2-second delay)
  - User list display
  - Auto-clearing messages
  - Component lifecycle management

### 🛣️ [Demo 3: useState + useEffect + Router](demo3-router.html)

- **Previous Code**: All Demo 1 + Demo 2 code included
- **Focus**: Add navigation between pages
- **New Features**:
  - React Router implementation
  - Register page (Name, Age, Password)
  - Sign In page (Name, Password only)
  - Navigation between pages
  - Link components

### 🌟 [Demo 4: Complete App with useContext](demo4-complete.html)

- **Previous Code**: All Demo 1 + Demo 2 + Demo 3 code included
- **Focus**: Global state management and authentication
- **New Features**:
  - `useContext` for global auth state
  - **🟢 Green indicator** when user logs in
  - **🔴 Red indicator** when user logs out
  - Dashboard page with dummy data
  - Protected routes
  - Complete login/logout flow

## 🚀 How to Start

1. **Start Here**: Open [demo-index.html](demo-index.html) for an overview
2. **Begin Learning**: Start with [Demo 1](demo1-useState.html)
3. **Progress Sequentially**: Each demo builds on the previous one
4. **No Installation**: Just open HTML files in your browser!

## 📁 File Structure

```
react-hooks-demo/
├── demo-index.html           # 📋 Overview and navigation
├── demo1-useState.html       # 📝 Basic useState
├── demo2-useEffect.html      # 🔄 + useEffect & submit
├── demo3-router.html         # 🛣️ + React Router & signin
├── demo4-complete.html       # 🌟 + useContext & dashboard
└── README.md                # 📖 This file
```

- Managing global application state
- Visual feedback based on context state (green/red status)

### Demo 4: Complete App with Router

- **File**: Full application with routing
- **Concepts**:
  - Protected routes
  - Navigation between pages
  - Dashboard with dummy data
  - Route-based access control

**What you'll learn:**

- How to implement React Router
- Creating protected routes
- Navigation and redirects
- Building a complete user flow

## How to Run

1. **Simple Method**: Just open `index.html` in your browser
   - Double-click the file
   - Or use Live Server in VS Code

2. **With Local Server** (recommended):

   ```bash
   # If you have Python installed
   python -m http.server 8000

   # Or if you have Node.js
   npx serve .

   # Then visit http://localhost:8000
   ```

## Project Structure

```
react-hooks-demo/
├── index.html          (Complete demo with all 4 examples)
└── README.md          (This file)
```

## Navigation

- **Demo 1**: Basic useState with name and age inputs
- **Demo 2**: useState + useEffect with signup form and API simulation
- **Demo 3**: useContext with login/logout (shows green when logged in, red when logged out)
- **Demo 4**: Complete app with React Router and protected dashboard

## Key Learning Points

### useState

```javascript
const [state, setState] = useState(initialValue);
```

- Manages component-level state
- Triggers re-render when state changes
- Can store any data type

### useEffect

```javascript
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]); // Dependencies array
```

- Runs after every render (if no dependencies)
- Runs only when dependencies change (if dependencies array provided)
- Runs only once (if empty dependencies array)

### useContext

```javascript
const value = useContext(MyContext);
```

- Consumes context value
- Avoids prop drilling
- Shares state across component tree

## API Simulation

The project uses `setTimeout` and `Promise` to simulate real API calls:

- Signup: 2-second delay
- Login: 1.5-second delay
- Dashboard data: 1-second delay

## Bootstrap Styling

All styling uses Bootstrap 5 classes loaded via CDN:

- Cards for component containers
- Forms for input styling
- Alerts for status messages
- Buttons for interactive elements

## Tips for Beginners

1. **Start with Demo 1** to understand useState basics
2. **Check browser console** in Demo 2 to see useEffect logs
3. **Try logging in/out** in Demo 3 to see context state changes
4. **Navigate between routes** in Demo 4 to understand routing

## Next Steps

After understanding these demos:

1. Try modifying the state structure
2. Add new form fields
3. Create additional context providers
4. Add more routes and components
5. Experiment with different useEffect dependency arrays

## No Installation Required

This project uses CDN links for:

- React 18
- ReactDOM 18
- React Router DOM 6
- Bootstrap 5
- Babel (for JSX transformation)

Just open `index.html` in your browser and start learning!
