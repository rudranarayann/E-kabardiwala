import { Link } from "react-router-dom";
import CommonForm from "../../common/commonform";
import { useState } from "react";
import {userLoginForm} from '../../config/config'
import { useDispatch } from "react-redux";
import { userLogin } from "../../slice/user/user-auth-slice";
import toast from "react-hot-toast";

export default function UserLogin(){
    const intitialState = {
        email : '',
        password : '',
    }

    const dispatch = useDispatch();
    const [formData,setFormData] = useState(intitialState);

    function handleOnUserLogin(event){
        event.preventDefault();
        dispatch(userLogin(formData)).then((data)=>{
            if(data?.payload?.success){
                setFormData(intitialState);
                toast.success(data?.payload?.message || "successfully logged in");
            }else{
                toast.error(data?.payload?.message || "Invalid credentials !");
            }
        });
    }

    function handleForgotPassword(){
        console.log("hello")
    }

    return (
        <div className="flex flex-col justify-center items-center gap-10 py-6">
            <div>
                <h1 className=" text-4xl font-extrabold ">Log into User account</h1>
                <p className="text-xl pt-5">It's your first time then , <Link to={'/auth/signup-user'} className="text-blue-500 underline ">Sign Up</Link></p>
            </div>
            <div>
                <CommonForm formControls={userLoginForm} formData={formData} setFormData={setFormData} buttonText={'Sign In'} onSubmit={handleOnUserLogin}/>
            </div>
            <div className="w-[30%] flex justify-end">
                <Link to={"/auth/forgotpassword-user"} state={{role:'consumer'}} className="text-decoration-line:underline text-blue-500 text-xl font-semibold hover:cursor-pointer hover:text-blue-700 underline">Forgot Password?</Link>
            </div>
        </div>
    )
}