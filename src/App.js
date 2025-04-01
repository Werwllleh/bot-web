import React, {useEffect, useState} from "react";
import useTelegram from "./hooks/useTelegram";
import Cars from './components/Pages/Cars';
import Partners from './components/Pages/Partners';
import {Routes, Route, useNavigate, useLocation, Outlet} from 'react-router-dom';
import {useMeetStore, usePartnersStore, useUsersStore} from "./services/store";
import {groupedPartnersFunc} from "./utils/partnersUtils";
import {API_BASE, route} from "./utils/consts";
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
import Meet from "./components/Pages/Meet";
import {YMaps} from "@pbe/react-yandex-maps";
import SnowMode from "./components/snow-mode";
import AttributeDetail from "./components/Pages/Attributes/AttributeDetail";
import Attributes from "./components/Pages/Attributes/Attributes";

import {ReactInternetSpeedMeter} from "react-internet-meter";
import 'react-internet-meter/dist/index.css';
import LowInternet from "./components/low-internet";
import {checkObject} from "./utils/checkObject";
import Loader from "./components/Loader/Loader";
import NoLogin from "./components/no-login";

function App() {


  const {tg, user} = useTelegram();

  const {
    userTelegramData,
    updateUserTelegramData,
    userData,
    updateUserData,
    updateUsers,
    updateUsersCars,
    updateAuthChecked
  } = useUsersStore();

  const {updatePartnersUsers, updatePartnersAdmin, updatePartnersCategories} = usePartnersStore();

  const {updateMeetData} = useMeetStore();


  useEffect(() => {
    updateMeetData();
    updateUsers();
    updateUsersCars();
    updatePartnersUsers();
    updatePartnersCategories();
  }, []);


  useEffect(() => {
    /*console.log(tg);
    console.log(tg?.initDataUnsafe?.user)*/
    tg.ready();
    tg.expand();

    /*console.log(tg);
    console.log(tg?.initDataUnsafe?.user);*/

    /*updateUserTelegramData({
      allows_write_to_pm: true,
      first_name: "Lesha",
      id: process.env.REACT_APP_ADMIN_CHAT_ID,
      // id: 000, //test
      language_code: "en",
      last_name: "",
      username: ""
    })*/

    if (tg?.initDataUnsafe?.user !== undefined) {
      updateUserTelegramData(tg?.initDataUnsafe?.user)
    }


  }, [tg])

  useEffect(() => {
    const fetchUser = async (telegramId) => {
      try {
        const {status, data} = await getUserInfo(telegramId);

        if (status === 200 && checkObject(data)) {
          updateUserData(data);
          updateAuthChecked(true);
        }
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    };

    if (userTelegramData?.id) {
      fetchUser(userTelegramData.id);
    }
  }, [userTelegramData]);

  useEffect(() => {

    if (userData.user_admin) {
      updatePartnersAdmin()
    }

  }, [userData]);

  const {pathname} = useLocation();

  const headerColor = Object.values(route).filter(item => item?.url === pathname)[0]?.color;


  const [wifiSpeed, setWifiSpeed] = useState(0);

  /*useEffect(() => {
    console.log(wifiSpeed)
  }, [wifiSpeed]);*/


  return (
    <>
      {/*<ReactInternetSpeedMeter
        txtSubHeading="Наблюдается медленное соединение"
        outputType="alert"
        customClassName={"internet-alert"}
        txtMainHeading="Что-то пошло не так..."
        pingInterval={7000} // milliseconds
        thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte"
        threshold={1}
        imageUrl={`${API_BASE}/bot/test_image.jpg`}
        downloadSize="1101004"  //bytes
        callbackFunctionOnNetworkDown={(speed) => console.log(`Internet speed is down ${speed}`)}
        callbackFunctionOnNetworkTest={(speed) => setWifiSpeed(speed)}
      />*/}
      <YMaps query={{
        apikey: process.env.REACT_APP_YANDEX_VERIFICATION,
        ns: "use-load-option",
        load: "package.full"
      }}>
        {/*<SnowMode/>*/}
        <Header color={headerColor}/>
        {!checkObject(userTelegramData) ? (
          <main className="main">
            <NoLogin />
          </main>
        ) : (
          <main className="main">
            <div className="content">
              <Routes>
                <Route index element={<OnlyAuth component={<Cars/>}/>}/>
                <Route path={route.PARTNERS.url}
                       element={<OnlyAuth component={<Partners/>}/>}/>
                <Route path={route.PROFILE.url} element={<OnlyAuth component={<Profile/>}/>}/>
                <Route path={route.MEET.url} element={<OnlyAuth component={<Meet/>}/>}/>
                <Route path={route.ATTRIBUTES.url} element={<OnlyAuth component={<Attributes/>}/>}>
                  <Route path=":slug" element={<AttributeDetail/>}/>
                </Route>
                <Route path={route.REGISTER.url} element={<OnlyUnAuth component={<Registration/>}/>}/>
                <Route path={route.NF_404.url} element={<NotFound/>}/>
                <Route path={route.ADMIN.url} element={<OnlyAdminRoute component={<AdminPanel/>}/>}/>
                <Route path={route.ADMIN_PARTNERS.url} element={<OnlyAdminRoute component={<AdminPartners/>}/>}/>
                <Route path={`${route.ADMIN_PARTNERS.url}/all`}
                       element={<OnlyAdminRoute component={<AdminPartnersAll/>}/>}/>
                <Route path={`${route.ADMIN_PARTNERS.url}/categories`}
                       element={<OnlyAdminRoute component={<AdminPartnersCategories/>}/>}/>
                <Route path={route.ADMIN_USERS.url} element={<OnlyAdminRoute component={<AdminUsers/>}/>}/>
                <Route path={route.ADMIN_MEET.url} element={<OnlyAdminRoute component={<AdminMeet/>}/>}/>
              </Routes>
            </div>
          </main>
        )}
        <Footer/>
      </YMaps>
    </>
  );
}

export default App;
