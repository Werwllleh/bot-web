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
import {usePartnersStore, useUsersStore} from "./services/store";
import Loader from "./components/Loader/Loader";
import {getPartnersData, groupedPartnersFunc} from "./utils/partnersUtils";


function App() {


  const {onToggleButton, tg} = useTelegram();

  const [loaderCars, setLoaderCars] = useState(true);
  const [loaderPartners, setLoaderPartners] = useState(true);
  const updateUsers = useUsersStore((state) => state.updateUsers);
  const updatePartners = usePartnersStore((state) => state.updatePartners)


  useEffect(() => {
    tg.ready();
  }, [])

  useEffect(() => {
    axios
      .post(SITE + `api/data`)
      .then((res) => {
        setLoaderCars(true);
        return updateUsers(res.data)
      })
      .finally(() => {
        setLoaderCars(false); // После завершения загрузки устанавливаем состояние загрузки в false
      });

  }, []);

  useEffect(() => {
    getPartnersData()
      .then((res) => {
        setLoaderPartners(true);
        return updatePartners(res.data.partners)
      })
      .finally(() => {
        setLoaderPartners(false);
      });
  }, []);

  const users = useUsersStore((state) => state.users);
  const partners = usePartnersStore((state) => state.partners);

  const partnersSortedObject = groupedPartnersFunc(partners);

  return (
    <>
      {loaderCars && loaderPartners ? (
        <Loader />
      ) : (
        <div className="container">
          <Routes>
            <Route index element={<Cars data={users} />} />
            <Route path='/form' element={<Form />} />
            <Route path='/form/change' element={<ChangeForm />} />
            <Route path='/partners' element={<Partners data={partnersSortedObject} />} />
            <Route path='/searchcar' element={<SearchCar data={users} />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
