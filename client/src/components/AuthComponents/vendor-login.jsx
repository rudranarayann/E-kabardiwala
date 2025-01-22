import { useState } from "react";
import CommonForm from "../../common/commonform";
import {vendorLoginForm} from '../../config/config'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { vendorLogin } from "../../slice/vendor/vendor-auth-slice";
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
                alert('successfully vendor logged in');
                setFormData(initialState);
            }
        })
    }

    return (
        <div className="flex flex-col justify-center items-center gap-20">
            <div>
                <h1 className=" text-4xl font-extrabold">Log into Vendor account</h1>
                <p className="text-xl pt-5">It's your first time then , <Link to={'/auth/signup-vendor'} className="text-blue-500 underline ">SignUp</Link></p>
            </div>
            <div>
                <CommonForm formControls={vendorLoginForm} formData={formData} setFormData={setFormData} buttonText={'Sign In'} onSubmit={handleVendorLogin}/>
            </div>
        </div>
    )
}