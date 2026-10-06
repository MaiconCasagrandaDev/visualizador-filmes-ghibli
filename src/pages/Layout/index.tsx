import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ScrollToTop } from "../../components/ScrollToTop";

function Layout() {
    return (
        <div>
            <ScrollToTop />
            <Header />
            <main className="pt-20">
                <Outlet />
            </main>
            <Footer />
            </div>
    );
}

export default Layout;
