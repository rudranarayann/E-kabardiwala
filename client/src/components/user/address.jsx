import { useEffect, useState } from "react";
import CommonForm from "../../common/commonform";
import { addressFormControls } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { addAdderss, fetchAllAddress,deleteAddress, editAddress } from "../../slice/address/address-slice";
import AddressCard from "./addressCard";

export default function Address(){

    const initialState = {
        name : "",
        address : "" ,
        city : "",
        pincode : "",
        phone : "" ,
        landmark : "" ,
    }

    const [formData,setFormData] = useState(initialState);
    const[isEdited,setIsEdited] = useState(null);
    const dispatch = useDispatch();
    const{user} = useSelector(state=>state.auth);
    const{addressList} = useSelector(state=>state.address);
 

    function handleOnSubmitAddress (e) {
        e.preventDefault();
        if(isEdited !== null){
            dispatch(editAddress({formData,userid : user?.id,addressid : isEdited })).then((data)=>{
                if(data?.payload?.success){
                    alert(data?.payload?.message);
                    setIsEdited(null);
                    dispatch(fetchAllAddress({userid : user?.id}));
                    setFormData(initialState);
                }else{
                    alert(data?.payload?.message);
                }
            })
        }else{
        dispatch(addAdderss({
            ...formData,
            userid : user?.id
        })).then((data)=>{
            if(data?.payload?.success){
                setFormData(initialState);
                dispatch(fetchAllAddress({userid : user?.id}));
                alert(data?.payload?.message);
            }else{
                alert(data?.payload?.message);
            }
        })
    }
    }

    function handleAddressDelete(getCurrentAddressId){
        
        dispatch(deleteAddress({userid : user?.id , addressid : getCurrentAddressId})).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllAddress({userid : user?.id}));
                alert(data?.payload?.message);
            }else{
                alert(data?.payload?.message);
            }
        })
        
    }

    function handleAddressEdit(getCurrentAddress){
        // console.log(getCurrentAddress)
        setIsEdited(getCurrentAddress._id);
        setFormData({
            ...formData,
            name : getCurrentAddress.name,
            address : getCurrentAddress.address ,
            city :getCurrentAddress.city,
            pincode : getCurrentAddress.pincode,
            phone : getCurrentAddress.phone ,
            landmark : getCurrentAddress.landmark ,
        })
    }

    useEffect(()=>{
        dispatch(fetchAllAddress({userid : user?.id}));
    },[dispatch])

    console.log(addressList);
    return (
        <div className="flex flex-col min-h-screen">
            <h1 className="px-6 py-3 border-b-2  text-2xl ">Addresses</h1>
            <div className="flex flex-col justify-evenly gap-10 mb-5 py-6 px-4">
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5  ">
                    {
                        addressList && addressList.length > 0 ? 
                            addressList.map((singleAddress,index)=><AddressCard key={index} handleAddressDelete={handleAddressDelete} handleAddressEdit={handleAddressEdit} singleAddress={singleAddress}/>)
                        : <h1 className="text-3xl text-gray-700 font-semibold">No address found ! </h1>

                    }
                </div>

                <div className=" flex items-center justify-center flex-col gap-2 ">
                    <h1 className="font-bold text-3xl text-gray-700 rounded-md bg-gray-200 px-4 py-3">{isEdited ? 'Edit Address' : 'Add new adderss'}</h1>
                    <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} onSubmit={handleOnSubmitAddress} buttonText={`${isEdited ? 'Edit':'Save'}`} />
                </div>
            </div>
        </div>
    )
}