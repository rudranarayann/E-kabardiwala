
import { useEffect, useState } from 'react';
import{odishaCities} from '../../config/config'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityPrice } from '../../slice/user/user-related';
import PriceCard from './price-card';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../../pages/LoadingPage/loading-page';

export default function ScrapRequest(){
    const[selectedCity,setSelectedCity] = useState("");
    const [prices,setPrices] = useState([]);
    const{cityPrices,isLoading} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth);
    const navigate = useNavigate();

    function filteringCityPrice (){
        if(cityPrices && cityPrices.length > 0){
            const filterCityPrice = cityPrices.map((singleItem)=>{
                const currCityData = singleItem.prices?.find((item)=>item.city.toString() === selectedCity);
                // console.log(currCityData)
                if(currCityData){
                    return {
                        vendorid : singleItem.vendorid,
                        vendorname : singleItem.vendorname,
                        city: selectedCity,
                        plastic: currCityData.plastic,
                        glass: currCityData.glass,
                        metal: currCityData.metal,
                        paper: currCityData.paper,
                    }
                }else{
                    return null;
                }
            }).filter((item) => item != null);

            setPrices(filterCityPrice);
        }
    }

    function handleClickOnCity(getCurrentCity){
        setSelectedCity(getCurrentCity);
        dispatch(fetchCityPrice({city : getCurrentCity}));
    }
    
    function handleOnClickSelectCity(getCurrentSelectCity){
        // console.log(getCurrentSelectCity,"getCurrentSelectCity");
        navigate(`/user/request/${selectedCity}/${getCurrentSelectCity.vendorid}/${user.id}`,{state : getCurrentSelectCity.vendorname});
    }

    useEffect(()=>{
        filteringCityPrice();
    },[cityPrices,selectedCity])

    // console.log(cityPrices,"cityPrices");
    // console.log(prices,"prices");

    return (
        <div className="flex flex-col min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-600 px-5 py-5 border-b-2">Scrap Request </h1>
            <div className="flex flex-col mt-5 items-center">
                <h1 className="text-4xl font-semibold text-gray-600 flex justify-center">Select Your City</h1>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 md:max-w-[70vw] overflow-auto mt-5 p-10 max-h-[90vh] '>
                    {
                        odishaCities && odishaCities.length > 0 ?
                            odishaCities.map((singleCity,index)=>(
                                <div key={index} onClick={()=>handleClickOnCity(singleCity)} className='text-2xl text-blue-400 p-9 font-bold rounded-lg hover:shadow-xl hover:shadow-green-200 border'>{singleCity}</div>
                            ))
                        :null

                    }
                </div>
            </div>
            
            {   
                selectedCity ? (
                    isLoading ? <LoadingPage/>
                    :<div className='flex flex-col mt-10 gap-2 min-h-[80vh]'>
                        <h1 className='text-2xl font-bold text-gray-600 p-3 border-b-2 w-full'>Please select a Vendors</h1>
                        <div className='flex md:flex-row flex-col gap-4 max-h-[90vh] overflow-auto px-6'>
                            {
                                prices.length > 0 ?
                                    prices.map((singleItem,index)=><PriceCard submitBtn={'Select'} handleOnClickSelectCity={handleOnClickSelectCity} key={index} singleItem={singleItem}/>)
                                : <h1 className='text-xl font-semibold text-gray-600'>No vendor available in {selectedCity}</h1> 
                            }
                        </div>
                    </div>
                ):null
            }
            
        </div>
    )
} 