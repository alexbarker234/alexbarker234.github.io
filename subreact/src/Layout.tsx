import { Outlet, Link } from "react-router-dom";
import "./main.scss";

const Layout = () => {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/test">Test</Link>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;
