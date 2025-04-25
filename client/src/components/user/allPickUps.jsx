import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { fetchAllRequestUser } from "../../slice/user/scrap-request-slice";
import RequestCard from "./requestCard";
import LoadingPage from "../../pages/LoadingPage/loading-page";
import { Link } from "react-router-dom";

export default function AllPickups(){

    const { allRequestUser , isLoading} = useSelector(state=>state.scrap);
    const { user} = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchAllRequestUser({userid : user.id}));
    },[dispatch])

    // console.log(user.id);
    // console.log(allRequestUser);
    return (
        <div className="flex flex-col min-h-screen">
            <h1 className="border-b-2 py-4 px-4 font-semibold text-green-500 text-xl">
                Placed Requests
            </h1>
            {
                !isLoading ?<div className="flex flex-col md:flex-row flex-wrap justify-center gap-2 p-9">
                {
                    allRequestUser && allRequestUser.length > 0 ? 
                        allRequestUser.map((singleRequest,index)=><RequestCard singleRequest={singleRequest}key={index}/>)
                    : <h1 className="text-gray-600 text-lg">Oops no request is happend ! please request a pickup for your scrap.... <span className="text-blue-600 underline hover:text-blue-400  "><Link to={'/user/scrap'}>Click Here</Link></span></h1>
                }
                </div> : <LoadingPage/>
            }
            
        </div>
    )
}