import {
    AgencyRoutes,
    AgentRoutes,
    CategoryRoutes,
    GuestRoutes,
    PropertyRoutes,
    UserRoutes,
} from "../../../../../core/routing";
import { useAuthContext, useUser } from "../../../Auth/AuthProvider";
import NavBar from "../../../../Design/NavBar/NavBar";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
    isAdmin,
    isAgent,
} from "../../../../../core/modules/users/utils";

const Header = () => {
    const { t } = useTranslation();
    const user = useUser();
    const location = useLocation();
    const { logout } = useAuthContext();

    // default routes
    let items = [
        {
            href: GuestRoutes.Home,
            isActive: location.pathname.includes(GuestRoutes.Home),
            label: t("navigation.home"),
        },
        {
            href: GuestRoutes.ForSale,
            isActive: location.pathname.includes(GuestRoutes.ForSale),
            label: t("navigation.forSale"),
        },
        {
            href: GuestRoutes.ToRent,
            isActive: location.pathname.includes(GuestRoutes.ToRent),
            label: t("navigation.toRent"),
        },
    ];

    // admin only routes

    if (user) {
        // if(isUser(user)){
        //     items=[
        //         ...items,
        //         {
        //             href: FavoriteRoute.Index,
        //             isActive: location.pathname.includes(
        //                 FavoriteRoute.Index
        //             ),
        //             label: t("navigation.favorites"),
        //         }
        //     ]
        // }

        if (isAgent(user)) {
            items = [
                ...items,
                {
                    href: AgentRoutes.PropertyOverview,
                    isActive: location.pathname.includes(
                        AgentRoutes.PropertyOverview
                    ),
                    label: t("navigation.properties"),
                },
                {
                    href: AgentRoutes.Overview,
                    isActive: location.pathname.includes(AgentRoutes.Overview),
                    label: t("navigation.addAgent"),
                },
                {
                    href: AgentRoutes.Detail,
                    isActive: location.pathname.includes(AgentRoutes.Detail),
                    label: t("navigation.editAgency"),
                },
            ];
        }

        if (isAdmin(user)) {
            items = [
                ...items,
                {
                    href: UserRoutes.Index,
                    isActive: location.pathname.includes(UserRoutes.Index),
                    label: t("navigation.users"),
                },
                {
                    href: AgencyRoutes.Index,
                    isActive: location.pathname.includes(AgencyRoutes.Index),
                    label: t("navigation.agencies"),
                },
                {
                    href: PropertyRoutes.Index,
                    isActive: location.pathname.includes(PropertyRoutes.Index),
                    label: t("navigation.properties"),
                },
                {
                    href: CategoryRoutes.Index,
                    isActive: location.pathname.includes(CategoryRoutes.Index),
                    label: t("navigation.categories"),
                },
            ];
        }
    }

    return <NavBar onLogout={logout} navItems={items} />;
};

export default Header;
