import { Outlet } from "react-router-dom";
import AuthHeroComponent from "../../components/AuthComponents/auth_hero";

export default function AuthLayoutMain(){
    return(
        <div className="grid sm:grid-cols-1 md:grid-cols-2 min-h-screen w-full bg-gray-200 gap-3">
            <AuthHeroComponent/>
            <Outlet/>
        </div>
    )

}