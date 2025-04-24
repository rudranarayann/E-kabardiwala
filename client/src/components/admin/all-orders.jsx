import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchAllRequestVendor, scheduleRequest } from "../../slice/user/scrap-request-slice";
import RequestCard from "../user/requestCard";
import LoadingPage from "../../pages/LoadingPage/loading-page";
import DateDialog from "./date-dialog";
import toast from "react-hot-toast";

export default function AllOrders() {

    const { user } = useSelector(state => state.auth)
    const { allRequestVendor,isLoading } = useSelector(state => state.scrap);
    const[scheduleDialog,setScheduleDialog] = useState(null);
    const[date,setDate] = useState('');
    const dispatch = useDispatch();


    function handleSchedle(getId){
        setScheduleDialog(getId);
        console.log(getId)
    }

    function handleOnCloseScheduleDialog(){
        setScheduleDialog(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Date : ",date," Order Id : ",scheduleDialog);   

        dispatch(scheduleRequest({date,reqId:scheduleDialog})).then((data)=>{
            if(data?.payload?.success){
                console.log(date.payload?.data);
                toast.success(data?.payload?.message);
                dispatch(fetchAllRequestVendor({ vendorid: user.id }))
            }else{
                toast.error(data?.payload?.message || "Try again");
            }
        })
        setScheduleDialog(null);
        
    };
    
    
    useEffect(() => {
        dispatch(fetchAllRequestVendor({ vendorid: user.id }))
    }, [dispatch])

    return (
        <div className="relative">
            <div className="flex flex-col min-h-screen">
            <h1 className="border-b-2 py-4 px-4 font-semibold text-green-500 text-xl">
                All Requests
            </h1>
            {
                !isLoading ? <div className="flex flex-col flex-wrap md:flex-row gap-2 p-9 items-center justify-center ">
                {
                    allRequestVendor && allRequestVendor.length > 0 ?
                        allRequestVendor.map((singleRequest, index) => <RequestCard singleRequest={singleRequest} handleSchedle={handleSchedle} key={index} />)
                    : <h1 className="text-gray-600 text-lg">Empty order/Request list.....</h1>
                }
                </div>: <LoadingPage/>
            }
        </div>
            {scheduleDialog && <DateDialog handleSubmit={handleSubmit} onClose={handleOnCloseScheduleDialog} setDate={setDate} date={date}/>}
        </div>
        
    )
}