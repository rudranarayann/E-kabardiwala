import { MapPinHouse } from "lucide-react";

export default function AddressCard({singleAddress,handleAddressDelete,handleAddressEdit,flag,handleSelectAddress,isSelect}){
    
    return (
        <div className="flex flex-col shadow-xl rounded-md p-6 gap-3">
            <div className="bg-gray-200 rounded-md flex gap-4 py-2 px-4">
                <MapPinHouse />
                <h1 className="font-bold text-gray-600 text-xl">{singleAddress?.name}</h1>
            </div>
            <div className="flex flex-col gap-2 font-semibold text-gray-700">
                <p>{singleAddress.address}</p>
                <p>{singleAddress.city}</p>
                <p>+91 {singleAddress.phone}</p>
                <p>{singleAddress.pincode}</p>
                <p>{singleAddress.landmark}</p>
            </div>
            {
                flag ? <div className="flex gap-2 flex-col text-sm font-semibold">
                    <button onClick={()=>handleAddressEdit(singleAddress)} className="bg-black text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-gray-700">Edit</button>
                    <button onClick={()=>handleAddressDelete(singleAddress._id)} className="bg-black text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-gray-700">remove</button>
                </div> : <button className="bg-black text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-gray-700" onClick={()=>{
                    handleSelectAddress(singleAddress)
                }}>
                    { isSelect ? 'Selected' : 'Select' }
                </button>
            }
            
        </div>
    )
}