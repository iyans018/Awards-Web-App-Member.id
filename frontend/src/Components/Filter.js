import { useEffect, useState } from "react";
import FilterButton from "./FilterButton";

const arrayToString = (array) => {
    let convertedArrayToString = '';
    if (array.length === 1) {
        convertedArrayToString = array[0];
    } else if (array.length > 1) {
        array.forEach((item, index) => {
            if (index === array.length - 1) {
                convertedArrayToString += `${item}`;
            } else {
                convertedArrayToString += `${item}, `;
            }
        })
    }

    return convertedArrayToString;
}

const Filter = ({ open, setOpen, poin, setPoin, type, setType }) => {
    const awardsType = [
        { _id: 1, name: "All Type" },
        { _id: 2, name: "Vouchers" },
        { _id: 3, name: "Products" },
        { _id: 4, name: "Giftcard" }
    ];
    const [choosenFilter, setChoosenFilter] = useState([]);
    const [checked, setChecked] = useState(new Array(awardsType.length).fill(false));

    const handleChangeCheck = (position) => {
        const updatedChecked = checked.map((item, index) => index === position ? !item : item);

        setChecked(updatedChecked);
    }

    const handleChangePoin = (e) => {
        setPoin(e.target.value);
        let newChoosenFilter = choosenFilter;
        if (newChoosenFilter.find(item => item.hasOwnProperty('poin'))) {
            newChoosenFilter.poin = [10000, poin];
        } else {
            newChoosenFilter = [...newChoosenFilter, { poin: [10000, poin] }];
        }

        setChoosenFilter(newChoosenFilter);
    }

    const onCloseSelectedPoin = () => {
        const newChoosenFilter = choosenFilter.filter(item => !item.hasOwnProperty('poin'))
        setChoosenFilter(newChoosenFilter);
        setPoin(10000);
    }

    const onCloseSelectedType = () => {
        const newChoosenFilter = choosenFilter.filter(item => !item.hasOwnProperty('type'))
        setChoosenFilter(newChoosenFilter);
        setChecked(new Array(awardsType.length).fill(false));
    }

    const onClearAllFilters = () => {
        setChoosenFilter([]);
        setPoin(10000);
        setChecked(new Array(awardsType.length).fill(false));
    }

    const setTypeOtherThanAllType = (name) => {
        setType(prevState => [...prevState, name]);
        let newChoosenFilter = choosenFilter;
        if (newChoosenFilter.find(item => item.hasOwnProperty('type'))) {
            newChoosenFilter.type = type;
        } else {
            newChoosenFilter = [...newChoosenFilter, { type }];
        }
        setChoosenFilter(newChoosenFilter);
    }

    useEffect(() => {
        const onCheckedChange = () => {
            checked.forEach((item, index) => {
                if (item && index === 0) {
                    const type = ["Vouchers", "Products", "Giftcard"]
                    setType(type);
                    const newChoosenFilter = [...choosenFilter, { type }];
                    setChoosenFilter(newChoosenFilter);
                } else if (item && index === 1) {
                    setTypeOtherThanAllType("Vouchers");
                } else if (item && index === 2) {
                    setTypeOtherThanAllType("Products");
                } else if (item && index === 3) {
                    setTypeOtherThanAllType("Giftcard");
                } else if (!item && index === 0) {
                    setType([]);
                    const newChoosenFilter = choosenFilter.filter(item => !item.hasOwnProperty('type'))
                    setChoosenFilter(newChoosenFilter);
                }
            })
        }

        onCheckedChange();
    }, [checked])

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
                    onClick={setOpen}
                />
            </section>
            {choosenFilter.length > 0 && (
                <section className="mb-5 flex flex-col gap-2" id="slected-filter">
                    {choosenFilter.find(item => item.hasOwnProperty('poin')) && <FilterButton text={`Poin: 10000 - ${poin}`} crossIcon onClick={onCloseSelectedPoin} />}
                    {choosenFilter.find(item => item.hasOwnProperty('type')) && <FilterButton text={`Type: ${arrayToString(type)}`} crossIcon onClick={onCloseSelectedType} />}
                    {choosenFilter.length > 0 && <FilterButton text="Clear All Filter" onClick={onClearAllFilters} />}
                </section>
            )}
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
                                <input className="w-4 h-4" type="checkbox" name={type.name} checked={checked[index]} onChange={() => handleChangeCheck(index)} />
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