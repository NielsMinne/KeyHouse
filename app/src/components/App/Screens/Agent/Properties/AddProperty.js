import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { AgentRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import AgentPropertyForm from "../../../Shared/Agent/Forms/AgentPropertyForm";

const AddProperty = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    useTitle(t("properties.create.title"));

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/properties`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                navigate(AgentRoutes.PropertyOverview);
            },
        });
    };

    return (
        <>
            <BackButton href={route(AgentRoutes.PropertyOverview)} />
            <PageHeader>
                <Title>{t("properties.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <AgentPropertyForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default AddProperty;
