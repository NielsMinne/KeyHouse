import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { PropertyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import PropertyForm from "../../../Shared/Properties/Form/PropertyForm";

const PropertyAddScreen = () => {
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
                navigate(PropertyRoutes.Index);
            },
        });
    };

    return (
        <>
            <BackButton href={route(PropertyRoutes.Index)} />
            <PageHeader>
                <Title>{t("properties.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <PropertyForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default PropertyAddScreen;
