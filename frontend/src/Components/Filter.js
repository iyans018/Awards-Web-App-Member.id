import { useState } from "react";
import FilterButton from "./FilterButton";

const Filter = ({ open, setOpen }) => {
    const awardsType = [
        { _id: 1, name: "All Type" },
        { _id: 2, name: "Vouchers" },
        { _id: 3, name: "Products" },
        { _id: 4, name: "Giftcard" }
    ];
    const [poin, setPoin] = useState(10000);
    const [type, setType] = useState([]);
    const [choosenFilter, setChoosenFilter] = useState({});
    const [checked, setChecked] = useState(new Array(awardsType.length).fill(false));

    const handleChange = (position) => {
        const updatedChecked = checked.map((item, index) => index === position ? !item : item);

        setChecked(updatedChecked);
    }

    const handleChangePoin = (e) => {
        setPoin(e.target.value);
        const newChoosenFilter = { ...choosenFilter, poin: [10000, poin] };
        setChoosenFilter(newChoosenFilter);
    }

    const onCloseSelectedPoin = () => {
        let newChoosenFilter = choosenFilter;
        delete newChoosenFilter.poin;
        setChoosenFilter(newChoosenFilter);
    }

    return (
        <div className={`${!open ? 'hidden' : ''} fixed z-[1] overflow-x-hidden inset-y-0 left-0 w-full h-screen px-5 py-4 bg-white`}>
            <section className="flex flex-row items-center justify-between mb-4" id="titile">
                <p className="text-black text-3xl font-bold">Filter</p>
                <img 
                    className="hover:cursor-pointer"
                    src="/cross-icon.svg"
                    width={25}
                    height={25}
                    alt="cross-icon"
                    onClick={() => setOpen()}
                />
            </section>
            <section className="mb-5 flex flex-col gap-2" id="slected-filter">
                {choosenFilter.poin && <FilterButton text={`Poin: 10000 - ${poin}`} crossIcon onClick={() => onCloseSelectedPoin()} />}
                <FilterButton text="Type: Voucher, Product" crossIcon />
                <FilterButton text="Clear All Filter" />
            </section>
            <section id="poin-needed">
                <p className="text-gray-700 font-bold">Poin Needed</p>
                <div className="mb-4 mt-1 flex flex-row w-full justify-between">
                    <p className="text-blue-500 font-bold">IDR 10000</p>
                    <p className="text-blue-500 font-bold">IDR {poin}</p>
                </div>
                <input 
                    type="range" 
                    name="poin" 
                    min={10000} 
                    max={1000000}
                    className="w-full mb-8"
                    value={poin}
                    onChange={(e) => handleChangePoin(e)}
                />
            </section>
            <section id="awards-type">
                <p className="text-gray-700 font-bold">Awards Type</p>
                {
                    awardsType.map((type, index) => {
                        return (
                            <div key={index} className="flex flex-row mt-2 gap-4 items-center">
                                <input className="w-4 h-4" type="checkbox" name={type.name} checked={checked[index]} onChange={() => handleChange(index)} />
                                <label className="font-medium text-blue-500">{type.name}</label>
                            </div>
                        )
                    })
                }
            </section>
            <button className="mt-16 bg-blue-500 text-gray-50 font-medium w-full rounded py-2 px-6 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200">
                Filter
            </button>
        </div>
    )
}

export default Filter