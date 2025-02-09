import { useState, useEffect } from 'react';

const globalStore = {};
const reducers = {};
const subscribers = {};

export function configureScrova(config) {
  Object.keys(config).forEach((key) => {
    globalStore[key] = config[key].state;
    reducers[key] = {};
    subscribers[key] = new Set();

    Object.keys(config[key].reducers).forEach((funcName) => {
      reducers[key][funcName] = (payload) => {
        const newState = config[key].reducers[funcName](globalStore[key], payload);
        globalStore[key] = { ...globalStore[key], ...newState };
        notify(key);
      };
    });
  });

  const actions = Object.keys(reducers).reduce((acc, key) => {
    acc[key] = Object.keys(reducers[key] || {}).reduce((acc2, func) => {
      acc2[func] = (payload) => reducers[key][func](payload);
      return acc2;
    }, {});
    return acc;
  }, {});

  return { useScrova, actions };
}

function notify(key) {
  if (subscribers[key]) {
    subscribers[key].forEach((callback) => callback());
  }
}

export function useScrova(key, initialState = null) {
  // ✅ If key is null, use local state mode
  if (!key) {
    const [localState, setLocalState] = useState(initialState);
    return [localState, setLocalState];
  }

  // ✅ If key exists, use global store
  if (!reducers[key]) {
    throw new Error(`useScrova: "${key}" state does not exist.`);
  }

  const [state, setState] = useState(() => globalStore[key] ?? null);

  useEffect(() => {
    const callback = () => setState(globalStore[key]);
    subscribers[key].add(callback);
    return () => subscribers[key].delete(callback);
  }, [key]);

  return [
    state,
    (action) =>
      typeof action === "function"
        ? setState((prev) => action(prev))
        : setState((prev) => ({ ...prev, ...action })),
    reducers[key] || {},
  ];
}

