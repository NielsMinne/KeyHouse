import { useTranslation } from "react-i18next";
import { getImagePath } from "../../../../core/helpers/api";
import isVoid from "../../../../core/helpers/isVoid";
import useFetch from "../../../../core/hooks/useFetch";
import useTitle from "../../../../core/hooks/useTitle";
import { GuestRoutes, route } from "../../../../core/routing";
import Alert from "../../../Design/Alert";
import Button from "../../../Design/Buttons/Button";
import PageHeader from "../../../Design/PageHeader";
import Table from "../../../Design/Table/Table";
import TableHeader from "../../../Design/Table/TableHeader";
import TableRow from "../../../Design/Table/TableRow";
import Title from "../../../Design/Typography/Title";
import { useAuthContext } from "../../Auth/AuthProvider";
import DeleteButton from "../../Shared/Generic/Buttons/DeleteButton";
import LoadingIndicator from "../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const FavoriteOverview = () => {
    const { t } = useTranslation();
    const { auth } = useAuthContext();
    const {
        isLoading,
        data: favorites,
        error,
        invalidate,
    } = useFetch(`/favorites/${auth.user.id}`);

    useTitle(t("favorites.title"));

    const handleFavoriteDelete = () => {
        invalidate();
    };

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("favorites.overview.title")}</Title>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <th></th>
                        <th>{t("fields.property")}</th>
                        <th>{t("fields.detail")}</th>
                        <th>{t("fields.action")}</th>
                    </TableHeader>
                }>
                {favorites.map((favorite) => (
                    <>
                        {favorite.user.id === auth.user.id && (
                            <TableRow key={favorite.id}>
                                <td>
                                    {!isVoid(favorite.property.avatar) && (
                                        <img
                                            style={{
                                                width: "3rem",
                                                height: "3rem",
                                            }}
                                            src={getImagePath(
                                                favorite.property.avatar
                                            )}
                                            alt={favorite.property.name}
                                        />
                                    )}
                                </td>
                                <td>
                                    <p>{favorite.property.name}</p>
                                </td>
                                <td>
                                    <Button
                                        href={route(GuestRoutes.Detail, {
                                            id: favorite.property.id,
                                        })}>
                                        {t("buttons.detail")}
                                    </Button>
                                </td>
                                <td>
                                    <DeleteButton
                                        size="sm"
                                        id={favorite.id}
                                        scope="favorites"
                                        onSuccess={handleFavoriteDelete}
                                    />
                                </td>
                            </TableRow>
                        )}
                    </>
                ))}
            </Table>
        </>
    );
};

export default FavoriteOverview;
