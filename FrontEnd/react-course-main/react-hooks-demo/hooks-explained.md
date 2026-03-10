# useContext vs useMemo vs useCallback

---

## useContext — pass data anywhere without props

### ❌ Problem — prop drilling is painful

```jsx
function App() {
  const user = "Alice";
  return <Layout user={user} />; // pass down...
}
function Layout({ user }) {
  return <Profile user={user} />; // pass down again...
}
function Profile({ user }) {
  return <p>Hello, {user}</p>; // finally used here
}
```

### ✅ Solution — useContext

```jsx
const UserCtx = createContext();

function App() {
  return (
    <UserCtx.Provider value="Alice">
      <Profile /> // no props needed
    </UserCtx.Provider>
  );
}
function Profile() {
  const user = useContext(UserCtx); // read directly, anywhere in tree
  return <p>Hello, {user}</p>;
}
```

---

## useMemo — cache a calculated value

### ❌ Problem — slow calc runs on every render

```jsx
function App({ nums }) {
  const total = nums.reduce((a, b) => a + b, 0); // runs even if nums didn't change
  return <p>{total}</p>;
}
```

### ✅ Solution — useMemo

```jsx
function App({ nums }) {
  const total = useMemo(
    () => nums.reduce((a, b) => a + b, 0), // only runs when nums changes
    [nums],
  );
  return <p>{total}</p>;
}
```

> Think of it as: **"remember this VALUE"**

---

## useCallback — cache a function reference

### ❌ Problem — new function on every render = child re-renders for no reason

```jsx
function App() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1); // new function every render
  return <Button onClick={increment} />; // Button re-renders every time
}
```

### ✅ Solution — useCallback

```jsx
function App() {
  const [count, setCount] = useState(0);
  const increment = useCallback(
    () => setCount((c) => c + 1), // same function reference across renders
    [],
  );
  return <Button onClick={increment} />; // Button only re-renders when it needs to
}
```

> Think of it as: **"remember this FUNCTION"**

---

## One-line summary

| Hook          | Remembers                      | Re-creates when       |
| ------------- | ------------------------------ | --------------------- |
| `useContext`  | shared value from Provider     | context value changes |
| `useMemo`     | a **value** from a calculation | deps change           |
| `useCallback` | a **function**                 | deps change           |

> `useMemo` and `useCallback` are the same idea — one caches a value, the other caches a function.
