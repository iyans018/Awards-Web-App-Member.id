import React from "react"
import { usePagination } from "../Hooks/usePagination"

const Pagination = (props) => {
    const { onPageChange, totalPages, siblingCount = 1, currentPage } = props;
    const paginationRange = usePagination({ currentPage, totalPages, siblingCount });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className="mt-10 mb-10 flex flex-row justify-center items-center gap-4">
            {currentPage !== 1 && (
                <li>
                    <img
                        className="cursor-pointer" 
                        src="/left-arrow.svg" 
                        width={35} 
                        height={35} 
                        alt="left-arrow"
                        onClick={onPrevious}
                    />
                </li>
            )}
            {paginationRange.map(pageNumber => {
                if (pageNumber === 'DOTS') {
                    return <li>&#8230;</li>;
                }

                return (
                    <li key={pageNumber} className={`bg-gray-200 px-3 py-1 cursor-pointer rounded hover:bg-gray-500 hover:text-white ${pageNumber === currentPage && 'bg-gray-500'}`} onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </li>
                );
            })}
            {currentPage !== lastPage && (
                <li>
                    <img 
                        className="cursor-pointer"
                        src="/right-arrow.svg" 
                        width={35} 
                        height={35} 
                        alt="left-arrow"
                        onClick={onNext}
                    />
                </li>
            )}
        </ul>
    )
}

export default Pagination;