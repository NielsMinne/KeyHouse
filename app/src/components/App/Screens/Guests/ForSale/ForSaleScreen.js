import { useTranslation } from "react-i18next";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import Alert from "../../../../Design/Alert";
import BuildingCard from "../../../Shared/Properties/BuildingCard/BuildingCard";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import "./ForSaleScreen.css";

const ForSaleScreen = () => {
    const { t } = useTranslation();
    useTitle(t("navigation.forSale"));

    const { isLoading, data: properties, error } = useFetch(`/properties/sale`);

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("page.forSale")}</Title>
            </PageHeader>

            <div className="productWrap">
                {properties.map((property) => (
                    <BuildingCard key={property.id} value={property} />
                ))}
            </div>
        </>
    );
};

export default ForSaleScreen;
