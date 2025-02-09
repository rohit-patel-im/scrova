# Scrova 🚀  
**Next-Gen State Management for React (Fast, Simple, Zero Boilerplate)**  

## ✨ Features
✅ **Minimal API** – Redux Toolkit से आसान  
✅ **Zero Boilerplate** – Zustand से भी Simple  
✅ **High Performance** – No Unnecessary Renders  

## 🚀 Installation
```bash
npm install scrova


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
---
