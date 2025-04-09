import { Outlet } from "react-router-dom";
import AuthHeroComponent from "../../components/AuthComponents/auth_hero";
import { useSelector } from "react-redux";
import LoadingPage from "../LoadingPage/loading-page";

export default function AuthLayoutMain(){
    const{isLoading} = useSelector(state=>state.auth);
    return(
            <div>
                {
                    isLoading ? <LoadingPage/> : <div className="grid sm:grid-cols-1 md:grid-cols-2 w-full min-h-[90vh] bg-gray-200 gap-3">
                        <AuthHeroComponent/>
                        <Outlet/>
                    </div>
                }
            </div>
            
    )

}