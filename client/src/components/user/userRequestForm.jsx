import CommonForm from "../../common/commonform";
import ImageDetection from "./image-detection";
import {scrapType,scrapRequestForm} from "../../config/config"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./addressCard";
import { fetchAllAddress } from "../../slice/address/address-slice";

export default function UserRequestForm(){
    const initialState = {
        scraptype : '',
        quantity : '',
        description : ''
    }

    const{addressList} = useSelector(state=>state.address);
    const{user} = useSelector(state=>state.auth);
    const [formData,setFormData] = useState(initialState);
    const[isSelectedId,setIsSelectedId]= useState(null);
    const [selectedAddress,setSelectedAddress] = useState(null);
    const dispatch = useDispatch();
    function onSubmitHandleRequestForm(e){
        e.preventDefault();
        console.log(formData);
        console.log(selectedAddress);

    }

    function handleSelectAddress(getCurrentAddress){
        setIsSelectedId(getCurrentAddress?._id);
        setSelectedAddress(getCurrentAddress);
    }

    useEffect(()=>{
        dispatch(fetchAllAddress({userid : user?.id }))
    },[dispatch])
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col items-center my-10 mx-5">
                <h1 className="text-3xl font-semibold ">Select a address</h1>
                <div className="grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2">
                    {
                        addressList && addressList?.length > 0 ? 
                            addressList.map((singleItem,index)=><AddressCard key={index} singleAddress={singleItem} flag={false} isSelect={isSelectedId === singleItem._id} handleSelectAddress={handleSelectAddress}/>)
                        :null
                    }
                </div>
            </div>
            <ImageDetection/>
            <div className="mb-10">
                <CommonForm formControls={scrapRequestForm} formData={formData} setFormData={setFormData} onSubmit={onSubmitHandleRequestForm} selectItem={scrapType} buttonText={'Done'}/>
            </div>
        </div>
    )
}