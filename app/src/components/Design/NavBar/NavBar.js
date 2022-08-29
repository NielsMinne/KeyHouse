import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../Buttons/Button";
import { t } from "i18next";
import { useAuthContext } from "../../App/Auth/AuthProvider";
import "./NavBar.css";
import { AuthRoutes, GuestRoutes } from "../../../core/routing";

const NavBar = ({ navItems = [], onLogout }) => {
    const { auth } = useAuthContext();

    return (
        <nav className="navbar navbar-light navbar-expand-lg bg-light">
            <div className="navBarDiv container-fluid">
                <img
                    className="logo"
                    src="../images/keyhouse-logo.png"
                    alt="logo"></img>
                <Link className="navbar-brand" to="/">
                    {t("organization.name")}
                </Link>
                <div className="navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {navItems.map((navItem) => (
                            <li className="nav-item" key={navItem.href}>
                                <Link
                                    className={`nav-link ${
                                        navItem.isActive ? "active" : ""
                                    }`}
                                    to={navItem.href}>
                                    {navItem.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {!auth && (
                    <div className="d-flex gap-2">
                        <Button color="outline-primary" href={AuthRoutes.Login}>
                            Login
                        </Button>
                        <Button href={AuthRoutes.Register}>Register</Button>
                    </div>
                )}
                {auth && (
                    <div className="d-flex gap-2">
                        <Button
                            href={GuestRoutes.EditAccount}
                            color="outline-dark">
                            {t("navigation.edit")}
                        </Button>
                        <Button color="secondary" onClick={onLogout}>
                            Logout
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    onLogout: PropTypes.func.isRequired,
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            to: PropTypes.string,
            label: PropTypes.string,
        })
    ).isRequired,
};

export default NavBar;
