
export default function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText ,isBtnDisabled }) {
    function renderFormElementByType(getControlItem) {
        let element = null;
        const value = formData[getControlItem.name] || '';

        switch (getControlItem.componentType) {
            case 'input':
                element = (
                    <input className="rounded-lg py-4 px-10 w-[300px] " type={getControlItem.type}
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    value={value}
                    onChange={(event) => setFormData({
                        ...formData,
                        [getControlItem.name]: event.target.value,
                    })}
                />);
                break;
            
            case 'textarea':
                element=(<textarea
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    value={value}
                    id={getControlItem.id}
                    onChange={(event) => setFormData({
                        ...formData,
                        [getControlItem.name]: event.target.value,
                    })}
                />)
                break;
            default:
               element = ( <input type={getControlItem.type}
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    value={value}
                    onChange={(event) => setFormData({
                        ...formData,
                        [getControlItem.name]: event.target.value,
                    })}
                />)
                break;
        }
        return element;
    }

    return (

        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formControls.map(controlItem =>
                        <div className="grid w-full gap-1.5" key={controlItem.name}>
                            <label className="mb-1 font-bold">{controlItem.label}</label>
                            {
                                renderFormElementByType(controlItem)
                            }
                        </div>
                    )
                }
                <button className="bg-black text-white rounded-lg py-2" disabled={isBtnDisabled} >{buttonText ||'Submit'}</button>
            </div>
            
        </form>
    )
}
