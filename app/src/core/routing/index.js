const AuthRoutes = {
    Index: "/auth",
    Login: "/auth/login",
    Register: "/auth/register",
};

const GuestRoutes = {
    Index: "/",
    Home: "/home",
    ForSale: "/for-sale",
    ToRent: "/to-rent",
    EditAccount: "/edit-account",
    Detail: "/detail/:id",
};

const FavoriteRoute = {
    Index: "/favorites",
};

const AgencyRoutes = {
    Index: "/agencies",
    New: "/agencies/new",
    Detail: "/agencies/:id",
    Edit: "/agencies/:id/edit",
};

const AgentRoutes = {
    Index: "/agent",
    Detail: "/agent/detail",
    Edit: "/agent/detail/edit/:id",
    Overview: "/agent/overview",
    New: "/agent/add",
    PropertyOverview: "/agent/property",
    PropertyDetail: "/agent/property/detail/:id",
    EditProperty: "/agent/property/edit",
    NewProperty: "/agent/property/new",
};

const PropertyRoutes = {
    Index: "/properties",
    New: "/properties/new",
    Detail: "/properties/:id",
    Edit: "/properties/:id/edit",
};

const CategoryRoutes = {
    Index: "/categories",
    New: "/categories/new",
    Edit: "/categories/:id/edit",
};

const MessageRoutes = {
    Index: "/messages",
    New: "/messages/new",
};

const UserRoutes = {
    Index: "/users",
    New: "/users/new",
    Detail: "/users/:id",
    Edit: "/users/:id/edit",
};

// replaces : values with values from object
// e.g. route('/projects/:id', { id : 9 }) -> /projects/9
export const route = (path, options = {}) => {
    Object.keys(options).forEach((key) => {
        path = path.replace(`:${key}`, options[key]);
    });
    return path;
};

export {
    AuthRoutes,
    AgencyRoutes,
    UserRoutes,
    AgentRoutes,
    MessageRoutes,
    CategoryRoutes,
    PropertyRoutes,
    GuestRoutes,
    FavoriteRoute,
};
