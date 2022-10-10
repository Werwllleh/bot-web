import './App.css';
import { useEffect } from "react";
// import { useTelegram } from "./hooks/useTelegram";
const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      work
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
