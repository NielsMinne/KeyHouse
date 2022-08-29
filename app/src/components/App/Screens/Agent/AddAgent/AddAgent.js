import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { AgentRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import AgentUserForm from "../../../Shared/Agent/Forms/AgentUserForm";

const AddAgent = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useTitle(t("agent.addAgent"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/users`, {
            method: "POST",
            data,
            onSuccess: () => {
                navigate(AgentRoutes.Overview);
            },
        });
    };

    return (
        <>
            <BackButton href={route(AgentRoutes.Overview)} />
            <PageHeader>
                <Title>{t("agencies.create.agent")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <AgentUserForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default AddAgent;
