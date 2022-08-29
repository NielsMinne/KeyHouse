import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { AgencyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import ClientForm from "../../../Shared/Agencies/Form/AgencyForm";

const AgencyAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useTitle(t("agencies.create.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/agencies`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                navigate(AgencyRoutes.Index);
            },
        });
    };

    return (
        <>
            <BackButton href={route(AgencyRoutes.Index)} />
            <PageHeader>
                <Title>{t("agencies.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <ClientForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default AgencyAddScreen;
