
import { Navigate, useLocation } from "react-router-dom"

export default function CheckAuth({isAuthenticate,user,children}){
    const location  = useLocation();

    if (isAuthenticate && (location.pathname.includes('/auth') || location.pathname === '/')) {
        if (user?.role === 'vendor') {
            return <Navigate to={'/admin/home'}/>
        } else {
            return <Navigate to={'/user/home'}/>
        }
    }

    if(!isAuthenticate && (location.pathname.includes('/admin') || location.pathname.includes('/user'))){
        return <Navigate to={'/'}/>
    }
    
    return <>{children}</>
}