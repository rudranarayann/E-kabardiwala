import { Fragment } from "react"
import{Routes, Route} from 'react-router-dom';
import AuthLayoutMain from "./pages/authentication/authLayout";

import UserRegistration from "./components/AuthComponents/user_redg";
import UserLogin from "./components/AuthComponents/user-login";
import VendorLogin from "./components/AuthComponents/vendor-login";
import VendorRegistration from "./components/AuthComponents/vendor_redg";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/auth" element={<AuthLayoutMain/>}>
          <Route path="signin-user" element={<UserLogin/>}/>
          <Route path="signin-vendor" element={<VendorLogin/>}/>
          <Route path="signup-user" element={<UserRegistration/>}/>
          <Route path="signup-vendor" element={<VendorRegistration/>}/>
        </Route>
      </Routes>
    </Fragment>
  )
}
export default App
