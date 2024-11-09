"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false); // State to track scroll position
  const router = useRouter();

  // Handle scroll event to apply the sticky header class
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    setIsCategoryOpen(false);
  };

  // Toggle category dropdown visibility
  const toggleCategoryDropdown = () => {
    setIsCategoryOpen((prev) => !prev);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
      setSearchQuery("");
      setIsSidebarOpen(false);
    }
  };

  // Navigate to selected category
  const handleCategorySelect = (category) => {
    router.push(`/category?name=${category}`);
    setIsCategoryOpen(false);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header
        className={`${
          isSticky ? "fixed top-0 left-0 w-full z-50 bg-gray-800 shadow-lg" : "relative"
        } bg-gray-800 text-white py-4 px-6 transition-all duration-300`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mi Player</h1>

          {/* Search Bar for larger screens */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center bg-gray-700 rounded-lg overflow-hidden"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search movies..."
              className="bg-gray-700 text-white px-4 py-2 outline-none"
            />
            <button type="submit" className="px-4 text-xl text-gray-400 hover:text-white">
              <FaSearch />
            </button>
          </form>

          {/* Navigation for larger screens */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="hover:text-gray-400">
              Home
            </Link>
            <Link href="/About" className="hover:text-gray-400">
              About
            </Link>
            <Link href="/Contact" className="hover:text-gray-400">
              Contact
            </Link>
            <div className="relative">
              <button
                className="flex items-center gap-2 hover:text-gray-400"
                onClick={toggleCategoryDropdown}
              >
                <BiCategory className="text-xl" />
                Categories
              </button>
              {isCategoryOpen && (
                <ul className="absolute left-[-35px] top-10 bg-gray-700 text-white rounded-lg shadow-lg w-40 py-2 z-50">
                  <li
                    className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleCategorySelect("Action")}
                  >
                    Action
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleCategorySelect("Comedy")}
                  >
                    Comedy
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleCategorySelect("Drama")}
                  >
                    Drama
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleCategorySelect("Horror")}
                  >
                    Horror
                  </li>
                </ul>
              )}
            </div>
          </nav>

          {/* Hamburger Icon for mobile view */}
          <button className="md:hidden text-2xl hover:text-gray-400" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Sidebar for mobile view */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white p-6 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Search Bar in Sidebar */}
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search movies..."
              className="bg-gray-700 text-white px-4 py-2 outline-none w-full"
            />
            <button type="submit" className="px-4 text-xl text-gray-400 hover:text-white">
              <FaSearch />
            </button>
          </div>
        </form>

        {/* Sidebar Links */}
        <ul className="space-y-4">
          <li>
            <Link href="/" className="hover:text-gray-400" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/About" className="hover:text-gray-400" onClick={toggleSidebar}>
              About
            </Link>
          </li>
          <li>
            <Link href="/Contact" className="hover:text-gray-400" onClick={toggleSidebar}>
              Contact
            </Link>
          </li>
          <li>
            <button
              className="flex items-center gap-2 hover:text-gray-400"
              onClick={toggleCategoryDropdown}
            >
              <BiCategory className="text-xl" />
              Categories
            </button>
            {isCategoryOpen && (
              <ul className="pl-4 mt-2 z-50">
                <li className="hover:text-gray-400" onClick={() => handleCategorySelect("Action")}>
                  Action
                </li>
                <li className="hover:text-gray-400" onClick={() => handleCategorySelect("Comedy")}>
                  Comedy
                </li>
                <li className="hover:text-gray-400" onClick={() => handleCategorySelect("Drama")}>
                  Drama
                </li>
                <li className="hover:text-gray-400" onClick={() => handleCategorySelect("Horror")}>
                  Horror
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
