import './App.css';
import {useEffect, useState} from "react";
import useTelegram from "./hooks/useTelegram";
import Form from './components/Pages/Form/Form';
import ChangeForm from './components/Pages/Form/ChangeForm/ChangeForm';
import Cars from './components/Pages/Cars/Cars';
import Partners from './components/Pages/Partners/Partners';
import SearchCar from './components/Pages/SearchCar/SearchCar';
import {Routes, Route} from 'react-router-dom';
import {usePartnersStore, useProductsCountStore, useStickersStore, useUsersStore} from "./services/store";
import Loader from "./components/Loader/Loader";
import {getPartnersData, groupedPartnersFunc} from "./utils/partnersUtils";
import Stickers from "./components/Pages/Stickers/Stickers";
import {getStickersData} from "./utils/stickersUtils";
import {getUsersData} from "./utils/usersUtils";
import BottomNavigationBar from "./components/BottomNavigationBar/BottomNavigationBar";
import Cart from "./components/Pages/Cart/Cart";
import {getProductsData} from "./utils/productsUtils";


function App() {


  const {onToggleButton, tg} = useTelegram();

  const [loaderCars, setLoaderCars] = useState(true);
  const [loaderPartners, setLoaderPartners] = useState(true);
  const [loaderStickers, setLoaderStickers] = useState(true);

  const updateCurrentUser = useUsersStore((state) => state.updateCurrentUser);
  const updateUsers = useUsersStore((state) => state.updateUsers);
  const updatePartners = usePartnersStore((state) => state.updatePartners);
  const updateStickers = useStickersStore((state) => state.updateStickers);
  const updateProductStore = useProductsCountStore((state) => state.updateProductStore);
  const updateProductStoreLoading = useProductsCountStore((state) => state.updateProductStoreLoading);


  useEffect(() => {
    tg.ready();
    // updateCurrentUser(tg?.initDataUnsafe?.user)
  }, [tg])

  useEffect(() => {

    getUsersData()
      .then((res) => {
        setLoaderCars(true);
        return updateUsers(res.data)
      })
      .finally(() => {
        setLoaderCars(false);
      });

    getStickersData()
      .then((res) => {
        setLoaderStickers(true);
        return updateStickers(res.data.files)
      })
      .finally(() => {
        setLoaderStickers(false);
      });

    getPartnersData()
      .then((res) => {
        setLoaderPartners(true);
        return updatePartners(res.data.partners)
      })
      .finally(() => {
        setLoaderPartners(false);
      });

    getProductsData()
      .then((res) => {
        return updateProductStore(res.data)
      })
      .finally(() => {
        updateProductStoreLoading(false);
      });

  }, []);


  const currentUser = useUsersStore((state) => state.currentUser);
  const users = useUsersStore((state) => state.users);
  const partners = usePartnersStore((state) => state.partners);
  const stickers = useStickersStore((state) => state.stickers);
  const userCart = useUsersStore((state) => state.cart);


  const partnersSortedObject = groupedPartnersFunc(partners);

  return (
    <>
      {loaderCars && loaderPartners && loaderStickers ? (
        <Loader/>
      ) : (
        <>
          <div className="page">
            <div className="container">
              <Routes>
                <Route index element={<Cars data={users}/>}/>
                <Route path='/form' element={<Form/>}/>
                <Route path='/form/change' element={<ChangeForm/>}/>
                <Route path='/partners' element={<Partners data={partnersSortedObject}/>}/>
                <Route path='/searchcar' element={<SearchCar data={users}/>}/>
                <Route path='/stickers' element={<Stickers stickers={stickers}/>}/>
                <Route path='/cart' element={<Cart cart={userCart}/>}/>
              </Routes>
            </div>
          </div>
          {
            location.pathname !== '/form' && location.pathname !== '/form/change' ? (
              <div className="bottom-navbar">
                <BottomNavigationBar cart={userCart}/>
              </div>
            ) : null
          }
        </>
      )}
    </>
  );
}

export default App;
