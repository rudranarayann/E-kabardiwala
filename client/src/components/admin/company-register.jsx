import { useState } from "react";
import CommonForm from "../../common/commonform";
import {odishaCities,vendorRegistrationConfig} from '../../config/config'
import { useDispatch, useSelector } from "react-redux";
import { cmpRegistrationVendor } from "../../slice/vendor/registration-slice-vendor";

export default function VendorCompanyRegistration(){
    const dispatch = useDispatch();
    const { user} = useSelector(state => state.auth);

    const initialValue = {
        vendorname : '',
        location : '',
        city : '',
        plastic : '',
        metal : '',
        glass : '',
        paper : ''
    }
    const [formData,setFormData]  = useState(initialValue);

    function handleVendorRedgSubmit(e){
        e.preventDefault();
        dispatch(cmpRegistrationVendor({...formData,vendorid : user.id})).then((data)=>{
            if(data?.payload?.success){
                console.log(data.payload);
                setFormData(initialValue);
                alert("Vendor Company registration successful...");
            }
        });
    }

    // console.log(user);
    return (
        <div className="min-h-screen flex w-full justify-center items-center flex-col gap-10">
            <h1 className="text-3xl font-bold text-gray-500 border-b pb-4">New here , Please Register </h1>
            <CommonForm formControls={vendorRegistrationConfig} selectItem={odishaCities} formData={formData} setFormData={setFormData} onSubmit={handleVendorRedgSubmit} buttonText={'Add'}/> 
        </div>
    )
}