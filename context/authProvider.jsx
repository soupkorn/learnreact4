import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    name: "Best",
  });

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  // const [products, setProducts] = useState([
  //   {
  //     productId: "1",
  //     productName:
  //       "ตะลุยโจทย์ ชัวร์ก่อนสอบ TGAT2 การคิดอย่างมีเหตุผล BY อ. ขลุ่ย & ทีมติวเตอร์",
  //     productPrice: "10",
  //     productThumbnail: "images/book1.jpg",
  //     productType: {
  //       typeId: 1,
  //       typeName: "Book",
  //     },
  //   },
  //   {
  //     productId: "2",
  //     productName:
  //       "TGAT 2 & TGAT 3 การคิดอย่างมีเหตุผล และ สมรรถนะการทำงาน BY อ.ขลุ่ย & ทีมติวเตอร์",
  //     productPrice: 20,
  //     productThumbnail: "images/book2.jpg",
  //     productType: {
  //       typeId: "1",
  //       typeName: "Book",
  //     },
  //   },
  //   {
  //     productId: "3",
  //     productName:
  //       "เตรียมสอบ TGAT การคิดอย่างมีเหตุผล & สมรรถนะการทำงานในอนาคต",
  //     productPrice: 30,
  //     productThumbnail: "images/book3.jpg",
  //     productType: {
  //       typeId: "1",
  //       typeName: "Book",
  //     },
  //   },
  //   {
  //     productId: "4",
  //     productName:
  //       "เตรียมสอบ TPAT3 ความถนัดด้านวิทยาศาสตร์ เทคโนโลยี และวิศวกรรมศาสตร์",
  //     productPrice: 40,
  //     productThumbnail: "images/book4.jpg",
  //     productType: {
  //       typeId: "1",
  //       typeName: "Book",
  //     },
  //   },
  // ]);

  const router = useRouter();

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_ENDPOINT}`
      );
      setProducts(response?.data?.products);
      console.log(response?.data?.products);
    } catch (error) {
      console.error(error);
    }
  }

  const getTotalCartItems = () => {
    let total = 0;
    cart.forEach((v) => {
      total += v.total;
    });
    return total;
  };

  const getTotalPayment = () => {
    let total = 0;
    cart.forEach((v) => {
      total += v.total * v.productPrice;
    });
    return total;
  };

  const addCart = (productId) => {
    const i = cart.findIndex((v) => v.productId == productId);
    if (i >= 0) {
      let c = cart[i];
      c.total += 1;
      setCart([...cart.slice(0, i), c, ...cart.slice(i + 1)]);
    } else {
      const product = products.filter((v) => v.productId == productId)[0];
      setCart([...cart, { ...product, total: 1 }]);
    }
  };

  const removeCart = (productId) => {
    const i = cart.findIndex((v) => v.productId == productId);
    if (i >= 0) {
      let c = cart[i];
      c.total -= 1;
      if (c.total == 0) {
        setCart([...cart.slice(0, i), ...cart.slice(i + 1)]);
      } else {
        setCart([...cart.slice(0, i), c, ...cart.slice(i + 1)]);
      }
    }
  };

  const deleteCart = (productId) => {
    const i = cart.findIndex((v) => v.productId == productId);
    if (i >= 0) {
      setCart([...cart.slice(0, i), ...cart.slice(i + 1)]);
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          currentUser,
          cart,
          products,
          setCart,
          getTotalCartItems,
          getTotalPayment,
          addCart,
          removeCart,
          deleteCart,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
