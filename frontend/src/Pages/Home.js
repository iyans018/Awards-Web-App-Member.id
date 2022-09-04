import axios from "axios";
import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "../Components/Navbar";
import Pagination from "../Components/Pagination";

const AwardCard = lazy(() => import("../Components/AwardCard"));

const Awards = () => {
    const [awards, setAwards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    
    useEffect(() => {;
        getAwards();
    }, [currentPage]);

    const getAwards = async () => {
        const response = await axios.get(`http://localhost:8000/api/v1/awards?page=${currentPage}`);
        const { data, success } = response.data;

        if (success) {
            setAwards(data.awards);
            setTotalPages(data.totalPages);
        }
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
                        <Suspense key={award._id} fallback={<div>Loading...</div>}>
                            <AwardCard type={award.type} poin={award.poin} name={award.name} />
                        </Suspense>
                    ))
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </>
    )
}

export default Awards;