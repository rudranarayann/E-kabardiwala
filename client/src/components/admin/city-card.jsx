import { Castle, GalleryHorizontalEnd, IndianRupee } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCity, fetchAllCity } from "../../slice/vendor/registration-slice-vendor";

export default function CityCard({singleCity}){
    const navigate = useNavigate();
    const {user} = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    function handleOnClickCityDelete(getCurrentCity){
        dispatch(deleteCity({vendorid : user?.id , city : getCurrentCity})).then((data)=>{
            // console.log(data.payload);
            if(data?.payload?.success)
                dispatch(fetchAllCity({vendorid : user?.id}));
        });
    }

    return (
        <div className="flex flex-col border rounded-lg border-black w-full text-gray-700 hover:shadow-2xl">
            <h1 className="border-b border-black p-4 text-xl font-semibold"><Castle /> {singleCity?.city}</h1>
            <div className="flex flex-col gap-2 p-4">
                <div className="flex justify-evenly items-center">
                    <p className="font-semibold">Plastic</p>
                    <p className="font-semibold flex justify-center items-center gap-2"><IndianRupee />{singleCity.plastic}</p>
                </div>
                <div className="flex justify-evenly items-center">
                    <p className="font-semibold">Metal</p>
                    <p className="font-semibold flex justify-center items-center gap-2"><IndianRupee />{singleCity.metal}</p>
                </div>
                <div className="flex justify-evenly items-center">
                    <p className="font-semibold">Glass</p>
                    <p className="font-semibold flex justify-center items-center gap-2"><IndianRupee />{singleCity.glass}</p>
                </div>
                <div className="flex justify-evenly items-center">
                    <p className="font-semibold">Paper</p>
                    <p className="font-semibold flex justify-center items-center gap-2"><IndianRupee />{singleCity.paper}</p>
                </div>
            </div>
            <div className="flex justify-evenly mb-4 items-center">
                <button onClick={()=>handleOnClickCityDelete(singleCity?.city)} className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800">Delete</button>
                <button onClick={()=>navigate(`/admin/update-price/${singleCity?.city}`)} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold">Update</button>
            </div>
        </div>
    )
}