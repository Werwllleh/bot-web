import './App.css';

import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from './components/Header/Header';
import Form from './components/Form/Form';

import { Route, Routes } from 'react-router-dom';
import Cars from './components/Cars/Cars';



function App() {

  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Cars />} />
        <Route path={'form'} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
