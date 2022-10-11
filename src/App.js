import './App.css';
import { useEffect } from "react";
// import { useTelegram } from "./hooks/useTelegram";

function App() {

  useEffect(() => {
    tg.ready();
  }, [])

  

  return (
    <div className="App">
      work
    </div>
  );
}

export default App;
