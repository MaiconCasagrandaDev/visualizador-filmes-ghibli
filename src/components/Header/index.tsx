import { Link, NavLink } from "react-router-dom"

export const Header = () => {

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "text-primary font-semibold transition-colors"
            : "hover:text-primary transition-colors"

    return (
        <header className="fixed top-0 left-0 right-0 z-10 px-6 bg-surface border-b border-border shadow-sm rounded-2xl mt-2">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">

                <Link to="/" className="font-display text-lg sm:text-xl text-heading whitespace-nowrap">
                    🍃 Ghibli Films
                </Link>

                <ul className="flex items-center gap-4 sm:gap-6 font-body text-text-secondary">
                    <li>
                        <NavLink to="/" end className={navLinkClass}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/filmes" className={navLinkClass}>Filmes</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}