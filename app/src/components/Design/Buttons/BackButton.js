import PropTypes from "prop-types";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./BackButton.css";

const BackButton = ({ href = "/" }) => {
    return (
        <Link
            to={href}
            className="text-muted mt-4 mb-3 d-flex align-items-center">
            <BiArrowBack color="#3969a0" size={26} />
            <span className="d-block ms-1 backText">Back</span>
        </Link>
    );
};

BackButton.propTypes = {
    href: PropTypes.string,
};

export default BackButton;
