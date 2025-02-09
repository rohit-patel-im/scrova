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
        const currentState = globalStore[key];
        const newState = config[key].reducers[funcName](currentState, payload);
        globalStore[key] = newState;
        notify(key);
      };
    });
  });

  const actions = Object.keys(reducers).reduce((acc, key) => {
    acc[key] = Object.keys(reducers[key]).reduce((acc2, func) => {
      acc2[func] = (payload) => reducers[key][func](payload);
      return acc2;
    }, {});
    return acc;
  }, {});

  return { useScrova, actions };
}

function notify(key) {
  subscribers[key]?.forEach(callback => callback());
}

export function useScrova(key, initialState) {
  // Local state mode
  if (key === null) {
    return useState(initialState);
  }

  // Global state mode
  if (!key || !globalStore.hasOwnProperty(key)) {
    throw new Error(`useScrova: "${key}" state does not exist.`);
  }

  const [state, setLocalState] = useState(globalStore[key]);

  useEffect(() => {
    const callback = () => setLocalState(globalStore[key]);
    subscribers[key].add(callback);
    return () => subscribers[key].delete(callback);
  }, [key]);

  const setGlobalState = (update) => {
    const newState = typeof update === 'function'
      ? update(globalStore[key])
      : update;
    globalStore[key] = newState;
    notify(key);
  };

  return [state, setGlobalState];
}

// External access functions
export function getScrovaState(key) {
  return globalStore[key];
}

export function setScrovaState(key, newValue) {
  if (globalStore.hasOwnProperty(key)) {
    globalStore[key] = newValue;
    notify(key);
  } else {
    console.error(`Scrova: Key "${key}" not found.`);
  }
}