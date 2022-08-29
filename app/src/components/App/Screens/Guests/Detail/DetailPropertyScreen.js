import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getImagePath } from "../../../../../core/helpers/api";
import isVoid from "../../../../../core/helpers/isVoid";
import useFetch from "../../../../../core/hooks/useFetch";
import { GuestRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import DetailInfo from "../../../../Design/DetailInfo/DetailInfo";
import { useAuthContext } from "../../../Auth/AuthProvider";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import "./DetailPropertyScreen.css";

const DetailPropertyScreen = () => {
    const { auth } = useAuthContext();
    const { t } = useTranslation();
    const { id } = useParams();
    const {
        isLoading,
        data: property,
        error,
    } = useFetch(`/properties/detail/${id}`);

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <BackButton href={route(GuestRoutes.Home)} />
            <div className="detailWrap d-flex justify-content-between">
                {!isVoid(property.avatar) && (
                    <img
                        className="propertyImage"
                        src={getImagePath(property.avatar)}
                        alt={property.name}
                    />
                )}
                <div className="propertyDetails">
                    <div>
                        <h2 className="propertyTitle">{property.name}</h2>
                    </div>
                    {auth && (
                        <DetailInfo
                            label={t("fields.address")}
                            value={property.address}
                        />
                    )}
                    {!auth && (
                        <div>
                            <h5 className="label">{t("fields.address")}</h5>
                            <p>{t("noAdress")}</p>
                        </div>
                    )}
                    <DetailInfo
                        label={t("fields.city")}
                        value={property.city}
                    />
                    <DetailInfo
                        label={t("fields.saleOrRent")}
                        value={property.saleOrRent}
                    />
                    <DetailInfo
                        label={t("fields.rooms")}
                        value={property.rooms}
                    />
                    <DetailInfo
                        label={t("fields.bathrooms")}
                        value={property.bathrooms}
                    />
                    <DetailInfo
                        label={t("fields.square")}
                        value={property.year}
                    />
                    <DetailInfo
                        label={t("fields.year")}
                        value={property.year}
                    />
                </div>
            </div>
        </>
    );
};

export default DetailPropertyScreen;
