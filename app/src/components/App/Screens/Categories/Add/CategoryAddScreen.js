import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { CategoryRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import CategoryForm from "../../../Shared/Categories/Form/CategoryForm";

const CategoryAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useTitle(t("categories.create.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/categories`, {
            method: "POST",
            data,
            onSuccess: () => {
                navigate(CategoryRoutes.Index);
            },
        });
    };

    return (
        <>
            <BackButton href={route(CategoryRoutes.Index)} />
            <PageHeader>
                <Title>{t("categories.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <CategoryForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default CategoryAddScreen;
