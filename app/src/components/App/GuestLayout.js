import { Outlet } from "react-router-dom";
import Container from "../Design/Container";
import Header from "./Shared/Generic/Header/Header";

const GuestLayout = () => {
    return (
        <>
            <Header />
            <div className="containWrapper">
                <Container>
                    <Outlet />
                </Container>
            </div>
        </>
    );
};

export default GuestLayout;
