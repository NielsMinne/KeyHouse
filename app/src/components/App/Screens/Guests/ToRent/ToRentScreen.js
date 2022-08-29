import { useTranslation } from "react-i18next";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import Alert from "../../../../Design/Alert";
import BuildingCard from "../../../Shared/Properties/BuildingCard/BuildingCard";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const ToRentScreen = () => {
    const { t } = useTranslation();
    useTitle(t("navigation.toRent"));

    const { isLoading, data: properties, error } = useFetch(`/properties/rent`);

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("navigation.toRent")}</Title>
            </PageHeader>

            <div className="productWrap">
                {properties.map((property) => (
                    <BuildingCard key={property.id} value={property} />
                ))}
            </div>
        </>
    );
};

export default ToRentScreen;
