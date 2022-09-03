import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import AwardCard from "../Components/AwardCard";

const Awards = () => {
    const [awards, setAwards] = useState([]);
    
    useEffect(() => {;
        getAwards();
    }, []);

    const getAwards = async () => {
        const response = await axios.get('http://localhost:8000/api/v1/awards');
        const { data, success } = response.data;

        if (success) setAwards(data.awards);
    }

    return (
        <>
            <Navbar />
            <div className="px-7 pt-7 h-full flex flex-col gap-5">
                {awards.length < 1 ? (
                    <div className="flex flex-col justify-center items-center gap-2">
                        <img src="/star-icon.png" width={200} height={200} alt="star-icon" />
                        <p className="font-medium text-xl">No Awards Found</p>
                    </div>
                ) : (
                    awards.map(award => (
                        <AwardCard key={award._id} type={award.type} poin={award.poin} name={award.name} />
                    ))
                )}
            </div>

            {/* Pagination */}
            {/* <ul className="mt-10 mb-10 flex flex-row justify-center items-center gap-4">
                <li>
                    <img src="/left-arrow.svg" width={35} height={35} alt="left-arrow" />
                </li>
                <li>1</li>
                <li>&#8230;</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>&#8230;</li>
                <li>25</li>
                <li>
                    <img src="/right-arrow.svg" width={35} height={35} alt="left-arrow" />
                </li>
            </ul> */}
        </>
    )
}

export default Awards;