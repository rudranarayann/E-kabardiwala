import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchAllRequestVendor } from "../../slice/user/scrap-request-slice";
import RequestCard from "../user/requestCard";

export default function AllOrders() {

    const { user } = useSelector(state => state.auth)
    const { allRequestVendor,isLoading } = useSelector(state => state.scrap);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllRequestVendor({ vendorid: user.id }))
    }, [dispatch])

    // console.log(user.id)
    // console.log(allRequestVendor, "allRequestVendor");

    return (
        <div className="flex flex-col min-h-screen">
            <h1 className="border-b-2 py-4 px-4 font-semibold text-green-500 text-xl">
                All Requests
            </h1>
            {
                !isLoading ? <div className="flex flex-col md:flex-row gap-2 p-9">
                {
                    allRequestVendor && allRequestVendor.length > 0 ?
                        allRequestVendor.map((singleRequest, index) => <RequestCard singleRequest={singleRequest} key={index} />)
                    : <h1 className="text-gray-600 text-lg">Empty order/Request list.....</h1>
                }
                </div>: <h1>Loading......</h1>
            }
            
        </div>
    )
}