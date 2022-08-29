import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { CategoryRoutes, route } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import Button from "../../../../Design/Buttons/Button";
import Title from "../../../../Design/Typography/Title";
import PageHeader from "../../../../Design/PageHeader";
import useTitle from "../../../../../core/hooks/useTitle";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";

const CategoryOverviewScreen = () => {
    const { t } = useTranslation();
    const {
        isLoading,
        data: categories,
        error,
        invalidate,
    } = useFetch("/categories");

    useTitle(t("categories.title"));

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    const handleAgencyDelete = () => {
        invalidate();
    };

    return (
        <>
            <div className="">
                <PageHeader>
                    <Title>{t("categories.overview.title")}</Title>
                    <Button href={CategoryRoutes.New}>
                        {t("categories.overview.create")}
                    </Button>
                </PageHeader>
                <Table
                    header={
                        <TableHeader>
                            <th>{t("fields.id")}</th>
                            <th>{t("fields.name")}</th>
                            <th>{t("fields.action")}</th>
                        </TableHeader>
                    }>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <Button
                                    color="outline-primary"
                                    href={route(CategoryRoutes.Edit, {
                                        id: category.id,
                                    })}>
                                    Edit
                                </Button>
                                <DeleteButton
                                    size="sm"
                                    id={category.id}
                                    scope="categories"
                                    onSuccess={handleAgencyDelete}
                                />
                            </td>
                        </TableRow>
                    ))}
                </Table>
            </div>
        </>
    );
};

export default CategoryOverviewScreen;
