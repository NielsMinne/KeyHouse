import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { route, AgencyRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import Title from "../../../../Design/Typography/Title";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import PageHeader from "../../../../Design/PageHeader";
import Button from "../../../../Design/Buttons/Button";
import useTitle from "../../../../../core/hooks/useTitle";
import isVoid from "../../../../../core/helpers/isVoid";
import { getImagePath } from "../../../../../core/helpers/api";

const AgencyOverviewScreen = () => {
    const { t } = useTranslation();
    const {
        isLoading,
        data: agencies,
        error,
        invalidate,
    } = useFetch("/agencies");

    useTitle(t("agencies.title"));

    const handleAgencyDelete = () => {
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
                <Title>{t("agencies.overview.title")}</Title>
                <Button href={AgencyRoutes.New}>
                    {t("agencies.overview.create")}
                </Button>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <th></th>
                        <th>{t("fields.name")}</th>
                        <th>{t("agencies.fields.phone")}</th>
                        <th>{t("agencies.fields.actions")}</th>
                    </TableHeader>
                }>
                {agencies.map((agency) => (
                    <TableRow key={agency.id}>
                        <td>
                            {!isVoid(agency.avatar) && (
                                <img
                                    style={{ width: "3rem", height: "3rem" }}
                                    src={getImagePath(agency.avatar)}
                                    alt={agency.name}
                                />
                            )}
                        </td>
                        <td>
                            <p>{agency.name}</p>
                        </td>
                        <td>{agency.phone}</td>
                        <td>
                            <Button
                                color="outline-primary"
                                href={route(AgencyRoutes.Detail, {
                                    id: agency.id,
                                })}>
                                Detail
                            </Button>
                            <DeleteButton
                                size="sm"
                                id={agency.id}
                                scope="agencies"
                                onSuccess={handleAgencyDelete}
                            />
                        </td>
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default AgencyOverviewScreen;
