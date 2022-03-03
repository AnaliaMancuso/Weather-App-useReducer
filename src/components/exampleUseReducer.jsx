import React, { useReducer } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Contador />
    </div>
  );
}
const initialValue = { cantidad: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "incremento":
      return { cantidad: state.cantidad + 1 };
    case "decremento":
      return { cantidad: state.cantidad - 1 };
    default:
      throw new Error();
  }
}

function Contador() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <>
      Cantidad: {state.cantidad}
      <button onClick={() => dispatch({ type: "incremento" })}>+</button>
      <button onClick={() => dispatch({ type: "decremento" })}>-</button>
    </>
  );
}
