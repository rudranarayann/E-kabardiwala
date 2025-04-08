export default function PriceCard({singleItem,submitBtn,handleOnClickSelectCity}){
    return (
        <div className="flex flex-col border-2 rounded-md shadow-xl min-w-[300px]">
            <h1 className="p-3 text-xl font-semibold border-b-2">{singleItem?.vendorname}</h1>
            <div className="flex flex-col p-3 gap-3 text-gray-700">
                <div className="flex justify-evenly">
                    <span>Plastic</span>
                    <p className="font-bold">Rs.{singleItem?.plastic}</p>
                </div>
                <div className="flex justify-evenly">
                    <span>Metal</span>
                    <p className="font-bold">Rs.{singleItem?.metal}</p>
                </div>
                <div className="flex justify-evenly">
                    <span>Galss</span>
                    <p className="font-bold">Rs.{singleItem?.glass}</p>
                </div>
                <div className="flex justify-evenly">
                    <span>Paper</span>
                    <p className="font-bold">Rs.{singleItem?.paper}</p>
                </div>
                {
                    submitBtn ? <button onClick={()=>handleOnClickSelectCity(singleItem)} className="bg-green-400 px-4 py-2 rounded-lg text-black font-semibold hover:bg-green-600">{submitBtn}</button>
                    : ''
                }
            
            </div>
        </div>
    )
}