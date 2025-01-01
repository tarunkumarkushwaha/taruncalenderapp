"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/context/AuthContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(true);

  const containerRef = useRef(null);
  const { searchQuery, setSearchQuery, handleSearch } = useAppContext();

  const router = useRouter();
  const pathname = usePathname();

  const navbarLinks = [
    { href: "/", label: "Calendar" },
    { href: "/events", label: "Events" },
  ];

  // Handle clicks outside the search container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSearchIcon(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle viewport width changes to show/hide menu
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth > 768;
      setMenu(isDesktop);
      setShowSearchIcon(isDesktop);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-slate-700">
      <nav className="px-4 min-h-20">
        {/* Mobile menu toggle */}
        <button
          className="absolute top-5 left-4 md:hidden flex duration-200"
          onClick={() => setMenu((prev) => !prev)}
        >
          <Image
            className={`duration-200 h-8 w-8 ${menu ? "rotate-180" : "rotate-0"}`}
            src="/Assets/icons/menu.png"
            alt="Menu"
            width={24}
            height={24}
          />
        </button>

        <div className="flex md:flex-row flex-col md:justify-between justify-center items-center">
          {/* Logo */}
          <div
            className="m-4 cursor-pointer p-1 text-2xl font-extrabold text-white"
            onClick={() => router.push("/")}
          >
            Calendar App
          </div>

          {/* Navigation links */}
          {menu && (
            <div className="flex md:flex-row flex-col items-center">
              {navbarLinks.map(({ href, label }) => (
                <Link key={href} href={href}>
                  <div
                    className={`text-lg p-4 ${pathname === href ? "text-blue-400" : "text-slate-100"}`}
                    onClick={() => window.innerWidth < 768 && setMenu(false)}
                  >
                    {label}
                  </div>
                </Link>
              ))}

              {/* Search Input */}
              <div className="flex items-center m-2" ref={containerRef}>
                {showSearchIcon ? (
                  <Image
                    src="/lens.svg"
                    alt="Lens Icon"
                    className="cursor-pointer"
                    onClick={() => setShowSearchIcon(false)}
                    width={30}
                    height={30}
                  />
                ) : (
                  <input
                    type="search"
                    className="block outline-none w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      handleSearch(e.target.value);
                    }}
                    placeholder="Search task"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
