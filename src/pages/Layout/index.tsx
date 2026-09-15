import {Outlet} from "react-router-dom"

function Layout() {
    return (
        <div>
            <h2>Studio Ghibli Films</h2>
            <Outlet />
        </div>
    )
}

export default Layout