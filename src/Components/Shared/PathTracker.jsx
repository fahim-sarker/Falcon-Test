import React from 'react';
import Container from './Container';
import { Link, useLocation } from 'react-router-dom';
import { RxCaretRight } from 'react-icons/rx';

const PathTracker = () => {
    const location = useLocation();

    return (
        <div className='py-3 bg-[#F1F5F9] xl:px-0 px-4'>
            <Container>
                <div className="flex flex-wrap gap-2 items-center text-sm md:text-base">
                    <Link to="/" className='text-[#0F172A] font-onset text-[14px] font-normal whitespace-nowrap'>
                        Home
                    </Link>
                    <RxCaretRight className='w-5 h-5 flex-shrink-0' />
                    <div className="truncate max-w-xs md:max-w-none text-[#0F172A] font-onset font-normal">
                        {location.pathname === "/"
                            ? ""
                            : location.pathname.replace("/", "").charAt(0).toUpperCase() +
                            location.pathname.slice(2)
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default PathTracker;
