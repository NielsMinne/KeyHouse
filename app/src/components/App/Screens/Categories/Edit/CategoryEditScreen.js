import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { CategoryRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import CategoryForm from "../../../Shared/Categories/Form/CategoryForm";

const CategoryEditScreen = () => {
    const { t } = useTranslation();
    const { category, onCategoryUpdate } = useOutletContext();
    const navigate = useNavigate();

    useTitle(t("categories.edit.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/categories/${category.id}`, {
            method: "PATCH",
            data,
            onSuccess: () => {
                onCategoryUpdate();
                navigate(route(CategoryRoutes.Index));
            },
        });
    };

    return (
        <>
            <BackButton href={route(CategoryRoutes.Index)} />
            <PageHeader>
                <Title>{t("categories.edit.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <CategoryForm
                label={t("buttons.save")}
                disabled={isLoading}
                onSubmit={handleSubmit}
                initialData={category}
            />
        </>
    );
};

export default CategoryEditScreen;
