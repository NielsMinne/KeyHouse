import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { getImagePath } from "../../../../../../core/helpers/api";
import isVoid from "../../../../../../core/helpers/isVoid";
import useFetch from "../../../../../../core/hooks/useFetch";
import useTitle from "../../../../../../core/hooks/useTitle";
import {
    AgentRoutes,
    GuestRoutes,
    route,
} from "../../../../../../core/routing";
import Alert from "../../../../../Design/Alert";
import BackButton from "../../../../../Design/Buttons/BackButton";
import Button from "../../../../../Design/Buttons/Button";
import DetailInfo from "../../../../../Design/DetailInfo/DetailInfo";
import PageHeader from "../../../../../Design/PageHeader";
import Title from "../../../../../Design/Typography/Title";
import LoadingIndicator from "../../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const AgentDetailScreen = () => {
    const { t } = useTranslation();
    const { user } = useOutletContext();

    useTitle(user.agency ? user.agency.name : "");

    const {
        isLoading,
        error,
        data: agency,
        // refresh,
    } = useFetch(`/agencies/${user.agency.id}`);

    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <BackButton href={route(GuestRoutes.Home)} />
            <PageHeader>
                <Title>{agency.name}</Title>
                <Button href={route(AgentRoutes.Edit, { id: agency.id })}>
                    {t("buttons.edit")}
                </Button>
            </PageHeader>
            <h4 className="agency">{agency.agency?.name}</h4>
            <div className="infoWrap">
                {!isVoid(agency.avatar) && (
                    <img
                        style={{ width: "3rem", height: "3rem" }}
                        src={getImagePath(agency.avatar)}
                        alt={agency.name}
                    />
                )}
                <div className="agencyInfo">
                    <DetailInfo
                        label={t("fields.address")}
                        value={agency.address}
                    />
                    <DetailInfo label={t("fields.city")} value={agency.city} />
                    <DetailInfo
                        label={t("fields.phone")}
                        value={agency.phone}
                    />
                    <DetailInfo
                        label={t("fields.email")}
                        value={agency.email}
                    />
                </div>
            </div>
        </>
    );
};

export default AgentDetailScreen;
