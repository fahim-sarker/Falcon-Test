import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Container from "./Container"
import Logo from "../../assets/images/logo.png"
import Searchsvg from "../../assets/Svg/search.svg"
import Cartsvg from "../../assets/Svg/cartsvg.svg"
import Profilesvg from "../../assets/Svg/profilesvg.svg"
import { useCart } from "../../Context/CartContext"

const Topbar = () => {
  const { cart } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const totalItems = cart.length

  return (
    <section className="bg-[#0F172A] py-4 xl:px-0 px-4">
      <Container>
        <div className="hidden lg:flex gap-x-[150px] items-center">
          <figure>
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </figure>

          <div className="w-[763px] mx-auto relative">
            <input
              type="search"
              placeholder="Search for anything...."
              className="w-full pl-4 pt-[14px] pb-[10px] outline-0 bg-[#fff] rounded-[4px] text-[#475569] font-onset font-normal text-[16px]"
            />
            <button className="bg-[#00B795] flex justify-center items-center cursor-pointer h-12 w-12 rounded-tr-[4px] rounded-br-[4px] absolute top-0 right-0 hover:bg-[#00A085] transition-colors">
              <img src={Searchsvg} alt="Search" />
            </button>
          </div>

          <div className="flex gap-x-5 items-center">
            <figure className="relative">
              <Link to="/cart">
                <img src={Cartsvg} alt="Cart" className="cursor-pointer" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            </figure>
            <figure>
              <img src={Profilesvg} alt="Profile" className="cursor-pointer" />
            </figure>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="flex items-center justify-between">
            <figure>
              <Link to="/">
                <img src={Logo} alt="logo" className="h-8 w-auto" />
              </Link>
            </figure>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 hover:bg-slate-800 rounded transition-colors"
              >
                <img src={Searchsvg || "/placeholder.svg"} alt="Search" className="w-5 h-5" />
              </button>

              <Link to="/cart" className="relative p-2">
                <img src={Cartsvg} alt="Cart" className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                    {totalItems}
                  </span>
                )}
              </Link>
              <figure>
                <img src={Profilesvg} alt="Profile" className="cursor-pointer" />
              </figure>
            </div>
          </div>

          {isSearchOpen && (
            <div className="md:hidden mt-4 relative">
              <input
                type="search"
                placeholder="Search for anything...."
                className="w-full pl-4 pr-12 py-3 outline-0 bg-white rounded-md text-[#475569] font-normal text-sm"
                autoFocus
              />
            </div>
          )}


          <div className="hidden md:block mt-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for anything...."
                className="w-full pl-4 pr-12 py-3 outline-0 bg-white rounded-md text-[#475569] font-normal text-base"
              />
              <button className="bg-[#00B795] flex justify-center items-center cursor-pointer h-10 w-10 rounded-md absolute top-1 right-1 hover:bg-[#00A085] transition-colors">
                <img src={Searchsvg} alt="Search" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </Container>
    </section>
  )
}

export default Topbar
