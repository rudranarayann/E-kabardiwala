import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {updatePriceControl} from '../../config/config';
import CommonForm from "../../common/commonform";
import { useState } from "react";
import { fetchAllCity, updatePrice } from "../../slice/vendor/registration-slice-vendor";

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
        dispatch(updatePrice({
            vendorid : user.id,
            city : city,
            formData,
        })).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllCity({vendorid : user.id}));
                setFormData(initialState);
                alert('Price Update successfully');
                navigate('/admin/all-city');

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