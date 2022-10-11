import './App.css';
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Button from './components/Button/Button';
import Header from './components/Header/Header';
import Form from './components/Form/Form';

import { Route, Routes } from 'react-router-dom';



function App() {

  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={'form'} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
