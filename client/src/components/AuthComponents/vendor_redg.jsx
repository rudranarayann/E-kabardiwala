import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../common/commonform";
import {vendorRegistrationForm} from '../../config/config'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { vendorRegistration } from "../../slice/user/user-auth-slice";
import toast from "react-hot-toast";

export default function VendorRegistration(){
    const initialState = {
        username : '',
        companyname: '',
        email : '',
        password : '',
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const dispatch = useDispatch();
    const[formData ,setFormData] = useState(initialState);
    const navigate = useNavigate();

    function handleVendorRegistration(event){
        event.preventDefault();

        if(!emailRegex.test(formData?.email.trim())){
            toast.error("Please enter a valid email address !");
            return;
        }
        if(!passwordRegex.test(formData?.password.trim())){
            toast.error("Password must be at least 8 characters and include a number and a special character.");
            return ;
        }

        dispatch(vendorRegistration(formData)).then((data)=>{
            // console.log(data.payload);
            if(data?.payload?.success){
                setFormData(initialState);
                navigate("/auth/signin-vendor")
                toast.success(data?.payload?.message || "Successfully registered");
            }else{
                toast.error(data?.payload?.message || "Please try again !");
            }
        })
    }
    return (
        <div className="flex flex-col justify-center items-center gap-10 py-6 px-6 md:px-0">
            <div>
                <h1 className=" text-4xl font-extrabold ">Registration For Vendor </h1>
                <p className="text-xl pt-5">Already have an account, <Link to={'/auth/signin-vendor'} className="text-blue-500 underline ">SignIn</Link></p>
            </div>
            <div>
                <CommonForm formControls={vendorRegistrationForm} formData={formData} setFormData={setFormData} buttonText={'Sign Up'} onSubmit={handleVendorRegistration}/>
            </div>
            <div className="w-[30%] flex justify-end">
                <Link to={"/auth/forgotpassword-user"} state={{role:'consumer'}} className="text-decoration-line:underline text-blue-500 text-xl font-semibold hover:cursor-pointer hover:text-blue-700 underline">Forgot Password?</Link>
            </div>
        </div>
    )
}