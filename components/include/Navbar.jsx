import React, { useState } from "react";
import { useAuth } from "@/context/authProvider";
import Link from "next/link";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
const Navbar = () => {
  const productType = ["Book", "Pencil", "E-Book"];

  const [productTypeButton, setProductTypeButton] = useState(false);

  const authContext = useAuth();
  return (
    <>
      <div className="w-full h-14 bg-blue-900 text-white fixed z-50">
        <div className="container">
          <div className="grid grid-cols-12 gap-2 ">
            <div className="col-span-3">
              <div
                className="pt-4 text-2xl"
                onClick={() => setProductTypeButton(!productTypeButton)}
              >
                {productTypeButton ? <FaTimes /> : <FaBars />}
              </div>
            </div>
            <div className="col-span-6">
              <div className="pt-3">
                <input
                  placeholder="Search..."
                  className="w-full border-1 rounded px-2 h-8"
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="w-full h-14 relative">
                <div className="pt-3 w-10 h-14 absolute bottom-0 right-[100px] text-center">
                  <button>Login</button>
                </div>
                <div className="pt-3 w-16 h-14 absolute bottom-0 right-8 text-center">
                  <button>Register</button>
                </div>
                <div className="w-7 h-14 absolute bottom-0 right-0">
                  <div className="absolute top-3.5 right-0">
                    <div className="absolute top-[-4px] right-[-8px] bg-red-500 rounded-full h-4 w-4 text-xs text-center">
                      3
                    </div>
                    <FaShoppingCart className="text-2xl text-white" />
                  </div>
                </div>
              </div>
              {/* <div className="text-right">
                <Link href="/login">
                  <button>Login</button>
                </Link>
                <Link href="/register">
                  <button>Register</button>
                </Link>
                <Link href="/cart">
                  <button className="">
                    <FaShoppingCart className="text-2xl text-white" />
                  </button>
                </Link>
              </div> */}
            </div>
          </div>
          {productTypeButton ? (
            <div className="w-64 h-auto bg-pink-500">
              {productType.map((v) => (
                <>
                  <div className="px-2 w-full h-8 text-md">{v}</div>
                </>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
