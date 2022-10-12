import './App.css';

import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Cars from './components/Cars/Cars';
import Partners from './components/Partners/Partners';
import SearchCar from './components/SearchCar/SearchCar';
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
        <Route index element={<Cars />} />
        <Route path={'form'} element={<Form />} />
        <Route path={'partners'} element={<Partners />} />
        <Route path={'searchcar'} element={<SearchCar />} />
      </Routes>
    </div>
  );
}

export default App;
