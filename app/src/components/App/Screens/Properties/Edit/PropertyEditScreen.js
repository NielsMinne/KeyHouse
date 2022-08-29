import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { PropertyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import PropertyForm from "../../../Shared/Properties/Form/PropertyForm";

const PropertyEditScreen = () => {
    const { t } = useTranslation();
    const { property, onPropertyUpdate } = useOutletContext();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    useTitle(t("projects.edit.title"));

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/properties`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                onPropertyUpdate();
                navigate(route(PropertyRoutes.Detail, { id: property.id }));
            },
        });
    };

    return (
        <>
            <BackButton
                href={route(PropertyRoutes.Detail, { id: property.id })}
            />
            <PageHeader>
                <Title>{t("properties.edit.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <PropertyForm
                label={t("buttons.save")}
                disabled={isLoading}
                onSubmit={handleSubmit}
                initialData={property}
            />
        </>
    );
};

export default PropertyEditScreen;
