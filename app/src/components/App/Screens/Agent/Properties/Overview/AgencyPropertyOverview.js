import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { getImagePath } from "../../../../../../core/helpers/api";
import isVoid from "../../../../../../core/helpers/isVoid";
import useFetch from "../../../../../../core/hooks/useFetch";
import useTitle from "../../../../../../core/hooks/useTitle";
import { AgentRoutes, route } from "../../../../../../core/routing";
import Alert from "../../../../../Design/Alert";
import Button from "../../../../../Design/Buttons/Button";
import PageHeader from "../../../../../Design/PageHeader";
import Table from "../../../../../Design/Table/Table";
import TableHeader from "../../../../../Design/Table/TableHeader";
import TableRow from "../../../../../Design/Table/TableRow";
import Title from "../../../../../Design/Typography/Title";
import DeleteButton from "../../../../Shared/Generic/Buttons/DeleteButton";
import LoadingIndicator from "../../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const AgencyPropertyOverview = () => {
    const { t } = useTranslation();
    const { user } = useOutletContext();

    const {
        isLoading,
        data: properties,
        error,
        invalidate,
    } = useFetch(`/agencyProperty/${user.agency.id}`);

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
                <Button href={AgentRoutes.NewProperty}>
                    {t("properties.overview.create")}
                </Button>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <th></th>
                        <th>{t("fields.name")}</th>
                        <th>{t("fields.address")}</th>
                        <th>{t("fields.city")}</th>
                        <th>{t("fields.square")}</th>
                        <th>{t("fields.price")}</th>
                        <th>{t("fields.saleOrRent")}</th>
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
                        <td>{property.address}</td>
                        <td>{property.city}</td>
                        <td>{property.square}</td>
                        <td>
                            {t("euro")} {property.price}
                        </td>
                        <td>{property.saleOrRent}</td>
                        <td>
                            <Button
                                color="outline-primary"
                                href={route(AgentRoutes.PropertyDetail, {
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

export default AgencyPropertyOverview;
