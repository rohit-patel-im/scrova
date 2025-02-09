# Scrova 🚀  
🔥 Scrova - The Next-Gen State Management Library for React

📌 Fast, Simple, Zero Boilerplate, and High-Performance State Management

## 🚀 Features
✅ **Zero Boilerplate** – Easier than Redux Toolkit  
✅ **Global & Local State Management** – Best combo of Zustand and Redux  
✅ **Auto Reducers & Actions** – Automatically handles reducers  
✅ **Optimized Performance** – No unnecessary re-renders  
✅ **Works Inside & Outside React Components**  
✅ **Middleware & Async Handling Support**  

## 📌 Installation
```
npm install scrova

or

yarn add scrova
```
## 📌 Quick Example

```javascript
import { useScrova, actions } from "scrova";

function Counter() {
  const [count, setCount] = useScrova("counter");

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(actions.counter.increment())}>+1</button>
    </div>
  );
}

```
## 📌 Full Usage Guide

✅ Step 1: Setup Global Store (Optional)

If you need a Global Store, define it here.

If only Local State is required, you can skip this step.

```javascript
import { configureScrova } from "scrova";

// 🟢 Setup Global Store with Reducers
export const { useScrova, actions } = configureScrova({
  counter: {
    state: 0,
    reducers: {
      increment: (state) => state + 1,
      decrement: (state) => state - 1,
      incrementByAmount: (state, payload) => state + payload,
    },
  },
  user: {
    state: { name: "Guest", email: "" },
    reducers: {
      updateUser: (state, payload) => ({ ...state, ...payload }),
    },
  },
  theme: {
    state: "light",
    reducers: {
      toggleTheme: (state) => (state === "light" ? "dark" : "light"),
    },
  },
});
```
Now store is ready

✅ Step 2: Using Scrova in Components

🔹 Example 1: Counter with Global State
```javascript
import { useScrova, actions } from "./store";

function Counter() {
  const [count, setCount] = useScrova("counter");

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(actions.counter.increment())}>+1</button>
      <button onClick={() => setCount(actions.counter.decrement())}>-1</button>
      <button onClick={() => setCount(actions.counter.incrementByAmount(5))}>+5</button>
    </div>
  );
}
```
✔ Now it's as simple as Zustand + Redux Toolkit! 🚀

🔹 Example 2: User Profile with Reducers
```javascript
import { useScrova, actions } from "./store";

function UserProfile() {
  const [user, setUser] = useScrova("user");

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={() => setUser(actions.user.updateUser({ name: "John Doe" }))}>
        Change Name
      </button>
    </div>
  );
}
```
✔ Now the User Profile will stay in sync across the entire app! 🎯

🔹 Example 3: Theme Toggle
```javascript
import { useScrova, actions } from "./store";

function ThemeToggle() {
  const [theme, setTheme] = useScrova("theme");

  return (
    <button onClick={() => setTheme(actions.theme.toggleTheme())}>
      Toggle Theme ({theme})
    </button>
  );
}
```
✔ Now the Theme will be controlled from a single state across the entire app! 🎯

✅ Step 3: Using Scrova for Local State (Like useState)

If you only need Local State, you can use useScrova() without configureScrova()!

```javascript
import { useScrova } from "scrova";

function LocalCounter() {
  const [count, setCount] = useScrova(null, 0); // 🔥 Local State Mode

  return (
    <div>
      <h2>Local Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```
✔ Now you’ll get Zustand-like simple behavior, without any extra setup!

✅ Step 4: Using Scrova Outside React (For APIs, Event Listeners)

Now you can use Scrova for Event Listeners and API Calls as well!

```javascript
import { getScrovaState, setScrovaState } from "scrova";

// 🔹 Event Listener से State Access करना
document.addEventListener("keydown", (event) => {
  const theme = getScrovaState("theme");
  console.log(`Current Theme: ${theme}`);
});

// 🔹 API Call में State Set करना
async function fetchUserData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await res.json();
  setScrovaState("user", data);
}
```
✔ Now Scrova is not just limited to React—it will also work with APIs and Events! 🚀

## 📌 Performance Optimization
Scrova is optimized for High Performance:

✔ No Unnecessary Renders  
✔ Memory Efficient  
✔ Optimized for Large-Scale Apps  

## 📌 Comparison: Redux Toolkit vs Zustand vs Scrova
| Feature                         | Redux Toolkit | Zustand | Scrova 🚀       |
|---------------------------------|--------------|---------|-----------------|
| Global State?                   | ✅ Yes       | ✅ Yes  | ✅ Yes          |
| Local State?                    | ❌ No        | ✅ Yes  | ✅ Yes          |
| Slice-Based Structure?          | ✅ Yes       | ❌ No   | ✅ Yes (Auto)   |
| Boilerplate Required?           | ❌ Too Much  | ✅ Minimal | ✅ Super Minimal |
| Reducer Functions Auto Generated? | ❌ No     | ❌ No   | ✅ Yes          |
| Middleware Support?             | ✅ Yes       | ✅ Yes  | ✅ Yes          |
| Async Handling?                 | ✅ Yes (Thunk) | ❌ No   | ✅ Yes (Built-in) |
| Works Outside React?            | ❌ No        | ❌ No   | ✅ Yes          |
| Unnecessary Renders Removed?    | ❌ No        | ❌ No   | ✅ Yes          |
| Reactivity Speed                | 🚀 Fast      | ⚡ Medium | ⚡⚡ Super Fast  |
| Memory Usage                    | 🔴 High      | 🟡 Medium | 🟢 Low          |
| Instant State Updates?          | ❌ No        | ✅ Yes  | ✅ Yes (Super Fast) |
| Enterprise-Level Performance?   | ❌ No        | ❌ No   | ✅ Yes          |


## 📌 Final Thoughts
🔥 Scrova is the best combo of Zustand + Redux Toolkit!

✅ **Global + Local State in One Hook**  
✅ **Zero Boilerplate**  
✅ **Works Inside & Outside React**  
✅ **High Performance & Optimized**  
✅ **Enterprise-Level State Management**  

## 📌 Contributors
🎯 Maintainer: Rohit Patel
🔗 GitHub Repo: [Scrova on GitHub](https://github.com/rohit-patel-im/scrova)

📢 Pull Requests & Issues Welcome! 🚀

## 🚀 Ready to Use Scrova?
```
npm install scrova

```
🔥 Now Build Faster & Smarter with Scrova! 🚀





