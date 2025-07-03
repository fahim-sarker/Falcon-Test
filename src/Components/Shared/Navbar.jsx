import React, { useState } from 'react';
import Container from './Container';
import Category from "../../assets/Svg/categories.svg";
import Svg1 from "../../assets/Svg/svg1.svg";
import Svg2 from "../../assets/Svg/svg2.svg";
import Svg3 from "../../assets/Svg/svg3.svg";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const categories = [
        { id: 1, name: "Electronics", slug: "electronics-device" },
        { id: 2, name: "Home Appliances", slug: "tv-home-appliances" },
        { id: 3, name: "Mother & Baby", slug: "mother-baby" },
        { id: 4, name: "Automotive", slug: "automotive" },
        { id: 5, name: "Sports Gear", slug: "sports-out-doors" },
    ];

    return (
        <nav className="py-2 relative xl:px-0 px-4">
            <Container>

                <div className="hidden xl:flex justify-between items-center">
                    <div className="flex gap-x-6 items-center">
                        <div className="flex gap-x-2 items-center border-r border-[#E2E8F0]">
                            <img src={Category} alt="Category" />
                            <h3 className="text-[#0F172A] text-[14px] font-medium font-onset pr-[43px]">
                                Categories
                            </h3>
                        </div>
                        <ul className="flex gap-x-8 items-center">
                            {categories.map((category) => (
                                <li key={category.id} className="font-onset text-[#0F172A] font-normal text-[14px]">
                                    <Link to={`?category=${category.slug}`}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex gap-x-6 items-center">
                        <div className="flex gap-x-2 items-center">
                            <img src={Svg2} alt="Svg2" />
                            <h4 className="text-[#475569] font-medium font-onset text-[12px]">TRACK ORDER</h4>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <img src={Svg1} alt="Svg1" />
                            <h4 className="text-[#475569] font-medium font-onset text-[12px]">HELP CENTER</h4>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <img src={Svg3} alt="Svg3" />
                            <h4 className="text-[#475569] font-medium font-onset text-[12px]">SELL WITH US</h4>
                        </div>
                    </div>
                </div>

                <div className="flex xl:hidden justify-between items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex gap-x-2 items-center"
                    >
                        <img src={Category} alt="Category" />
                        <h3 className="text-[#0F172A] text-[14px] font-medium font-onset">
                            Categories
                        </h3>
                    </button>

                </div>

                <div
                    className={`
            fixed top-0 left-0 h-full w-64 bg-gray-300 shadow-lg z-50 transform
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            transition-transform duration-300 ease-in-out
            xl:hidden
          `}
                >
                    <ul className="flex flex-col p-6">
                        {categories.map((category) => (
                            <li key={category.id} className="mb-4">
                                <Link
                                    to={`?category=${category.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className="font-onset text-[#0F172A] font-normal text-[16px]"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/10 bg-opacity-40 z-40 xl:hidden"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}

            </Container>
        </nav>
    );
};

export default Navbar;
