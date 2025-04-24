import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {updatePriceControl} from '../../config/config';
import CommonForm from "../../common/commonform";
import { useState } from "react";
import { fetchAllCity, updatePrice } from "../../slice/vendor/registration-slice-vendor";
import toast from "react-hot-toast";

export default function UpdatePrice(){

    const initialState = {
        plastic : '',
        glass : '',
        metal : '',
        paper : '',
    }

    const {city} = useParams();
    const {user} = useSelector(state=>state.auth);
    const [formData,setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleUpdatePrice(e){
        e.preventDefault();
        // console.log(formData);
        const formValid = Object.keys(formData).every((item)=> formData[item] !== '')
        if(!formValid){
            toast.error("Fill all fields");
            return ;
        }
        dispatch(updatePrice({
            vendorid : user.id,
            city : city,
            formData,
        })).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllCity({vendorid : user.id}));
                setFormData(initialState);
                toast.success(data?.payload?.message || "Successfully price updated..");
                navigate('/admin/all-city');
            }else{
                toast.error(data?.payload?.message || "Please try again");
            }
        })
    }

    return (
        <div className="flex flex-col gap-4 min h-screen p-4">
            <h1 className="border-black text-3xl font semibold">Update Price</h1>
            <div className='border border-gray-400 p-6 rounded-3xl flex justify-center'>
                <CommonForm formData={formData} setFormData={setFormData} buttonText={'Save'} formControls={updatePriceControl} onSubmit={handleUpdatePrice}/>
            </div>
        </div>
    )
}