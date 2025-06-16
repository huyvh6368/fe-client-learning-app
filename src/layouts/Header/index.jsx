import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
    { name: "Trình độ học", path: '/' },
    { name: "Danh sách bài Chủ đề đã học", path: '/product' }
];

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full bg-white sticky top-0 z-50 shadow-md px-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <i className="fa-brands fa-angellist text-2xl text-pink-600"></i>
                    <span className="text-xl font-bold text-pink-700">App</span>
                </div>

                {/* Tiêu đề trung tâm */}
                <h1 className="text-lg sm:text-xl font-semibold text-gray-800 hidden sm:block">
                    Learning App
                </h1>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center space-x-6">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-pink-700 hover:text-pink-800 font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <i className="fa-solid fa-user text-xl text-pink-700"></i>
                </nav>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <i className="fa-solid fa-bars text-2xl text-pink-700"></i>
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {isOpen && (
                <div className="md:hidden bg-white  border-t border-red-200 shadow-md">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-pink-700  hover:bg-red-100 "
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="px-4 py-2 text-pink-700 border-t">
                        <i className="fa-solid fa-user mr-2"></i> Tài khoản
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
