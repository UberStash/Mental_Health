import { useState } from "react";

// Controls flow of state and transitions
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(input, replace) {
    replace
      ? (history[history.length - 1] = input)
      : setHistory((prev) => [...prev, input]);
    setMode(input);
  }

  function back() {
    history.length > 1 && history.pop();
    setMode(history[history.length - 1]);
  }

  return { mode, transition, back };
}
