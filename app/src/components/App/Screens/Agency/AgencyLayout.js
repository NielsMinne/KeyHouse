import { Outlet } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import Alert from "../../../Design/Alert";
import LoadingIndicator from "../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const AgencyLayout = () => {
    const {
        isLoading,
        error,
        invalidate,
        data: user,
    } = useFetch(`/currentUser`);

    const handleUpdate = () => {
        invalidate();
    };

    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <div>
            <Outlet context={{ user, onUserUpdate: handleUpdate }} />
        </div>
    );
};

export default AgencyLayout;
