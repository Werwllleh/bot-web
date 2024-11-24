import './App.scss';
import {useEffect, useState} from "react";
import useTelegram from "./hooks/useTelegram";
import Cars from './components/Pages/Cars';
import Partners from './components/Pages/Partners';
import {Routes, Route, useNavigate, Navigate, useLocation, MemoryRouter} from 'react-router-dom';
import {usePartnersStore, useUsersStore} from "./services/store";
import {groupedPartnersFunc} from "./utils/partnersUtils";
import {route} from "./utils/consts";
import Feedback from "./components/Pages/Feedback/Feedback";
import Registration from "./components/Pages/Registration";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {getUserInfo} from "./api/api-users";
import {OnlyAdminRoute, OnlyAuth, OnlyUnAuth} from "./components/Pages/ProtectedRoute";
import Profile from "./components/Pages/Profile";
import NotFound from "./components/Pages/NotFound";
import AdminPanel from "./components/Pages/AdminPages/AdminPanel";
import AdminPartners from "./components/Pages/AdminPages/AdminPartners";
import AdminUsers from "./components/Pages/AdminPages/AdminUsers";
import AdminMeet from "./components/Pages/AdminPages/AdminMeet";


function App() {


  const {tg} = useTelegram();

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
      id: 446012794, //me
      // id: 777777777, //test
      // id: 111777111, //test2
      // id: 111888111, //test3
      // id: 111999111, //test4
      // id: 111000111, //test5
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
            <Route path={route.ADMIN.url} element={<OnlyAdminRoute component={<AdminPanel />} />} />
            <Route path={route.ADMIN_PARTNERS.url} element={<OnlyAdminRoute component={<AdminPartners/>} />}/>
            <Route path={route.ADMIN_USERS.url} element={<OnlyAdminRoute component={<AdminUsers/>} />}/>
            <Route path={route.ADMIN_MEET.url} element={<OnlyAdminRoute component={<AdminMeet/>} />}/>
            <Route path={route.NF_404.url} element={<NotFound />}/>
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
