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

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticate } = useSelector(state => state.auth);

  // console.log(user, isAuthenticate);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])

  return (
    <Fragment>
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
        </Route>

        <Route path="/user" element={
          <CheckAuth isAuthenticate={isAuthenticate} user={user}>
            <UserLayout/>
          </CheckAuth>
        }>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </Fragment>
  )
}
export default App
