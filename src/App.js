import './App.scss';
import {useEffect, useState} from "react";
import useTelegram from "./hooks/useTelegram";
import Form from './components/Pages/Form/Form';
import ChangeForm from './components/Pages/Form/ChangeForm/ChangeForm';
import Cars from './components/Pages/Cars';
import Partners from './components/Pages/Partners';
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
import {admins, menu, route, userStatusValue} from "./utils/consts";
import Feedback from "./components/Pages/Feedback/Feedback";
import FeedbackList from "./components/Pages/Feedback/FeedbackList";
import Admin from "./components/Pages/Admin/Admin";
import UserList from "./components/Pages/UserList/UserList";
import LocationPage from "./components/Pages/LocationPage/LocationPage";
import Registration from "./components/Pages/Registration";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {getUserInfo} from "./api/api-users";
import {OnlyAuth, OnlyUnAuth} from "./components/Pages/ProtectedRoute";
import Profile from "./components/Pages/Profile";
import NotFound from "./components/Pages/NotFound";


function App() {


  const {onToggleButton, tg} = useTelegram();

  const [loaderCars, setLoaderCars] = useState(true);
  const [loaderPartners, setLoaderPartners] = useState(true);
  const [loaderStickers, setLoaderStickers] = useState(true);

  const userTelegramData = useUsersStore((state) => state.userTelegramData);

  const updateUserTelegramData = useUsersStore((state) => state.updateUserTelegramData);
  const updateUserData = useUsersStore((state) => state.updateUserData);
  const updateUsers = useUsersStore((state) => state.updateUsers);
  const updateUsersCars = useUsersStore((state) => state.updateUsersCars);
  const updateAuthChecked = useUsersStore((state) => state.updateAuthChecked);



  const updatePartners = usePartnersStore((state) => state.updatePartners);

  const userData = useUsersStore((state) => state.userData);

  const partners = usePartnersStore((state) => state.partners);

  useEffect(() => {
    tg.ready();
    tg.expand();

    // updateCurrentUser(tg?.initDataUnsafe?.user)
    updateUserTelegramData({
      allows_write_to_pm: true,
      first_name: "Lesha",
      // id: 446012794, //me
      // id: 777777777, //test
      // id: 111777111, //test2
      // id: 111888111, //test3
      // id: 111999111, //test4
      id: 111000111, //test5
      // id: 361881710,
      language_code: "en",
      last_name: "",
      username: "all_lllll"
    })
    updateAuthChecked(true)

  }, [tg])

  useEffect(() => {
    if (userTelegramData?.id) {

      getUserInfo(userTelegramData?.id).then(res => {
        if (res.data !== '') {
          updateUserData(res.data)
        }
      })
    }
  }, [userTelegramData]);

  useEffect(() => {
    updateUsers();
    updateUsersCars()
  }, [updateUsers, updateUsersCars]);

  /*useEffect(() => {
    console.log(userData)
  }, [userData]);*/

  /*useEffect(() => {
    const isAdmin = productsData.some(user => currentUser?.id === Number(user.chatId));
    const newUserStatus = isAdmin ? userStatusValue.ADMIN : userStatusValue.USER;
    updateUserStatus(newUserStatus);
  }, [userStatus, currentUser, productsData]);*/

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

  const headerColor = Object.values(route).filter(item => item?.url === pathname)[0]?.color;


  return (
    <>
      <Header color={headerColor}/>
      <main className="main">
        <div className="content">
          <Routes>
            <Route index element={<OnlyAuth component={<Cars />} />}/>
            <Route path={route.PARTNERS.url} element={<OnlyAuth component={<Partners data={partnersSortedObject}/>} />}/>
            <Route path={route.PROFILE.url} element={<OnlyAuth component={<Profile />} />}/>
            <Route path={route.REGISTER.url} element={<OnlyUnAuth component={<Registration/>}/>}/>
            <Route path={route.NF_404.url} element={<NotFound />}/>
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
