import './App.css';
import {useEffect, useState} from "react";
import useTelegram from "./hooks/useTelegram";
import Form from './components/Pages/Form/Form';
import ChangeForm from './components/Pages/Form/ChangeForm/ChangeForm';
import Cars from './components/Pages/Cars/Cars';
import Partners from './components/Pages/Partners/Partners';
import SearchCar from './components/Pages/SearchCar/SearchCar';
import {Routes, Route} from 'react-router-dom';
import axios from "axios";
import {SITE} from "./utils/consts";
import {useUsersStore} from "./services/store";
import Loader from "./components/Loader/Loader";


function App() {


  const {onToggleButton, tg} = useTelegram();

  const [loader, setLoader] = useState(true);
  const updateUsers = useUsersStore((state) => state.updateUsers)


  useEffect(() => {
    tg.ready();
  }, [])

  useEffect(() => {

    axios
      .post(SITE + `api/data`)
      .then((res) => {
        setLoader(true);
        return updateUsers(res.data)
      })
      .finally(() => {
        setLoader(false); // После завершения загрузки устанавливаем состояние загрузки в false
      });

  }, []);

  const users = useUsersStore((state) => state.users);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="container">
          <Routes>
            <Route index element={<Cars />} />
            <Route path='/form' element={<Form />} />
            <Route path='/form/change' element={<ChangeForm />} />
            <Route path='/partners' element={<Partners />} />
            <Route path='/searchcar' element={<SearchCar data={users} />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
