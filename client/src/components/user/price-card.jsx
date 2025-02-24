export default function PriceCard({singleItem}){
    return (
        <div className="flex flex-col border-2 rounded-md shadow-xl">
            <h1 className="p-3 text-xl font-semibold border-b-2">{singleItem.vendorname}</h1>
            <div className="flex flex-col p-3 gap-3">
                <div className="flex justify-evenly">
                    <span>Plastic</span>
                    <p className="font-bold">{singleItem.plastic}</p>
                </div>
                <div className="flex justify-evenly">
                    <span>Metal</span>
                    <p className="font-bold">{singleItem.metal}</p>
                </div>
                <div className="flex justify-evenly">
                    <span>Galss</span>
                    <p className="font-bold">{singleItem.glass}</p>
                </div>
                <div className="flex justify-evenly">
                    <span>Paper</span>
                    <p className="font-bold">{singleItem.paper}</p>
                </div>
            </div>
        </div>
    )
}