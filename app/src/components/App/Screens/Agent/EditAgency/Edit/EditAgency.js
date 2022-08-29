import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import useMutation from "../../../../../../core/hooks/useMutation";
import useTitle from "../../../../../../core/hooks/useTitle";
import { AgentRoutes, route } from "../../../../../../core/routing";
import Alert from "../../../../../Design/Alert";
import BackButton from "../../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../../Design/PageHeader";
import Title from "../../../../../Design/Typography/Title";
import AgencyForm from "../../../../Shared/Agencies/Form/AgencyForm";

const EditAgency = () => {
    const { t } = useTranslation();
    const { agency, onAgencyUpdate } = useOutletContext();
    const navigate = useNavigate();

    useTitle(t("agencies.edit.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/agencies/${agency.id}`, {
            method: "PATCH",
            data,
            multipart: true,
            onSuccess: () => {
                onAgencyUpdate();
                navigate(route(AgentRoutes.Detail, { id: agency.id }));
            },
        });
    };

    return (
        <>
            <BackButton href={route(AgentRoutes.Detail)} />
            <PageHeader>
                <Title>{t("agencies.edit.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <AgencyForm
                label={t("buttons.save")}
                disabled={isLoading}
                onSubmit={handleSubmit}
                initialData={agency}
            />
        </>
    );
};

export default EditAgency;
