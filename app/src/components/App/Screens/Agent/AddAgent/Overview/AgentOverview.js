import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import useFetch from "../../../../../../core/hooks/useFetch";
import useTitle from "../../../../../../core/hooks/useTitle";
import { formatName } from "../../../../../../core/modules/users/utils";
import { AgentRoutes } from "../../../../../../core/routing";
import Alert from "../../../../../Design/Alert";
import Button from "../../../../../Design/Buttons/Button";
import PageHeader from "../../../../../Design/PageHeader";
import Table from "../../../../../Design/Table/Table";
import TableHeader from "../../../../../Design/Table/TableHeader";
import TableRow from "../../../../../Design/Table/TableRow";
import Title from "../../../../../Design/Typography/Title";
import LoadingIndicator from "../../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const AgentOverview = () => {
    const { t } = useTranslation();
    const { user } = useOutletContext();
    const {
        isLoading,
        data: users,
        error,
    } = useFetch(`/agencyUsers/${user.agency.id}`);

    useTitle(t("agent.addAgent"));

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("agent.addAgent")}</Title>
                <Button href={AgentRoutes.New}>
                    {t("users.overview.create")}
                </Button>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <th>{t("fields.id")}</th>
                        <th>{t("fields.name")}</th>
                        <th>{t("fields.email")}</th>
                    </TableHeader>
                }>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <td>{user.id}</td>
                        <td>{formatName(user)}</td>
                        <td>{user.email}</td>
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default AgentOverview;
