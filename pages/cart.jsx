import React from "react";
import { useAuth } from "@/context/authProvider";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const Cart = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onSubmit = (data, e) => {
    console.log(data);

    let a = authContext.cart.filter(
      (v) => !data.deleteCheckBox.includes(v.productId)
    );

    authContext.setCart(a);

    console.log(a);

    // e.target.reset();

    // if (data.deleteCheckBox?.length > 0) {
    //   let time = -1500;
    //   data.deleteCheckBox.forEach((v) => {
    //     time += 15000;
    //     sleep(time).then(() => {
    //       console.log(v);
    //       authContext.deleteCart(v);
    //     });
    //   });
    // }
  };

  const authContext = useAuth();
  console.log(authContext.cart);
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-red-100 col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <button type="submit">Delete Selected</button>
              <table className="border">
                <tr>
                  <th className="h-30 py-3 border-4">checkbox</th>
                  <th className="h-30 py-3 border-4"></th>
                  <th className="h-30 py-3 border-4">ชื่อสินค้า</th>
                  <th className="h-30 py-3 border-4">ราคา/หน่วย</th>
                  <th className="h-30 py-3 border-4">จำนวน</th>
                  <th className="h-30 py-3 border-4">ราคารวม</th>
                  <th className="h-30 py-3 border-4"></th>
                </tr>
                {authContext.cart.map((v) => (
                  <>
                    <tr>
                      <td className="border-4">
                        {watch("deleteCheckBox")}
                        <input
                          type="checkbox"
                          value={v.productId}
                          id={v.productId}
                          {...register(`deleteCheckBox`, {})}
                        />
                      </td>
                      <td className="h-30 py-3 border-4">
                        <img
                          src={v.productThumbnail}
                          className="h-24 mx-auto"
                        />
                      </td>
                      <td className=" h-30 py-3 border-4">
                        <h2 className="h-24 text-xs font-medium line-clamp-2">
                          {v.productName}
                        </h2>
                        <h3 className="border-0 rounded bg-pink-500 w-14 h-6 px-2">
                          {v.productType.typeName}
                        </h3>
                      </td>
                      <td className="h-30 py-3  border-4">
                        ฿ {v.productPrice}
                      </td>
                      <td className="border-4 inline-flex">
                        <button
                          className="w-8 mx-1 px-2  bg-gray-700 text-white rounded my-auto h-6"
                          onClick={() => {
                            // authContext.addToCart(v.productId, -1);
                            authContext.removeCart(v.productId);
                          }}
                        >
                          -
                        </button>
                        <h2 className="w-8 mx-1 px-2 bg-white rounded">
                          {v.total}
                        </h2>
                        <button
                          className="w-8 mx-1 px-2  bg-gray-700 text-white rounded my-auto h-6"
                          onClick={() => {
                            // authContext.addToCart(v.productId, 1);
                            authContext.addCart(v.productId);
                          }}
                        >
                          +
                        </button>
                      </td>
                      <td className=" h-30 py-3  border-4">
                        ฿ {v.total * v.productPrice}
                      </td>
                      <td className=" h-30 py-3  border-4">
                        <button
                          onClick={() => {
                            // authContext.addToCart(v.productId, 0);
                            authContext.deleteCart(v.productId);
                          }}
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </table>
            </form>
          </div>
          <div className="bg-blue-100">
            ยอดรวม: {authContext.getTotalPayment()}
            <button
              onClick={() => {
                let body = {
                  userId: "1",
                  productList: [...authContext.cart],
                  totalPrice: authContext.getTotalPayment(),
                  orderCreated: dayjs().format("BBBB-MM-DD HH:mm:ss"),
                };
                console.log(body);
              }}
            >
              Order Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
