import { useState } from "react";
import CommonForm from "../../common/commonform";
import {addcity,odishaCities} from "../../config/config"
import { useDispatch, useSelector } from "react-redux";
import { addCitySlice, fetchAllCity } from "../../slice/vendor/registration-slice-vendor";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddCity(){

    const { user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialState = {
        city : '',
        plastic : '',
        glass : '',
        metal : '',
        paper : '',
    }
    const [formData,setFormData] = useState(initialState);

    function handleAddCity(e){
        e.preventDefault();
        const formValid = Object.keys(formData).every((item)=> formData[item] !== '')
        if(!formValid){
            toast.error("Fill all fields");
            return ;
        }
        dispatch(addCitySlice({...formData,vendorid: user?.id})).then((data)=>{
            // console.log(data.payload);
            if(data?.payload?.success){
                dispatch(fetchAllCity({vendorid : user?.id}));
                setFormData(initialState);
                navigate('/admin/all-city');
                toast.success(data?.payload?.message || "Added successfully done");
            }else{
                navigate("/admin/company-registration");
                toast.error(data?.payload?.message);
            }
        })
       
    }

    return (
        <div className="min-h-screen flex w-full justify-center items-center flex-col gap-10">
            <h1 className="text-3xl font-bold text-gray-500 border-b pb-4 px-6">Add another city to starting your vendorship</h1>
            <CommonForm formControls={addcity} formData={formData} setFormData={setFormData} buttonText={'Add City'} onSubmit={handleAddCity} selectItem={odishaCities}/>
        </div>
    )
}