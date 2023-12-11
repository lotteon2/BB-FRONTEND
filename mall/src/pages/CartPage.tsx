import { useState, useEffect } from "react";
import { Checkbox, Button } from "antd";
import { useQuery } from "react-query";
import { getCartList } from "../apis/cart";
import CartListFallback from "../components/fallbacks/CartListFallback";
import { cartListData } from "../mocks/cart";
import { cartItemDto, productInfoDto } from "../recoil/common/interfaces";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

export default function CartPage() {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [productList, setProductList] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalDelivery, setTotalDelivery] = useState<number>(0);
  const [actualAmount, setActualAmount] = useState<number>(0);
  const [deliveryCost, setDeliveryCost] = useState<number>(0);

  //   const { data, isLoading } = useQuery({
  //     queryKey: ["getCartList"],
  //     queryFn: () => getCartList(),
  //   });

  //   if (!data || isLoading) return <CartListFallback />;

  const onChangeOne = (
    e: CheckboxChangeEvent,
    productId: string,
    price: number
  ) => {
    if (e.target.checked) {
      setCheckedList((prev) => ({ ...prev, productId }));
      setActualAmount((prev) => prev + price);
    }
  };

  const onChangeAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setCheckedList(productList);
      setActualAmount(totalAmount);
    }
  };

  const data = cartListData;

  useEffect(() => {
    if (data) {
      var totalAmount = 0;
      var totalDelivery = 0;
      var productList: string[] = [];
      data.data.forEach((item: cartItemDto) => {
        item.productInfo.forEach((product: productInfoDto) => {
          productList.push(product.productId);
          totalAmount += product.price;
        });
        totalDelivery += item.deliveryCost;
      });

      setProductList(productList);
      setTotalAmount(totalAmount);
      setTotalDelivery(totalDelivery);
    }
  }, []);

  return (
    <div>
      <div className="mx-auto w-28 text-center text-3xl font-bold border-b-4 border-primary7">
        장바구니
      </div>
      <div className="flex flex-row gap-5 flex-wrap justify-center mt-5">
        <div className="w-[45vw] max-w-[900px] min-w-[370px]">
          <div className="flex flex-row gap-2 pb-2">
            <div>
              <Checkbox onChange={onChangeAll}>전체 선택</Checkbox>
            </div>
            <Button size="small">선택 상품 삭제</Button>
          </div>
          <div>
            {data.data.map((item: cartItemDto) => (
              <div
                key={item.storeId}
                className="border-[1px] border-grayscale3 relative"
              >
                <div className="flex justify-between bg-grayscale2 px-2 py-1">
                  <div>{item.storeName}</div>
                  <div>배송 {item.deliveryCost.toLocaleString()}</div>
                </div>
                {item.productInfo.map((product: productInfoDto) => (
                  <div className="p-2 border-b-[1px]">
                    <Checkbox
                      onChange={(e) =>
                        onChangeOne(e, product.productId, product.price)
                      }
                    >
                      <p className="text-[1.2rem] font-bold pt-1">
                        {product.productName}
                      </p>
                    </Checkbox>
                    <div className="h-full flex flex-row justify-between flex-wrap align-center">
                      <div className="flex flex-row gap-2">
                        <div className="w-[150px] h-[150px]">
                          <img
                            className="w-full h-full"
                            src={product.productThumbnailImage}
                            alt="상품 이미지"
                          />
                        </div>
                        <div className="flex flex-col gap-3 w-[20%] max-w-[160px] min-w-[160px]">
                          <div className="flex flex-row gap-3">
                            <span className="border-[1px] px-2 py-1 rounded-lg">
                              수량
                            </span>
                            <span className="mt-1">
                              {product.quantity.toLocaleString()}개
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-[2rem] my-auto max-[1200px]:w-full max-[1200px]:text-right">
                        {product.price.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="w-[20vw] max-w-[400px] min-w-[370px]">
          <p className="border-b-[1px] border-grayscale7 text-[1.5rem]">
            결제 금액
          </p>
          <div className="flex flex-row gap-20 w-full text-[1.2rem] justify-between">
            <div className="flex flex-col gap-2">
              <p>총 주문금액</p>
              <p>배송비</p>
              <p className="font-bold text-[1.5rem]">총 결제금액</p>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <p>{actualAmount.toLocaleString()}원</p>
              <p>{deliveryCost.toLocaleString()}원</p>
              <p className="font-bold text-primary4 text-[1.5rem]">
                {(actualAmount + deliveryCost).toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
