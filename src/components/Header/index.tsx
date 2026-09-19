import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-10 px-6 bg-surface border-b border-border shadow-sm rounded-2xl mt-2">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link to="/" className="font-display text-xl text-heading">
                    🍃 Ghibli Films
                </Link>

                <ul className="flex items-center gap-6 font-body text-text-secondary">
                    <li>
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}