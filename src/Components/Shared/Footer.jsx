import React from 'react'
import Container from './Container'
import Footerlogo from "../../assets/images/logo2.png"
import Footerlogo1 from "../../assets/images/FALCON.png"
import Headphone from "../../assets/Svg/headphone.svg"
import Badge from "../../assets/Svg/Badge.svg"
import Badge1 from "../../assets/Svg/Badge (1).svg"
import Badge2 from "../../assets/Svg/Badge (2).svg"
import Badge3 from "../../assets/Svg/Badge (3).svg"
import Badge4 from "../../assets/Svg/Badge (4).svg"
import Apple from "../../assets/images/apple.png"
import Google from "../../assets/images/Google.png"

import { FaFacebookF, FaInstagram, FaLocationDot, FaTwitter } from 'react-icons/fa6'
import { MdCall, MdEmail } from 'react-icons/md'

const Footer = () => {
  return (
    <footer className='bg-[#0F172A] pt-[68px] pb-[37px] border-b border-[rgba(255,255,255,0.19)] xl:px-0 px-4'>
      <Container>
        <div className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap gap-y-8 lg:gap-y-0 justify-between">
          <div className="w-full lg:w-[272px]">
            <div className="flex gap-x-2 items-center">
              <img src={Footerlogo} alt="Footerlogo" className='h-12 w-12' />
              <img src={Footerlogo1} alt="Footerlogo1" />
            </div>
            <p className='py-4 font-onset font-normal text-[#F1F5F9] text-[14px]'>
              Experience our new platform & Enjoy exciting deals and offers on your day to day
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-x-2 items-start">
                <div className="h-8 w-8 rounded-full flex justify-center items-center bg-[#FFF] shrink-0 hover:bg-amber-50 duration-300 ease-in-out cursor-pointer">
                  <FaLocationDot />
                </div>
                <h5 className='font-onset font-normal text-[#fff] text-[14px]'>
                  House #64, Road 13, ASA Center, Uttara, Dhaka-1402
                </h5>
              </div>
              <div className="flex gap-x-2 items-center">
                <div className="h-8 w-8 rounded-full flex justify-center items-center bg-[#FFF] shrink-0 hover:bg-amber-50 duration-300 ease-in-out cursor-pointer">
                  <MdCall />
                </div>
                <h5 className='font-onset font-normal text-[#fff] text-[14px]'>01729-1497201</h5>
              </div>
              <div className="flex gap-x-2 items-center">
                <div className="h-8 w-8 rounded-full flex justify-center items-center bg-[#FFF] shrink-0 hover:bg-amber-50 duration-300 ease-in-out cursor-pointer">
                  <MdEmail />
                </div>
                <h5 className='font-onset font-normal text-[#fff] text-[14px]'> falcon@gmail.com</h5>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <h3 className='text-[#94A3B8] font-onset text-[18px] font-medium'>ABOUT</h3>
            <ul className='flex flex-col gap-2 mt-3'>
              <li className='text-white font-onset font-medium text-[16px] cursor-pointer hover:underline'>Contact Us</li>
              <li className='text-white font-onset font-medium text-[16px] cursor-pointer hover:underline'>About Us</li>
              <li className='text-white font-onset font-medium text-[16px] cursor-pointer hover:underline'>Careers</li>
              <li className='text-white font-onset font-medium text-[16px] cursor-pointer hover:underline'>Press</li>
              <li className='text-white font-onset font-medium text-[16px] cursor-pointer hover:underline'>Cancellation & Returns</li>
              <li className='text-white font-onset font-medium text-[16px] cursor-pointer hover:underline'>Terms of Use</li>
            </ul>
          </div>

          <div className="w-full lg:w-auto">
            <h3 className='text-[#94A3B8] font-onset text-[18px] font-medium'>HELP</h3>
            <ul className='flex flex-col gap-2 mt-3'>
              <li className='text-white font-onset font-medium text-[16px] cursor-pointer hover:underline'>Payments</li>
              <li className='text-white font-onset font-medium text-[16px] cursor-pointer hover:underline'>Shipping</li>
              <li className='text-white font-onset font-medium text-[16px] cursor-pointer hover:underline'>My Orders</li>
              <li className='text-white font-onset font-medium text-[16px] cursor-pointer hover:underline'>FAQs</li>
              <li className='text-white font-onset font-medium text-[16px] cursor-pointer hover:underline'>Terms of Use</li>
              <li className='text-white font-onset font-medium text-[16px] cursor-pointer hover:underline'>Security</li>
              <li className='text-white font-onset font-medium text-[16px] cursor-pointer hover:underline'>Privacy</li>
            </ul>
          </div>

          <div className="w-full lg:w-auto">
            <h3 className='text-[#94A3B8] font-onset text-[18px] font-medium'>Need Support?</h3>
            <div className="flex gap-x-2 py-2 px-4 rounded-[4px] border border-[#F1F5F9] mt-3 w-max">
              <img src={Headphone} alt="Headphone" />
              <h4 className='text-[#fff] font-onset text-[16px] font-medium'>10724-7814XX</h4>
            </div>
            <h3 className='text-[#94A3B8] font-onset text-[18px] font-medium mt-8'>DOWNLOAD APP</h3>
            <figure className='py-3'>
              <img src={Google} alt="Google" className="lg:h-[60px]" />
            </figure>
            <figure>
              <img src={Apple} alt="Apple" className="lg:h-[60px]" />
            </figure>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center mt-8 gap-8 lg:gap-0">
          <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center">
            <p className='font-onset font-medium text-[#E2E8F0] text-[16px]'>Follow us on</p>
            <div className="h-8 w-8 rounded-full flex justify-center items-center bg-[#FFF] hover:bg-amber-50 duration-300 ease-in-out cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="h-8 w-8 rounded-full flex justify-center items-center bg-[#FFF] hover:bg-amber-50 duration-300 ease-in-out cursor-pointer">
              <FaInstagram />
            </div>
            <div className="h-8 w-8 rounded-full flex justify-center items-center bg-[#FFF] hover:bg-amber-50 duration-300 ease-in-out cursor-pointer">
              <FaTwitter />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-x-[37px]">
            <p className='font-onset font-medium text-[#94A3B8] text-[18px]'>PAYMENTS ACCEPTED</p>
            <div className="flex flex-wrap gap-2 items-center">
              <img src={Badge} alt="Badge" />
              <img src={Badge1} alt="Badge1" />
              <img src={Badge2} alt="Badge2" />
              <img src={Badge3} alt="Badge3" />
              <img src={Badge4} alt="Badge4" />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
