import { t } from "i18next";
import { getImagePath } from "../../../../../core/helpers/api";
import isVoid from "../../../../../core/helpers/isVoid";
import { useAuthContext } from "../../../Auth/AuthProvider";
import "./BuildingCard.css";
import { MdBathtub, MdHouseSiding } from "react-icons/md";
import { FaDraftingCompass } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { Link } from "react-router-dom";
import { GuestRoutes, route } from "../../../../../core/routing";
import PropTypes from "prop-types";

const BuildingCard = ({ value }) => {
    const { auth } = useAuthContext();

    // const {mutate} = useMutation();

    // const handleClick = () => {
    //     if(auth !== null){
    //     const data={
    //             "userId" : auth.user.id,
    //             "propertyId": value.id,
    //         }

    //     mutate(`${process.env.REACT_APP_API_URL}/favorites`, {
    //         method: "POST",
    //         data,
    //         multipart: true,
    //         onSuccess: () => {
    //         },
    //     });
    //  };
    // }

    return (
        <>
            <div>
                <div
                    className={
                        value.soldOrAvailable === "AVAILABLE"
                            ? "buildingCardWrap"
                            : "buildingCardWrapSold"
                    }>
                    {/* {auth && <button className="heartbtn" onClick={handleClick}>
                    <FaHeart size={30} className="heart" color="white"></FaHeart>
                    </button>} */}
                    {!isVoid(value.avatar) && (
                        <img
                            style={{ width: "3rem", height: "3rem" }}
                            src={getImagePath(value.avatar)}
                            alt={value.name}
                        />
                    )}
                    <small>{value.agency.name}</small>
                    <Link to={route(GuestRoutes.Detail, { id: value.id })}>
                        <h4 className="text-center">{value.name}</h4>
                        {auth && (
                            <p className="address text-center">
                                {value.address}, {value.city}
                            </p>
                        )}
                        {!auth && (
                            <p className="address text-center">{value.city}</p>
                        )}
                    </Link>
                    <div className="d-flex iconsDiv">
                        <div className="d-flex align-items-center">
                            <MdHouseSiding
                                color="#3969a0"
                                size={36}></MdHouseSiding>
                            <p className="data px-1">{value.rooms}</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <MdBathtub color="#3969a0" size={36}></MdBathtub>
                            <p className="data px-1">{value.bathrooms}</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <FaDraftingCompass
                                color="#3969a0"
                                size={26}></FaDraftingCompass>
                            <p className="data px-1">
                                {value.square} {t("fields.sqr")}
                            </p>
                        </div>
                        <div className="d-flex align-items-center">
                            <ImPriceTags
                                color="#3969a0"
                                size={36}></ImPriceTags>
                            <p className="data px-1">
                                {t("euro")} {value.price}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

BuildingCard.propTypes = {
    onClick: PropTypes.func,
    data: PropTypes.object,
};

export default BuildingCard;
