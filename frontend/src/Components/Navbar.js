import { useState, useEffect, useRef } from "react";
import Filter from "./Filter";

const Navbar = () => {
    const listMenu = [ "Home", "Cards", "Profile", "Logout" ];
    const [menu, setMenu] = useState(false);
    const [filter, setFilter] = useState(false);

    const ref = useRef(null);
    
    const handleCloseMenu = (e) => {
        if (!ref.current.contains(e.target) && menu) {
            setMenu(!menu);
        }
    }
    
    useEffect(() => {
        document.addEventListener("click", handleCloseMenu, true);
    }, [handleCloseMenu]);

    return (
        <nav>
            <ul className="flex px-4 py-1 flex-row w-full items-center justify-between">
                <li>
                    <img 
                        className="hover:cursor-pointer" 
                        src="/hamburger-icon.svg" 
                        width={35} 
                        height={35} 
                        alt="hamburger-icon"
                        onClick={() => setMenu(!menu)} 
                    />
                </li>
                <li>
                    <p className="hover:cursor-pointer text-3xl font-bold">Awards</p>
                </li>
                <li>
                    <img 
                        className="hover:cursor-pointer" 
                        src="/filter-icon-2.svg" 
                        width={35} 
                        height={35} 
                        alt="gambar-filter-menu" 
                        onClick={() => setFilter(!filter)}
                    />
                </li>
            </ul>
            <div className={`${!menu ? 'hidden' : ''} fixed z-[1] overflow-x-hidden bg-black/40 min-w-full min-h-full inset-y-0 left-0`}>
                <div ref={ref} className="w-4/6 duration-1000 flex flex-col pt-24 items-center min-h-screen bg-white">
                    <ul className="flex flex-col gap-5">
                        <li>
                            <img src="/star-icon.png" width="100" height="100" alt="gambar-bintang" />
                        </li>
                        <li>
                            <p className="text-black text-xl font-extrabold">Awards Menu</p>
                        </li>
                        {
                            listMenu.map((item, index) => {
                                return (
                                    <li className="text-gray-400 font-medium cursor-pointer hover:text-black" key={index}>
                                        {item}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <Filter open={filter} setOpen={() => setFilter(!filter)} />
        </nav>
    )
}

export default Navbar;