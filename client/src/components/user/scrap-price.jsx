import { useDispatch, useSelector } from "react-redux";
import SidebarCity from "./sidebar-city";
import { fetchCityPrice } from "../../slice/user/user-related";
import { useEffect, useState } from "react";
import PriceCard from "./price-card";
import LoadingPage from "../../pages/LoadingPage/loading-page";

export default function WastePrice() {
    const [prices, setPrices] = useState([]);
    const [selectedCity, setSelectedCity] = useState(""); // Track selected city
    const { cityPrices, isLoading } = useSelector(state => state.user);
    const dispatch = useDispatch();

    //filtering city wise vendor only show to vendor name and their respective price for a perticular city
    function filterPrices() {
        if (selectedCity && cityPrices.length > 0) {
            const filteredPrices = cityPrices
                .map((singleItem) => {
                    const curCityData = singleItem.prices.find((item) => item.city.toString() === selectedCity);
                    if (curCityData) {
                        return {
                            vendorname: singleItem.vendorname,
                            city: selectedCity,
                            plastic: curCityData.plastic,
                            glass: curCityData.glass,
                            metal: curCityData.metal,
                            paper: curCityData.paper,
                        };
                    } else {
                        return null;
                    }
                })
                .filter((item) => item != null);

            setPrices(filteredPrices);
        }
    }

    function handleClickOnCity(getCurrentCity) {
        setSelectedCity(getCurrentCity);
        dispatch(fetchCityPrice({ city: getCurrentCity }))
    }
    useEffect(() => {
        filterPrices();
    }, [cityPrices, selectedCity]);

    return (
        <div className="flex flex-col">
            <h1 className="py-3 px-4 border-b-2 text-3xl font-semibold">Waste Prices</h1>
            <div className="flex">
                <SidebarCity handleClickOnCity={handleClickOnCity} />
                {
                    isLoading ? <LoadingPage /> :

                        <div className="flex flex-col w-full">
                            <h1 className="text-3xl font-bold px-4 py-2">{selectedCity}</h1>
                            <div className="p-5 flex flex-col md:flex-row gap-4 ">
                                {
                                    prices && prices.length > 0 ?
                                        prices.map((singleItem, index) => <PriceCard key={index} singleItem={singleItem} />)
                                        : <h1 className="text-3xl font-semibold">Oops.....! No Vendors available for this city ! </h1>
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}