import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { formatName } from "../../../../../core/modules/users/utils";
import { UserRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import Button from "../../../../Design/Buttons/Button";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";

const UserDetailScreen = () => {
    const { t } = useTranslation();
    const { user } = useOutletContext();

    useTitle(user ? formatName(user) : "");

    return (
        <>
            <div className="userWrap">
                <BackButton href={route(UserRoutes.Index)} />
                <PageHeader>
                    <Title>{formatName(user)}</Title>
                </PageHeader>
                <div>
                    <h5>{t("fields.email")}</h5>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h5>{t("fields.role")}</h5>
                    <p>{user.role}</p>
                </div>
                <Button
                    color="primary"
                    href={route(UserRoutes.Edit, { id: user.id })}>
                    {t("buttons.edit")}
                </Button>
            </div>
        </>
    );
};

export default UserDetailScreen;
