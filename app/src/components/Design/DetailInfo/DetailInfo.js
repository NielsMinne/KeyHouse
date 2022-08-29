import PropTypes from "prop-types";
import "./DetailInfo.css";

const DetailInfo = ({ label, value }) => {
    return (
        <div>
            <h5 className="label">{label}</h5>
            <p>{value}</p>
        </div>
    );
};

DetailInfo.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default DetailInfo;
