import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const links = [
    { name: "Level đã tham gia", path: "/my_level" },
    { name: "Chủ đề đã tham gia", path: "/my_topic" },
];

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const handlerShowProfile = () => {
        navigate("/my_profile")
    };

    return (
        <header className="w-full bg-white sticky top-0 z-50 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <i className="fa-brands fa-angellist text-2xl text-pink-600"></i>
                    <span className="text-xl font-bold text-pink-700">App</span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center space-x-6">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-pink-700 hover:text-pink-800 font-medium transition-colors duration-200"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button
                        onClick={handlerShowProfile}
                        className="flex items-center gap-2 px-3 py-1 bg-pink-100 hover:bg-pink-200 rounded-lg transition-all"
                    >
                        <i className="fa-solid fa-user text-lg text-pink-700"></i>
                        <span className="text-pink-700 font-medium text-sm">Profile</span>
                    </button>
                </nav>

                {/* Mobile menu button */}
                <div className="md:hidden mr-5">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <i className="fa-solid fa-bars text-2xl text-pink-700"></i>
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 text-pink-700 hover:bg-pink-50 border-b border-gray-100 font-medium transition"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button
                        onClick={handlerShowProfile}
                        className="flex items-center gap-3 px-4 py-3 w-full hover:bg-pink-50 transition border-t border-gray-100"
                    >
                        <i className="fa-solid fa-user text-xl text-pink-600"></i>
                        <span className="text-pink-700 font-semibold text-base">Profile</span>
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
