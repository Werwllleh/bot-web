import React, {useEffect} from "react";
import useTelegram from "./hooks/useTelegram";
import Cars from './components/Pages/Cars';
import Partners from './components/Pages/Partners';
import {Routes, Route, useNavigate, useLocation, Navigate} from 'react-router-dom';
import {usePartnersStore, useUsersStore} from "./services/store";
import {groupedPartnersFunc} from "./utils/partnersUtils";
import {route} from "./utils/consts";
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
import AdminPartnersCategories from "./components/Pages/AdminPages/AdminPartnersCategories";
import AdminPartnersAll from "./components/Pages/AdminPages/AdminPartnersAll";
import {checkObject} from "./utils/checkObject";
import Meet from "./components/Pages/Meet";
import {YMaps} from "@pbe/react-yandex-maps";



function App() {


  const {tg, user} = useTelegram();

  const userTelegramData = useUsersStore((state) => state.userTelegramData);

  const updateUserTelegramData = useUsersStore((state) => state.updateUserTelegramData);
  const updateUserData = useUsersStore((state) => state.updateUserData);
  const updateUsers = useUsersStore((state) => state.updateUsers);
  const updateUsersCars = useUsersStore((state) => state.updateUsersCars);
  const updateAuthChecked = useUsersStore((state) => state.updateAuthChecked);

  const updatePartnersUsers = usePartnersStore((state) => state.updatePartnersUsers);
  const updatePartnersAdmin = usePartnersStore((state) => state.updatePartnersAdmin);
  const updatePartnersCategories = usePartnersStore((state) => state.updatePartnersCategories);


  const userData = useUsersStore((state) => state.userData);

  const partners = usePartnersStore((state) => state.partnersListUsers);

  useEffect(() => {
    updateUsers();
    updateUsersCars();
    updatePartnersUsers()
    updatePartnersCategories();
  }, [updateUsers, updateUsersCars, updatePartnersUsers, updatePartnersCategories]);


  useEffect(() => {
    tg.ready();
    tg.expand();

    console.log(tg);
    console.log(tg?.initDataUnsafe?.user);

    updateUserTelegramData(tg?.initDataUnsafe?.user)
    /*updateUserTelegramData({
      allows_write_to_pm: true,
      first_name: "Lesha",
      // id: process.env.REACT_APP_ADMIN_CHAT_ID,
      id: 3, //test
      language_code: "en",
      last_name: "",
      username: ""
    })*/

    setTimeout(() => {
      updateAuthChecked(true)
    }, 1200)


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

    if (userData.user_admin) {
      updatePartnersAdmin()
    }

    // console.log(userData)
  }, [userData]);

  const navigate = useNavigate();

  const partnersSortedObject = groupedPartnersFunc(partners);

  const {pathname} = useLocation();

  const headerColor = Object.values(route).filter(item => item?.url === pathname)[0]?.color;


  return (
    <YMaps query={{
      apikey: process.env.REACT_APP_YANDEX_VERIFICATION,
      ns: "use-load-option",
      load: "package.full"
    }}>
      <Header color={headerColor}/>
      <main className="main">
        <div className="content">
          <Routes>
            <Route index element={<OnlyAuth component={<Cars/>}/>}/>
            <Route path={route.PARTNERS.url} element={<OnlyAuth component={<Partners data={partnersSortedObject}/>}/>}/>
            <Route path={route.PROFILE.url} element={<OnlyAuth component={<Profile/>}/>}/>
            <Route path={route.MEET.url} element={<OnlyAuth component={<Meet/>}/>}/>
            <Route path={route.REGISTER.url} element={<OnlyUnAuth component={<Registration/>}/>}/>
            <Route path={route.NF_404.url} element={<NotFound/>}/>
            <Route path={route.ADMIN.url} element={<OnlyAdminRoute component={<AdminPanel/>}/>}/>
            <Route path={route.ADMIN_PARTNERS.url} element={<OnlyAdminRoute component={<AdminPartners/>}/>}/>
            <Route path={`${route.ADMIN_PARTNERS.url}/all`} element={<OnlyAdminRoute component={<AdminPartnersAll/>}/>}/>
            <Route path={`${route.ADMIN_PARTNERS.url}/categories`} element={<OnlyAdminRoute component={<AdminPartnersCategories/>}/>}/>
            <Route path={route.ADMIN_USERS.url} element={<OnlyAdminRoute component={<AdminUsers/>}/>}/>
            <Route path={route.ADMIN_MEET.url} element={<OnlyAdminRoute component={<AdminMeet/>}/>}/>
          </Routes>
        </div>
      </main>
      <Footer/>
    </YMaps>
  );
}

export default App;
