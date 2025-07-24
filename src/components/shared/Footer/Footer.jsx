"use client";
import Contain from "@/components/common/Contain";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-700 text-gray-300 py-10 px-4 sm:px-6 lg:px-8  mt-10 font-manrope">
      <Contain>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Awards & Recognition
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Investor
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Share Department
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Information
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Term & Condition
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Coverage areas
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Payment Option
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  MyGroceryMart
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Grocery Mart Stores
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact Info
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Report Issue
                </Link>
              </li>
            </ul>
          </div>

          {/* Info Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Info</h3>
            <p className="mb-2">Grocery Mart Company Bangladesh Ltd.</p>
            <p className="mb-4">Gazipur, Bangladesh</p>
            <p className="mb-2">
              <Link href="tel:+00801853782533">
                Call us at: +008 01853782533
              </Link>{" "}
              (9am- 9pm)
            </p>
            <p className="mb-4">
              {" "}
              <Link href="mailto:bd.customercare@grocerymart.com"></Link> Email:
              bd.customercare@grocerymart.com
            </p>
            <h4 className="text-md font-semibold text-white mb-2">Pay With</h4>
            <div className="flex flex-wrap gap-2">
              {/* Placeholder for payment icons - replace with actual images or SVGs */}
              <img src="https://i.ibb.co/SYyq8Nj/image.png" alt="BKish" />
              <img src="https://i.ibb.co/8gLqtYjy/image-1.png" alt="Nagod" />
              <img src="https://i.ibb.co/0jC8BymJ/image-2.png" alt="Visa" />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-600 ">
          <div className="flex items-center flex-col lg:flex-row justify-between">
            {/* Newsletter Signup */}
            <div className="mb-4 sm:mb-0">
              <p className="text-sm">Sign up for our Newsletter</p>
            </div>

            <div className="flex space-x-4 mb-4 sm:mb-0">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaFacebook className="text-xl" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaYoutube className="text-xl" />
              </Link>
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaInstagram className="text-xl" />
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400 text-center mt-3 pb-5 lg:pb-0">
            &copy; {currentYear} Grocery Mart Company Bangladesh ltd. All rights
            reserved.
          </div>
        </div>
      </Contain>
    </footer>
  );
};

export default Footer;
