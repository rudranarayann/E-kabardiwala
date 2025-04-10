import { Link } from "react-router-dom";
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

    const dispatch = useDispatch();
    const[formData ,setFormData] = useState(initialState);

    function handleVendorRegistration(event){
        event.preventDefault();
        dispatch(vendorRegistration(formData)).then((data)=>{
            // console.log(data.payload);
            if(data?.payload?.success){
                setFormData(initialState);
                toast.success(data?.payload?.message || "Successfully registered");
            }else{
                toast.error(data?.payload?.message || "Please try again !");
            }
        })
    }
    return (
        <div className="flex flex-col justify-center items-center gap-20 py-6 px-6 md:px-0">
            <div>
                <h1 className=" text-4xl font-extrabold ">Registration For Vendor </h1>
                <p className="text-xl pt-5">Already have an account, <Link to={'/auth/signin-vendor'} className="text-blue-500 underline ">SignIn</Link></p>
            </div>
            <div>
                <CommonForm formControls={vendorRegistrationForm} formData={formData} setFormData={setFormData} buttonText={'Sign Up'} onSubmit={handleVendorRegistration}/>
            </div>
        </div>
    )
}