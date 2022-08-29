import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { route, PropertyRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import Button from "../../../../Design/Buttons/Button";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import useTitle from "../../../../../core/hooks/useTitle";
import { getImagePath } from "../../../../../core/helpers/api";
import isVoid from "../../../../../core/helpers/isVoid";

const PropertyOverviewScreen = () => {
    const { t } = useTranslation();
    const {
        isLoading,
        data: properties,
        error,
        invalidate,
    } = useFetch("/properties");

    useTitle(t("properties.title"));

    const handlePropertyDelete = () => {
        invalidate();
    };

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("properties.overview.title")}</Title>
                <Button href={PropertyRoutes.New}>
                    {t("properties.overview.create")}
                </Button>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <th></th>
                        <th>{t("fields.name")}</th>

                        <th>{t("fields.city")}</th>
                        <th>{t("fields.agency")}</th>
                        <th>{t("fields.price")}</th>
                        <th>{t("fields.saleOrRent")}</th>
                        <th>{t("fields.soldOrAvailable")}</th>
                        <th>{t("fields.action")}</th>
                        <th></th>
                    </TableHeader>
                }>
                {properties.map((property) => (
                    <TableRow key={property.id}>
                        <td>
                            {!isVoid(property.avatar) && (
                                <img
                                    style={{ width: "3rem", height: "3rem" }}
                                    src={getImagePath(property.avatar)}
                                    alt={property.name}
                                />
                            )}
                        </td>
                        <td>{property.name}</td>

                        <td>{property.city}</td>
                        <td>{property.agency.name}</td>
                        <td>
                            {t("euro")} {property.price}
                        </td>
                        <td>{property.saleOrRent}</td>
                        <td>{property.soldOrAvailable}</td>
                        <td>
                            <Button
                                color="outline-primary"
                                href={route(PropertyRoutes.Detail, {
                                    id: property.id,
                                })}>
                                {t("buttons.detail")}
                            </Button>
                            <DeleteButton
                                size="sm"
                                scope="properties"
                                id={property.id}
                                onSuccess={handlePropertyDelete}
                            />
                        </td>
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default PropertyOverviewScreen;
