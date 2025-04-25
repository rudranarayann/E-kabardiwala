import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cancelRequestById, fetchAllRequestUser ,fetchAllRequestVendor} from "../../slice/user/scrap-request-slice";
import toast from "react-hot-toast";

export default function RequestCard({ singleRequest, handleSchedle }) {

    const { user } = useSelector(state => state.auth)
    const [showModal, setShowModal] = useState(false);
    const { isLoading } = useSelector(state => state.scrap);
    const dispatch = useDispatch();

    function handleCancelConfirm() {
        dispatch(cancelRequestById({ reqId: singleRequest?._id, status: "cancelled" })).then((data) => {
            if (data?.payload?.success) {
                setShowModal(false);
                toast.success(data?.payload?.message || "Request has been cancelled..");
                user?.role === 'vendor' ? dispatch(fetchAllRequestVendor({ vendorid: user.id })) :dispatch(fetchAllRequestUser({ userid: user.id }))
                
            } else {
                toast.error(data?.payload?.message || "Please try again");
                setShowModal(false);
            }
        })
    }
    // console.log(user.role);
    return (
        <div className={`border-2 rounded-md min-w-[10vw] flex flex-col shadow-lg p-5 ${singleRequest?.status === "cancelled" ? 'hover:cursor-not-allowed opacity-50 pointer-events-none' : null}`} >
            <h1 className="flex gap-2 justify-between w-full border-b-2 px-2 py-3 text-gray-400 font-semibold"><span className="bg-green-600 h-[20px] w-[20px] rounded-full"></span><span>  {user?.role === "vendor" ? singleRequest?.address?.name : singleRequest?.vendorname}</span> <span>{singleRequest?.scraptype}</span>
            </h1>
            <div className="px-4 py-3 flex flex-col gap-5 font-semibold text-gray-700">
                <p className="flex justify-between items-center "><span className="bg-gray-200 rounded-md p-2 ">Quantity </span><span>{singleRequest?.quantity} KG</span></p>
                <p className="flex justify-between items-center " ><span className="bg-gray-200 rounded-md p-2">City  </span><span>{singleRequest?.city}</span></p>
                <p className="flex justify-between items-center gap-2 " ><span className="bg-gray-200 rounded-md p-2">Description  </span><span>{singleRequest?.description}</span></p>
                <p className="flex justify-between items-center gap-2 " ><span className="bg-gray-200 rounded-md p-2">Payment Status  </span><span>{singleRequest?.paymentStatus}</span></p>
                <p className="flex justify-between items-center gap-2 " ><span className="bg-gray-200 rounded-md p-2">Order Status</span><span>{singleRequest?.status}</span></p>
                <p className="flex justify-between items-center gap-2 overflow-auto " ><span className="bg-gray-200 rounded-md p-2">Schedule Date</span><span>{singleRequest?.schedule  === null ? "Soon to be scheduled" : singleRequest?.schedule}</span></p>

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
                    <button onClick={() => { handleSchedle(singleRequest?._id) }} className="bg-blue-200 rounded-md py-1 border-blue-200 border-4 hover:border-cyan-300 ">{singleRequest?.schedule !== null? "Re-schedule Pickup" :"Schedule Pickup" }</button>
                    : null
            }
            <button onClick={() => setShowModal(true)} className={`bg-blue-200 rounded-md py-1 mt-2 text-red-700 border-blue-200 border-2 hover:text-red-400 ${singleRequest?.status === "cancelled" ? 'hover:cursor-not-allowed' : null} `}>Cancel</button>

            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg text-center">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Are you sure , want to cancel this request?</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleCancelConfirm}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 "
                            >
                                Yes, Cancel
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                No, Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
