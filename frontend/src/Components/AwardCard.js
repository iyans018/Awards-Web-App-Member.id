const AwardCard = ({ type, poin, name }) => {
    let bedgeColor;
    switch (type) {
        case "Vouchers":
            bedgeColor = "bg-blue-500";
            break;
        case "Products":
            bedgeColor = "bg-orange-700";
            break;
        case "Giftcard":
            bedgeColor = "bg-green-700";
            break;
        default:
            break;
    }

    return (
        <div>
            <div className="mb-1 bg-gray-300 rounded-lg px-3 py-3 drop-shadow-sm">
                <p className={`text-gray-100 tracking-wide ${bedgeColor} px-3 py-1 rounded w-fit float-right`}>{type}</p>
                <div className="w-20 h-20"></div>
                <p className="text-gray-600 font-bold">{poin} Poin</p>
            </div>
            <span className="text-gray-700 font-bold tracking-wide">{name}</span>
        </div>
    )
}

export default AwardCard;