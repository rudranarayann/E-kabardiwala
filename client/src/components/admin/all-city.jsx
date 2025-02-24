import { useDispatch, useSelector } from "react-redux"
import CityCard from "./city-card";
import { useEffect } from "react";
import { fetchAllCity } from "../../slice/vendor/registration-slice-vendor";

export default function AllCity(){
    const {prices} = useSelector(state=>state.vendor);
    const {user} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchAllCity({vendorid : user?.id})); 
    },[dispatch]);


    return (
        <div className="flex flex-col gap-6 min-h-screen">
            <h1 className=" border-b-2  text-2xl font-semibold py-5 px-3">All Cities</h1>
            <div className="grid md:grid-cols-4 grid-cols-1 gap-6 p-4">
                {
                    prices && prices.length > 0 ? 
                    prices.map((singleCity,index)=><CityCard key={index} singleCity={singleCity}/>) : 
                    <div>No cities available , please register</div>
                }
            </div>
        </div>
    )
}