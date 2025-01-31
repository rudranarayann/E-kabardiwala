
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom"

export default function CheckAuth({isAuthenticate,user,children}){
    const location  = useLocation();

    const [redirectPath, setRedirectPath] = useState(null);

    if (isAuthenticate && (location.pathname.includes('/auth') || location.pathname === '/')) {
        if (user?.role === 'vendor') {
            return <Navigate to={'/admin'}/>
        } else {
            return <Navigate to={'/user'}/>
        }
    }

    if(!isAuthenticate && (location.pathname.includes('/admin') || location.pathname.includes('/user'))){
        return <Navigate to={'/'}/>
    }
    
    return <>{children}</>
}