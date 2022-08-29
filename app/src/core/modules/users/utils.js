import { UserRoles } from "./constants";

const formatName = (user) => {
    return `${user.name} ${user.surname}`;
};

const isUser = (user) => {
    return user.role === UserRoles.User;
};

const isAgent = (user) => {
    return user.role === UserRoles.Agent;
};

const isAdmin = (user) => {
    return user.role === UserRoles.Admin;
};

export { formatName, isAdmin, isAgent, isUser };
