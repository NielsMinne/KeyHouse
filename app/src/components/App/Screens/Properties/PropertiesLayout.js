import { Outlet } from "react-router-dom";
import "./Property.css";

const PropertiesLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default PropertiesLayout;
