import { Fragment, useEffect } from "react"
import { Routes, Route } from 'react-router-dom';
import AuthLayoutMain from "./pages/authentication/authLayout";

import UserRegistration from "./components/AuthComponents/user_redg";
import UserLogin from "./components/AuthComponents/user-login";
import VendorLogin from "./components/AuthComponents/vendor-login";
import VendorRegistration from "./components/AuthComponents/vendor_redg";
import HeroLayout from "./pages/HeroPage/heroLayout";
import AdminLayout from "./pages/Admin/adminLayout";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./slice/user/user-auth-slice";
import CheckAuth from "./components/AuthComponents/checkauth";
import UserLayout from "./pages/UserLayout/userLayout";
import PageNotFound from "./components/PageNotFound/page-not-found";
import Footer from "./components/Footer/footer";
import Header from "./components/header";
import ContactLayout from "./components/contactComponent";
import AboutLayout from "./pages/About/aboutLayout";
// import ScrapRequest from "./components/user/scrap-request";
import UserHome from "./components/user/Userhome";
import ScrapRequest from "./components/user/scrap-request";
import VendorCompanyRegistration from "./components/admin/company-register";
import AdminHeroPage from "./components/admin/admin-hero";
import AddCity from "./components/admin/add-city";
import UpdatePrice from "./components/admin/update-price";
import AllCity from "./components/admin/all-city";
import Address from "./components/user/address";
import WastePrice from "./components/user/scrap-price";
import UserRequestForm from "./components/user/userRequestForm";
import AllPickups from "./components/user/allPickUps";
import AllOrders from "./components/admin/all-orders";
import Sheduling from "./components/admin/sheduling";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticate } = useSelector(state => state.auth);

  // console.log(user, isAuthenticate);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])

  return (
    <Fragment>
      <Header/>
      <Routes>
        <Route path="/" element={
          <CheckAuth isAuthenticate={isAuthenticate} user={user} >
            <HeroLayout />
          </CheckAuth>
        }></Route >

        <Route path="/auth" element={
          <CheckAuth isAuthenticate={isAuthenticate} user={user} >
            <AuthLayoutMain />
          </CheckAuth>
          }>
          <Route path="signin-user" element={<UserLogin />} />
          <Route path="signin-vendor" element={<VendorLogin />} />
          <Route path="signup-user" element={<UserRegistration />} />
          <Route path="signup-vendor" element={<VendorRegistration />} />
        </Route>
        
        <Route path="/admin" element={
          <CheckAuth isAuthenticate={isAuthenticate} user={user}>
            <AdminLayout/>
          </CheckAuth>
        }>
          <Route path="home" element={<AdminHeroPage/>}/>
          <Route path="company-registration" element={<VendorCompanyRegistration/>}/>
          <Route path="add-city" element={<AddCity/>}/>
          <Route path="update-price/:city" element={<UpdatePrice/>}/>
          <Route path="all-city" element={<AllCity/>}/>
          <Route path="seeallorder" element={<AllOrders/>}/>
          <Route path="sheduling" element={<Sheduling/>}/>
        </Route>
        <Route path="/user" element={
          <CheckAuth isAuthenticate={isAuthenticate} user={user}>
            <UserLayout/>
          </CheckAuth>
        }>
          <Route path="home" element={<UserHome/>}/>
          <Route path="scrap" element={<ScrapRequest/>}/>
          <Route path="address" element={<Address/>}/>
          <Route path="waste-price" element={<WastePrice/>}/>
          <Route path="allpickups" element={<AllPickups/>}/>
          <Route path="request/:city/:vendorid/:userid" element={<UserRequestForm/>}/>
        </Route>

        <Route path="/contact" element={
          <CheckAuth isAuthenticate={isAuthenticate} user={user}>
            <ContactLayout/>
          </CheckAuth>
        }>
        </Route>

        <Route path="/about" element={
          <CheckAuth isAuthenticate={isAuthenticate} user={user}>
            <AboutLayout/>
          </CheckAuth>
        }>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </Fragment>
  )
}
export default App
