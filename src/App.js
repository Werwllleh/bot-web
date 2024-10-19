import './App.scss';
import {useEffect, useState} from "react";
import useTelegram from "./hooks/useTelegram";
import Form from './components/Pages/Form/Form';
import ChangeForm from './components/Pages/Form/ChangeForm/ChangeForm';
import Cars from './components/Pages/Cars/Cars';
import Partners from './components/Pages/Partners/Partners';
import SearchCar from './components/Pages/SearchCar/SearchCar';
import {Routes, Route, useNavigate, Navigate, useLocation, MemoryRouter} from 'react-router-dom';
import {usePartnersStore, useProductsCountStore, useStickersStore, useUsersStore} from "./services/store";
import Loader from "./components/Loader/Loader";
import {getPartnersData, groupedPartnersFunc} from "./utils/partnersUtils";
import Stickers from "./components/Pages/Stickers/Stickers";
import {getStickersData} from "./utils/stickersUtils";
import {getUsersData} from "./utils/usersUtils";
import BottomNavigationBar from "./components/BottomNavigationBar/BottomNavigationBar";
import Cart from "./components/Pages/Cart/Cart";
import {getProductsData} from "./utils/productsUtils";
import {Result} from "antd";
import {admins, menu, userStatusValue} from "./utils/consts";
import Feedback from "./components/Pages/Feedback/Feedback";
import FeedbackList from "./components/Pages/Feedback/FeedbackList";
import Admin from "./components/Pages/Admin/Admin";
import UserList from "./components/Pages/UserList/UserList";
import LocationPage from "./components/Pages/LocationPage/LocationPage";
import Registration from "./components/Pages/Registration/Registration";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


function App() {


  const {onToggleButton, tg} = useTelegram();

  const [loaderCars, setLoaderCars] = useState(true);
  const [loaderPartners, setLoaderPartners] = useState(true);
  const [loaderStickers, setLoaderStickers] = useState(true);

  const updateCurrentUser = useUsersStore((state) => state.updateCurrentUser);
  const updateUserStatus = useUsersStore((state) => state.updateUserStatus);
  const updateUsers = useUsersStore((state) => state.updateUsers);
  const updatePartners = usePartnersStore((state) => state.updatePartners);
  const updateStickers = useStickersStore((state) => state.updateStickers);
  const updateProductStore = useProductsCountStore((state) => state.updateProductStore);
  const updateProductStoreLoading = useProductsCountStore((state) => state.updateProductStoreLoading);


  const productsData = useProductsCountStore((state) => state.productStore);
  const currentUser = useUsersStore((state) => state.currentUser);
  const users = useUsersStore((state) => state.users);
  const partners = usePartnersStore((state) => state.partners);
  const stickers = useStickersStore((state) => state.stickers);
  const userCart = useUsersStore((state) => state.cart);
  const userStatus = useUsersStore((state) => state.userStatus);


  useEffect(() => {
    tg.ready();
    tg.expand();

    updateCurrentUser(tg?.initDataUnsafe?.user)
    // updateCurrentUser({
    //   allows_write_to_pm: true,
    //   first_name: "Lesha",
    //   id: 446012794,
    //   // id: 361881710,
    //   language_code: "en",
    //   last_name: "",
    //   username: "all_lllll"
    // })

  }, [tg])

  useEffect(() => {
    const isAdmin = productsData.some(user => currentUser?.id === Number(user.chatId));
    const newUserStatus = isAdmin ? userStatusValue.ADMIN : userStatusValue.USER;
    updateUserStatus(newUserStatus);
  }, [userStatus, currentUser, productsData]);

  useEffect(() => {
    // console.log(userStatus)
    // updateUserStatus()
  }, [userStatus]);

  /*useEffect(() => {

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


  }, []);*/

  const navigate = useNavigate();



  const partnersSortedObject = groupedPartnersFunc(partners);

  const {pathname} = useLocation();
  const headerTitle = menu.filter(item => item.url === pathname)[0].title;


  return (
    <>
      <Header title={headerTitle}/>
      <main className="main">
        <div className="content">
          <Routes>
            <Route index element={<Cars data={users}/>}/>
            <Route path='/partners' element={<Partners data={partnersSortedObject}/>}/>
            <Route path='/registration' element={<Registration/>}/>
          </Routes>
        </div>
      </main>
      <Footer />
      {/*{
        currentUser === undefined && location.pathname.startsWith('/form') ? (
          <div className="page">
            <Routes>
              <Route path='/form' element={<Form/>}/>
            </Routes>
          </div>
        ) : currentUser !== undefined && currentUser !== null ? (
          <>
            {loaderCars && loaderPartners && loaderStickers ? (
              <Loader/>
            ) : (
              <>
                <div className="page">
                  <Routes>
                    <Route index element={<Cars data={users}/>}/>
                    <Route path='/form/change' element={<ChangeForm/>}/>
                    <Route path='/partners' element={<Partners data={partnersSortedObject}/>}/>
                    <Route path='/searchcar' element={<SearchCar data={users}/>}/>
                    <Route path='/stickers' element={<Stickers stickers={stickers}/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/feedback' element={<Feedback/>}/>
                    {admin && (
                      <>
                        <Route path='/admin' element={<Admin/>}/>
                        <Route path='/feedback-list' element={<FeedbackList/>}/>
                        <Route path='/user-list' element={<UserList/>}/>
                        <Route path='/notification' element={<LocationPage/>}/>
                      </>
                    )}
                  </Routes>
                </div>
                {
                  !location.pathname.startsWith('/form') ? (
                    <div className="bottom-navbar">
                      <BottomNavigationBar cart={userCart}/>
                    </div>
                  ) : null
                }
              </>
            )}
          </>
        ) : (
          <Result
            status="403"
            title="403"
            subTitle={
              <>
                Упс... Вы неавторизованный пользователь, используйте
                <a className={"ant-result__invite"} target={"_blank"}
                   href={"https://t.me/VW21ClubBot"}>Telegram-bot</a>
              </>
            }
          />
        )
      }*/}
    </>
  );
}

export default App;
