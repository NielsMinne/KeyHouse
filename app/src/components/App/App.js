import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import {
    AuthRoutes,
    AgencyRoutes,
    PropertyRoutes,
    UserRoutes,
    CategoryRoutes,
    GuestRoutes,
    AgentRoutes,
} from "../../core/routing";
import AppLayout from "./AppLayout";
import AuthProvider from "./Auth/AuthProvider";
import LoginScreen from "./Auth/Login/LoginScreen";
import OnboardingLayout from "./Auth/OnboardingLayout";
import AgencyLayout from "./Screens/Agency/AgencyLayout";
import ClientDetailLayout from "./Screens/Agency/Detail/AgencyDetailLayout";
import ClientDetailScreen from "./Screens/Agency/Detail/AgencyDetailScreen";
import ClientEditScreen from "./Screens/Agency/Edit/AgencyEditScreen";
import ClientAddScreen from "./Screens/Agency/Add/AgencyAddScreen";
import AuthContainer from "./Auth/AuthContainer";
import RoleContainer from "./Auth/RoleContainer";
import { UserRoles } from "../../core/modules/users/constants";
import UsersLayout from "./Screens/Users/UsersLayout";
import UsersOverviewScreen from "./Screens/Users/Overview/UsersOverviewScreen";
import UserAddScreen from "./Screens/Users/Add/UserAddScreen";
import UserDetailLayout from "./Screens/Users/Detail/UserDetailLayout";
import UserDetailScreen from "./Screens/Users/Detail/UserDetailScreen";
import UserEditScreen from "./Screens/Users/Edit/UserEditScreen";
import AgencyOverviewScreen from "./Screens/Agency/Overview/AgencyOverviewScreen";
import PropertiesLayout from "./Screens/Properties/PropertiesLayout";
import PropertyOverviewScreen from "./Screens/Properties/Overview/PropertiesOverviewScreen";
import PropertyAddScreen from "./Screens/Properties/Add/PropertyAddScreen";
import PropertyDetailLayout from "./Screens/Properties/Detail/PropertyDetailLayout";
import PropertyDetailScreen from "./Screens/Properties/Detail/PropertyDetailScreen";
import PropertyEditScreen from "./Screens/Properties/Edit/PropertyEditScreen";
import CategoryEditScreen from "./Screens/Categories/Edit/CategoryEditScreen";
import CategoryDetailLayout from "./Screens/Categories/Detail/CategoryDetailLayout";
import CategoryLayout from "./Screens/Categories/CategoryLayout";
import CategoryOverviewScreen from "./Screens/Categories/Overview/CategoryOverviewScreen";
import CategoryAddScreen from "./Screens/Categories/Add/CategoryAddScreen";
import HomeScreen from "./Screens/Guests/Home/HomeScreen";
import ForSaleScreen from "./Screens/Guests/ForSale/ForSaleScreen";
import ToRentScreen from "./Screens/Guests/ToRent/ToRentScreen";
import RegisterScreen from "./Auth/Register/RegisterScreen";
import AgentDetailScreen from "./Screens/Agent/EditAgency/Detail/AgentDetailScreen";
import EditAgency from "./Screens/Agent/EditAgency/Edit/EditAgency";
import GuestLayout from "./GuestLayout";
import AgentOverview from "./Screens/Agent/AddAgent/Overview/AgentOverview";
import AddAgent from "./Screens/Agent/AddAgent/AddAgent";
import AgencyPropertyOverview from "./Screens/Agent/Properties/Overview/AgencyPropertyOverview";
import AddProperty from "./Screens/Agent/Properties/AddProperty";
import EditAccount from "./Auth/Edit/EditAccount";
import EditProperty from "./Screens/Agent/Properties/Edit/EditProperty";
import DetailProperty from "./Screens/Agent/Properties/Detail/DetailProperty";
import DetailPropertyScreen from "./Screens/Guests/Detail/DetailPropertyScreen";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path={AuthRoutes.Index} element={<OnboardingLayout />}>
                    <Route path={AuthRoutes.Login} element={<LoginScreen />} />
                    <Route
                        path={AuthRoutes.Register}
                        element={<RegisterScreen />}
                    />
                </Route>
                {/* GUEST AND USER VIEW */}
                <Route path={GuestRoutes.Index} element={<GuestLayout />}>
                    <Route path={GuestRoutes.Home} element={<HomeScreen />} />
                    <Route
                        path={GuestRoutes.ForSale}
                        element={<ForSaleScreen />}
                    />
                    <Route
                        path={GuestRoutes.ToRent}
                        element={<ToRentScreen />}
                    />
                    <Route
                        path={GuestRoutes.Detail}
                        element={<DetailPropertyScreen />}
                    />
                    <Route
                        path="/"
                        element={<Navigate to={GuestRoutes.Home} />}
                    />
                </Route>

                <Route
                    element={
                        <AuthContainer>
                            <AppLayout />
                        </AuthContainer>
                    }>
                    <Route
                        path={GuestRoutes.EditAccount}
                        element={<EditAccount />}
                    />

                    {/* <Route path={FavoriteRoute.Index}
                            element={<FavoriteOverview/>}/> */}

                    <Route
                        element={
                            <RoleContainer roles={[UserRoles.Agent]}>
                                <AgencyLayout />
                            </RoleContainer>
                        }>
                        <Route
                            path={AgentRoutes.Detail}
                            element={<AgentDetailScreen />}
                        />
                        <Route
                            path={AgentRoutes.Edit}
                            element={<EditAgency />}
                        />

                        <Route
                            path={AgentRoutes.Overview}
                            element={<AgentOverview />}
                        />
                        <Route path={AgentRoutes.New} element={<AddAgent />} />

                        <Route
                            path={AgentRoutes.PropertyOverview}
                            element={<AgencyPropertyOverview />}
                        />
                        <Route
                            path={AgentRoutes.NewProperty}
                            element={<AddProperty />}
                        />
                        <Route
                            path={AgentRoutes.PropertyDetail}
                            element={<DetailProperty />}
                        />
                        <Route
                            path={AgentRoutes.EditProperty}
                            element={<EditProperty />}
                        />
                    </Route>

                    {/* Projects */}
                    <Route
                        path={PropertyRoutes.Index}
                        element={<PropertiesLayout />}>
                        <Route index element={<PropertyOverviewScreen />} />
                        <Route
                            path={PropertyRoutes.New}
                            element={<PropertyAddScreen />}
                        />
                        <Route
                            path={PropertyRoutes.Detail}
                            element={<PropertyDetailLayout />}>
                            <Route index element={<PropertyDetailScreen />} />
                            <Route
                                path={PropertyRoutes.Edit}
                                element={<PropertyEditScreen />}
                            />
                        </Route>
                    </Route>

                    {/* Admin */}
                    <Route
                        element={
                            <RoleContainer roles={[UserRoles.Admin]}>
                                <Outlet />
                            </RoleContainer>
                        }>
                        <Route
                            path={AgencyRoutes.New}
                            element={<ClientAddScreen />}
                        />

                        {/* Users */}
                        <Route
                            path={UserRoutes.Index}
                            element={<UsersLayout />}>
                            <Route index element={<UsersOverviewScreen />} />
                            <Route
                                path={UserRoutes.New}
                                element={<UserAddScreen />}
                            />
                            <Route
                                path={UserRoutes.Detail}
                                element={<UserDetailLayout />}>
                                <Route index element={<UserDetailScreen />} />
                                <Route
                                    path={UserRoutes.Edit}
                                    element={<UserEditScreen />}
                                />
                            </Route>
                        </Route>
                        {/* Agencies */}
                        <Route
                            path={AgencyRoutes.Index}
                            element={<AgencyLayout />}>
                            <Route index element={<AgencyOverviewScreen />} />

                            <Route
                                path={AgencyRoutes.Detail}
                                element={<ClientDetailLayout />}>
                                <Route index element={<ClientDetailScreen />} />
                                <Route
                                    path={AgencyRoutes.Edit}
                                    element={<ClientEditScreen />}
                                />
                            </Route>
                        </Route>
                        {/* Categories */}
                        <Route
                            path={CategoryRoutes.Index}
                            element={<CategoryLayout />}>
                            <Route index element={<CategoryOverviewScreen />} />
                            <Route
                                path={CategoryRoutes.New}
                                element={<CategoryAddScreen />}
                            />
                            <Route
                                path={CategoryRoutes.Edit}
                                element={<CategoryDetailLayout />}>
                                <Route index element={<CategoryEditScreen />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
