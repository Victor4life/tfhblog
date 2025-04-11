import { Link } from "react-router-dom";
import { useState } from "react";

const categories = [
  { name: "Finance", slug: "finance" },
  { name: "Tech", slug: "tech" },
  { name: "Health", slug: "health" },
  { name: "Travel", slug: "travel" },
  { name: "Entertainment", slug: "entertainment" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 md:px-14">
        {/* Top bar */}
        <div className="flex justify-between items-center py-2 border-b">
          {/* Search bar */}
          <i className="fa-solid fa-magnifying-glass"></i>
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="logo-container relative w-[200px] md:w-[300px] lg:w-[400px]">
              <img
                src="eluminary.png"
                alt="E-Luminary Logo"
                className="w-full h-auto object-contain max-h-[100px]"
              />
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600"
            aria-label="Toggle menu"
          >
            <i
              className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}
            ></i>
          </button>

          {/* Desktop Search and Social Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="text-gray-600 hover:text-gray-900 transition-colors p-2"
              aria-label="Search"
            ></button>

            {/* Social media icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-800 transition-colors"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden py-4 border-b`}
        >
          {/* Mobile Search */}
          <div className="flex justify-center mb-4">
            <button
              className="text-gray-600 hover:text-gray-900 transition-colors p-2"
              aria-label="Search"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          {/* Mobile Categories */}
          <div className="flex flex-col space-y-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="text-gray-600 hover:text-gray-900 transition-colors text-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Mobile Social Icons */}
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-400"
              aria-label="Twitter"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-pink-600"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-800"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Desktop Categories */}
        <div className="hidden md:flex justify-center items-center h-16">
          <div className="flex space-x-8">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
