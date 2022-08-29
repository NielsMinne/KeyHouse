import { useTranslation } from "react-i18next";
import useTitle from "../../../../../core/hooks/useTitle";
import { AuthRoutes, GuestRoutes } from "../../../../../core/routing";
import Button from "../../../../Design/Buttons/Button";
import { useAuthContext } from "../../../Auth/AuthProvider";
import "./HomeScreen.css";

const HomeScreen = () => {
    const { auth } = useAuthContext();
    const { t } = useTranslation();
    useTitle(t("navigation.home"));

    return (
        <>
            <div className="homeWrap">
                <h1 className="text-center">{t("home.welcome")}</h1>
                <h4 className="text-center">{t("home.subtext")}</h4>
                {!auth && (
                    <div className="homeBtn">
                        <Button color="outline-primary" href={AuthRoutes.Login}>
                            {t("onboarding.login.title")}
                        </Button>
                        <Button color="primary" href={AuthRoutes.Register}>
                            {t("onboarding.register.title")}
                        </Button>
                    </div>
                )}
                {auth && (
                    <div className="homeBtn">
                        <Button color="primary" href={GuestRoutes.ForSale}>
                            {t("buttons.goToSale")}
                        </Button>
                        <Button color="primary" href={GuestRoutes.ToRent}>
                            {t("buttons.goToRent")}
                        </Button>
                    </div>
                )}
            </div>
            <img
                className="logoHome"
                src="../images/house.png"
                alt="house"></img>
        </>
    );
};

export default HomeScreen;
