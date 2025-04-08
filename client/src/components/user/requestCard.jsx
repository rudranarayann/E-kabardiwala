import { useSelector } from "react-redux"


export default function RequestCard({ singleRequest }) {

    const { user } = useSelector(state => state.auth)

    // console.log(user);
    // console.log(singleRequest);
    return (
        <div className="border-2 rounded-md min-w-[10vw] flex flex-col shadow-lg p-5">
            <h1 className="flex gap-2 justify-between w-full border-b-2 px-2 py-3 text-gray-500 font-semibold"><span className="bg-green-600 h-[20px] w-[20px] rounded-full"></span><span>{user?.role === "vendor" ? singleRequest?.address?.name : singleRequest?.vendorname}</span> <span>{singleRequest?.scraptype}</span></h1>
            <div className="px-4 py-3 flex flex-col gap-5 font-semibold text-gray-700">
                <p className="flex justify-between items-center "><span className="bg-gray-200 rounded-md p-2 ">Quantity </span><span>{singleRequest?.quantity} KG</span></p>
                <p className="flex justify-between items-center " ><span className="bg-gray-200 rounded-md p-2">City  </span><span>{singleRequest?.city}</span></p>
                <p className="flex justify-between items-center gap-2 " ><span className="bg-gray-200 rounded-md p-2">Description  </span><span>{singleRequest?.description}</span></p>
            </div>
            {
                user?.role === "vendor" ? <div>
                    <p className="text-gray-500 border-b-2 pb-2">Costumer Address</p>
                    <div className="px-4 py-3 flex flex-col gap-5 font-semibold text-gray-700">
                        <p className="flex justify-between items-center "><span className="bg-gray-200 rounded-md p-2 ">Lane </span><span>{singleRequest?.address?.addresslane}</span></p>
                        <p className="flex justify-between items-center gap-2 " ><span className="bg-gray-200 rounded-md p-2">PIN  </span><span>{singleRequest?.address?.pincode}</span></p>
                        <p className="flex justify-between items-center gap-2 " ><span className="bg-gray-200 rounded-md p-2">Phone  </span><span>{singleRequest?.address?.phone}</span></p>
                        <p className="flex justify-between items-center gap-2 " ><span className="bg-gray-200 rounded-md p-2">Landmark  </span><span>{singleRequest?.address?.landmark}</span></p>
                    </div>
                </div> : null
            }
            {
                user?.role === "vendor" ? 
                    <button className="bg-blue-200 rounded-md py-1 border-blue-200 border-4 hover:border-cyan-300 ">Schedule Pickup</button>
                :null 
            }

        </div>
    )
}
