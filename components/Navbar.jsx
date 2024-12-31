"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/context/AuthContext";

const Navbar = () => {
    const [menu, setmenu] = useState(false);
    const [width, setwidth] = useState(false);
    const [showSearchIcon, setshowSearchIcon] = useState(true);

    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setshowSearchIcon(true);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const {
        searchQuery,
        setSearchQuery,
        handleSearch,
    } = useAppContext();

    const router = useRouter();
    const navbarLinks = [
        { href: "/", label: "calender" },
        { href: "/events", label: "events" },
    ]

    useEffect(() => {
        const handleResize = () => {
            setwidth(window.innerWidth);
            setmenu(window.innerWidth > 768);
            setshowSearchIcon(window.innerWidth > 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const pathname = usePathname();

    return (
        <>
            <header className="sticky top-0 z-20 bg-slate-700">
                <nav className=" px-4 md:px-auto min-h-20">
                    <button
                        className="absolute top-5 left-4 md:hidden flex duration-200"
                        onClick={() => setmenu(!menu)}
                    >
                        <Image
                            className={`duration-200 h-8 w-8 ${menu ? "rotate-180" : "rotate-0"}`}
                            src="/Assets/icons/menu.png"
                            alt="Menu"
                            width={180}
                            height={38}
                            // priority
                        />
                    </button>
                    <div className="flex md:flex-row flex-col md:justify-between justify-center items-center">
                        <div
                            className="m-4 cursor-pointer p-1 md:ml-0 ml-4 md:pl-0 pl-10 text-2xl flex justify-center items-center font-extrabold"
                            onClick={() => {
                                router.push("/");
                            }}
                        >
                            <p>calender app</p>
                            
                        </div>
                        {menu && <div className="flex md:flex-row flex-col md:justify-between items-center justify-center">
                            <div className={`flex md:flex-row flex-col items-center`}>
                                {[...navbarLinks].map(({ href, label }) => (
                                    <Link key={href} href={href}>
                                        <div
                                            className={`text-lg p-4 ${pathname === href ? "text-blue-400" : "text-slate-100"
                                                }`}
                                            onClick={() => width < 768 && setmenu(false)}
                                        >
                                            {label}
                                        </div>
                                    </Link>
                                ))}


                                <div className="flex items-center m-2" ref={containerRef}>
                                    {showSearchIcon ? <Image
                                        src="/lens.svg"
                                        alt="Lens Icon"
                                        className="cursor-pointer"
                                        onClick={() => setshowSearchIcon(false)}
                                        width={30}
                                        height={30}
                                    /> :
                                        <input type="search"
                                            className="block md:mb-0 mb-4 outline-none w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value)
                                                handleSearch(e.target.value)
                                            }}
                                            placeholder="Search task" />
                                    }
                                </div>
                            </div>



                        </div>}
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;

