import SidebarCity from "./sidebar-city";

export default function ScrapRequest(){


    function handleClickOnCity(){

    }
    return (
        <div className="flex flex-col min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-700 px-5 py-3 border-b-2">Scrap Request </h1>
            <div className="flex ">
                <SidebarCity handleClickOnCity={handleClickOnCity}/>
            </div>
            
        </div>
    )
}