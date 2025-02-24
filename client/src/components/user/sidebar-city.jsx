import{odishaCities} from '../../config/config'

export default function SidebarCity({handleClickOnCity}){

    return (
        <div className="flex flex-col gap-3 p-2 border-r-2 max-h-screen overflow-auto">
            {
                odishaCities && odishaCities.length > 0 ?
                    odishaCities.map((singleCity,index)=>
                        <div key={index} onClick={()=>handleClickOnCity(singleCity)} className='font-semibold py-3 px-2 text-lg border-2 shadow-md rounded-sm hover:cursor-pointer hover:border-blue-300'>{singleCity}</div>
                    ):null
            }
        </div>
    )
}