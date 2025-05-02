import { useState } from "react";
import CommonForm from "../../common/commonform";
import {vendorLoginForm} from '../../config/config'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { vendorLogin } from "../../slice/user/user-auth-slice";
import toast from "react-hot-toast";

export default function VendorLogin(){
    const initialState = {
        email : '',
        password : '',
    }
    const[formData,setFormData] = useState(initialState);
    const dispatch = useDispatch();

    function handleVendorLogin(event){
        event.preventDefault();
        dispatch(vendorLogin(formData)).then((data)=>{
            if(data?.payload?.success){
                setFormData(initialState);
                toast.success(data?.payload?.message || "successfully logged in");
            }else{
                toast.error(data?.payload?.message || "Invalid credentials");
            }
        })
    }

    return (
        <div className="flex flex-col justify-center items-center gap-10 py-6 px-6 md:px-0">
            <div>
                <h1 className=" text-4xl font-extrabold">Log into Vendor account</h1>
                <p className="text-xl pt-5">It's your first time then , <Link to={'/auth/signup-vendor'} className="text-blue-500 underline ">SignUp</Link></p>
            </div>
            <div>
                <CommonForm formControls={vendorLoginForm} formData={formData} setFormData={setFormData} buttonText={'Sign In'} onSubmit={handleVendorLogin}/>
            </div>
            <div className="w-[30%] flex justify-end">
                <Link to={"/auth/forgotpassword-user"} state={{role:'vendor'}} className="text-decoration-line:underline text-blue-500 text-xl font-semibold hover:cursor-pointer hover:text-blue-700 underline">Forgot Password?</Link>
            </div>
        </div>
    )
}