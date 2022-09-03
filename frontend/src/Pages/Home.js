import Navbar from "../Components/Navbar";
import AwardCard from "../Components/AwardCard";

const Awards = () => {
    return (
        <>
            <Navbar />
            <div className="px-7 pt-7 h-full flex flex-col gap-5">
                <AwardCard type="Vouchers" poin={250000} name="Gift Card IDR 500.0000" />
                <AwardCard type="Products" poin={250000} name="Gift Card IDR 500.0000" />
                <AwardCard type="Giftcard" poin={250000} name="Gift Card IDR 500.0000" />
                <AwardCard type="Vouchers" poin={250000} name="Gift Card IDR 500.0000" />
                <AwardCard type="Products" poin={250000} name="Gift Card IDR 500.0000" />
            </div>

            {/* Pagination */}
            <ul className="mt-10 mb-10 flex flex-row justify-center items-center gap-4">
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
            </ul>
        </>
    )
}

export default Awards;