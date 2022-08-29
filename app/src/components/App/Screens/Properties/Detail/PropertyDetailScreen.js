import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { getImagePath } from "../../../../../core/helpers/api";
import isVoid from "../../../../../core/helpers/isVoid";
import useTitle from "../../../../../core/hooks/useTitle";
import { PropertyRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import Button from "../../../../Design/Buttons/Button";
import PageHeader from "../../../../Design/PageHeader";
import DetailInfo from "../../../../Design/DetailInfo/DetailInfo";
import Title from "../../../../Design/Typography/Title";

const PropertyDetailScreen = () => {
    const { t } = useTranslation();
    const { property } = useOutletContext();

    useTitle(t(property ? property.name : ""));

    return (
        <>
            <BackButton href={route(PropertyRoutes.Index)} />
            <PageHeader>
                <Title>{property.name}</Title>
                <Button href={route(PropertyRoutes.Edit, { id: property.id })}>
                    {t("buttons.edit")}
                </Button>
            </PageHeader>
            <h4 className="agency">{property.soldOrAvailable}</h4>
            <div className="infoWrap">
                {!isVoid(property.avatar) && (
                    <img
                        style={{ width: "3rem", height: "3rem" }}
                        src={getImagePath(property.avatar)}
                        alt={property.name}
                    />
                )}
                <div className="propertyInfo">
                    <DetailInfo
                        label={t("fields.agency")}
                        value={property.agency.name}
                    />

                    <div>
                        <h5 className="label">{t("fields.price")}</h5>
                        <p>
                            {t("euro")} {property.price}
                        </p>
                    </div>
                    <DetailInfo
                        label={t("fields.saleOrRent")}
                        value={property.saleOrRent}
                    />
                    <DetailInfo
                        label={t("fields.city")}
                        value={property.city}
                    />
                    <DetailInfo
                        label={t("fields.address")}
                        value={property.address}
                    />
                    <DetailInfo
                        label={t("fields.year")}
                        value={property.year}
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
                        value={property.square}
                    />
                </div>
            </div>
        </>
    );
};

export default PropertyDetailScreen;
