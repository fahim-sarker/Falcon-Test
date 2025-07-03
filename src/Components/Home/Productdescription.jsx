import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from "lucide-react"
import Container from '../Shared/Container'

const Productdescription = () => {
  const [showMoreDescription, setShowMoreDescription] = useState(false)
  const [showMoreSpecification, setShowMoreSpecification] = useState(false)

  return (
    <section className='bg-[#F1F5F9] pt-4 lg:pb-[100px] pb-10 xl:px-0 px-4'>
      <Container>
        <div className="w-full lg:w-[955px] space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>

            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone
                is the display. Nothing surprising, because advanced technologies allow you to practically level the
                display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions.
                And how good that in such realities Apple everything is fine with displays.
              </p>

              {showMoreDescription && (
                <p>
                  Advanced technologies allow you to practically level the display frames and cutouts for the front
                  camera and speaker, leaving no room for bold design solutions. And how good that in such realities
                  Apple everything is fine with displays.
                </p>
              )}
            </div>

            <button
              onClick={() => setShowMoreDescription(!showMoreDescription)}
              className="flex items-center space-x-2 mt-4 text-black transition-colors mx-auto"
            >
              <span className="text-sm font-medium">
                {showMoreDescription ? 'See Less' : 'See More'}
              </span>
              {showMoreDescription ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Specification</h2>

            <h3 className="text-lg font-medium text-gray-800 mb-4">Sharp FP-J30E-B Air Purifier</h3>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>GMP Cosmetic Good Manufacturing Practice</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Cruelty Free</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>No Animal Testing</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Zangla Global Standard</span>
              </li>

              {showMoreSpecification && (
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Comply with Global Standard</span>
                </li>
              )}
            </ul>

            <button
              onClick={() => setShowMoreSpecification(!showMoreSpecification)}
              className="flex items-center space-x-2 mt-6 text-black mx-auto transition-colors"
            >
              <span className="text-sm font-medium">
                {showMoreSpecification ? 'See Less' : 'See More'}
              </span>
              {showMoreSpecification ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Productdescription
