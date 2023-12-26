import { useState, useEffect } from "react";
import { Checkbox, Button, Input, Progress } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { MinusOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import {
  deleteCartProduct,
  getCartList,
  modifyCartCount,
} from "../../apis/cart";
import CartListFallback from "../../components/fallbacks/CartListFallback";
import {
  cartItemDto,
  cartOrderDto,
  modifyCartCountDto,
  orderInfoByStore,
  productCreate,
  productInfoDto,
} from "../../recoil/common/interfaces";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { FailToast } from "../common/toast/FailToast";
import { SuccessToast } from "../common/toast/SuccessToast";
import { useSetRecoilState } from "recoil";
import { cartOrderState, orderInfoState } from "../../recoil/atom/order";
import { useNavigate } from "react-router";

export default function CartDetail() {
  const navigate = useNavigate();
  const setCartOrder = useSetRecoilState<cartOrderDto>(cartOrderState);
  const setOrderInfo = useSetRecoilState<orderInfoByStore[]>(orderInfoState);
  const [totalStoreList, setTotalStoreList] = useState<number[]>([]);
  const [totalProductList, setTotalProductList] = useState<string[]>([]);
  const [selectedStores, setSelectedStores] = useState<number[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number[]>([]);
  const [deliveryCost, setDeliveryCost] = useState<number[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [isChange, setIsChange] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getCartList", isChange],
    queryFn: () => getCartList(),
  });

  const handleSelectStores = (
    e: CheckboxChangeEvent,
    index: number,
    storeId: number,
    product: productInfoDto[],
    freeMinDelivery: number,
    delivery: number
  ) => {
    let tmpPrice = totalPrice;
    let tmpDelivery = deliveryCost;

    if (e.target.checked) {
      setSelectedStores((prev) => [...prev, storeId]);

      let price = 0;
      product.forEach((item: productInfoDto) => {
        setSelectedProducts((prev) => [...prev, item.productId]);
        price += item.price * item.quantity;
      });

      tmpPrice[index] = price;
      price >= freeMinDelivery
        ? (tmpDelivery[index] = 0)
        : (tmpDelivery[index] = delivery);

      setTotalPrice(tmpPrice);
      setDeliveryCost(tmpDelivery);
    } else {
      const filtered = selectedStores.filter((element) => element !== storeId);
      setSelectedStores(filtered);

      const tmp = [...selectedProducts];
      for (let index = 0; index < tmp.length; index++) {
        product.forEach((item: productInfoDto) => {
          if (tmp[index] === item.productId) {
            tmp.splice(index, 1);
          }
        });
      }

      tmpPrice[index] = 0;
      tmpDelivery[index] = 0;
      setTotalPrice(tmpPrice);
      setSelectedProducts(tmp);
      setDeliveryCost(tmpDelivery);
    }
  };

  const handleSelectProducts = (
    e: CheckboxChangeEvent,
    index: number,
    product: productInfoDto,
    storeId: number,
    productInfo: productInfoDto[],
    freeMinDelivery: number,
    delivery: number
  ) => {
    let tmpPrice = totalPrice;
    let tmpDelivery = deliveryCost;
    let selected = 0;

    if (e.target.checked) {
      setSelectedProducts((prev) => [...prev, product.productId]);
      setSelectedStores((prev) => [...prev, storeId]);

      tmpPrice[index] = tmpPrice[index] + product.price * product.quantity;

      if (tmpPrice[index] >= freeMinDelivery) {
        tmpDelivery[index] = 0;
      } else {
        tmpDelivery[index] = delivery;
      }
      setTotalPrice(tmpPrice);
      setDeliveryCost(tmpDelivery);
    } else {
      const filtered = selectedProducts.filter(
        (element) => element !== product.productId
      );
      setSelectedProducts(filtered);

      for (let i = 0; i < filtered.length; i++) {
        productInfo.forEach((item: productInfoDto) => {
          if (filtered[i] === item.productId) {
            selected++;
          }
        });
      }

      tmpPrice[index] = tmpPrice[index] - product.price * product.quantity;

      if (tmpPrice[index] >= freeMinDelivery || selected === 0) {
        tmpDelivery[index] = 0;
      } else {
        tmpDelivery[index] = delivery;
      }
      setTotalPrice(tmpPrice);
      setDeliveryCost(tmpDelivery);

      if (selected === 0) {
        const filtered = selectedStores.filter(
          (element) => element !== storeId
        );
        setSelectedStores(filtered);
      }
    }
  };

  const handleSelectAll = (e: CheckboxChangeEvent) => {
    let prices: number[] = [];
    let deliveries: number[] = [];

    if (e.target.checked) {
      setSelectedStores(totalStoreList);
      setSelectedProducts(totalProductList);

      data.data.forEach((item: cartItemDto) => {
        var price = 0;
        item.productInfo.forEach((product: productInfoDto) => {
          price += product.price * product.quantity;
        });
        prices.push(price);
        price >= item.freeDeliveryMinCost
          ? deliveries.push(0)
          : deliveries.push(item.deliveryCost);
      });

      setTotalPrice(prices);
      setDeliveryCost(deliveries);
    } else {
      setSelectedStores([]);
      setSelectedProducts([]);

      data.data.forEach(() => {
        prices.push(0);
        deliveries.push(0);
      });
      setTotalPrice(prices);
      setDeliveryCost(deliveries);
    }
  };

  const handleMinusCount = (productId: string, quantity: number) => {
    const cartDto = {
      productId: productId,
      selectedQuantity: quantity,
    };

    modifyMutation.mutate(cartDto);
  };

  const handleAddCount = (productId: string, quantity: number) => {
    const cartDto = {
      productId: productId,
      selectedQuantity: quantity,
    };

    modifyMutation.mutate(cartDto);
  };

  const handlecount = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    if (isNaN(Number(e.target.value))) {
      const cartDto = {
        productId: productId,
        selectedQuantity: 1,
      };

      modifyMutation.mutate(cartDto);
    } else {
      if (Number(e.target.value) === 0) {
        const cartDto = {
          productId: productId,
          selectedQuantity: 1,
        };

        modifyMutation.mutate(cartDto);
      } else {
        const cartDto = {
          productId: productId,
          selectedQuantity: Number(e.target.value),
        };

        modifyMutation.mutate(cartDto);
      }
    }
  };

  const handleDeleteSelected = () => {
    deleteMutation.mutate(selectedProducts);
  };

  const handleDeleteOne = (productId: string) => {
    let deleteList: string[] = [];
    deleteList.push(productId);

    deleteMutation.mutate(deleteList);
  };

  const handleCartOrder = () => {
    if (data) {
      let orderInfoByStore: orderInfoByStore[] = [];

      data.data.forEach((item: cartItemDto) => {
        let productCreate: productCreate[] = [];
        let storeTotal = 0;
        let delivery = 0;

        item.productInfo.forEach((product: productInfoDto) => {
          if (selectedProducts.includes(product.productId)) {
            const productInfo = {
              productId: product.productId,
              productName: product.productName,
              quantity: product.quantity,
              price: product.price,
              productThumbnailImage: product.productThumbnailImage,
            };
            productCreate.push(productInfo);
            storeTotal += product.price * product.quantity;
          }
        });

        delivery =
          storeTotal >= item.freeDeliveryMinCost ? 0 : item.deliveryCost;

        const storeInfo = {
          storeId: item.storeId,
          storeName: item.storeName,
          products: productCreate,
          totalAmount: storeTotal,
          deliveryCost: delivery,
          couponId: 0,
          couponAmount: 0,
          actualAmount: storeTotal + delivery,
        };
        orderInfoByStore.push(storeInfo);
      });

      const cartOrderDto = {
        sumOfActualAmount:
          totalPrice.reduce((a, b) => a + b) +
          deliveryCost.reduce((a, b) => a + b),
        ordererName: "",
        ordererPhoneNumber: "",
        ordererEmail: "",
        recipientName: "",
        deliveryZipcode: "",
        deliveryRoadName: "",
        deliveryAddressDetail: "",
        recipientPhone: "",
        deliveryRequest: "",
      };

      setOrderInfo(orderInfoByStore);
      setCartOrder(cartOrderDto);
      navigate("/order/cart");
    }
  };

  const modifyMutation = useMutation(
    ["modifyCartCount"],
    (cartDto: modifyCartCountDto) => modifyCartCount(cartDto),
    {
      onSuccess: () => {
        setIsChange((cur) => !cur);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const deleteMutation = useMutation(
    ["deleteCartProduct"],
    (deleteDto: string[]) => deleteCartProduct(deleteDto),
    {
      onSuccess: () => {
        SuccessToast("삭제되었습니다.");
        setIsChange((cur) => !cur);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  useEffect(() => {
    if (data) {
      var stores: number[] = [];
      var products: string[] = [];
      var prices: number[] = [];
      var deliveries: number[] = [];
      var quantities: number[] = [];

      data.data.forEach((item: cartItemDto) => {
        stores.push(item.storeId);

        var price = 0;
        item.productInfo.forEach((product: productInfoDto) => {
          products.push(product.productId);
          quantities.push(product.quantity);
          price += product.price * product.quantity;
        });
        prices.push(price);

        price >= item.freeDeliveryMinCost
          ? deliveries.push(0)
          : deliveries.push(item.deliveryCost);
      });

      setTotalStoreList(stores);
      setTotalProductList(products);
      setSelectedProducts(products);
      setSelectedStores(stores);
      setTotalPrice(prices);
      setDeliveryCost(deliveries);
      setQuantities(quantities);
    }
  }, [data]);

  if (!data || isLoading) return <CartListFallback />;

  return (
    <div>
      <div className="flex flex-row gap-5 flex-wrap justify-center mt-5">
        <div className="w-[45vw] max-w-[900px] min-w-[370px]">
          <div className="flex flex-row gap-2 pb-2">
            <div>
              <Checkbox
                checked={totalProductList.length === selectedProducts.length}
                onChange={handleSelectAll}
              >
                전체 선택
              </Checkbox>
            </div>
            <Button size="small" onClick={handleDeleteSelected}>
              선택 상품 삭제
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {data.data.data.map((item: cartItemDto, index: number) => (
              <div
                key={item.storeId}
                className="border-[1px] border-grayscale3 relative rounded-lg"
              >
                <div className="px-2 py-1 border-b-[1px]">
                  <Checkbox
                    checked={selectedStores.includes(item.storeId)}
                    onChange={(e) =>
                      handleSelectStores(
                        e,
                        index,
                        item.storeId,
                        item.productInfo,
                        item.freeDeliveryMinCost,
                        item.deliveryCost
                      )
                    }
                  >
                    <div className="font-bold text-[1.2rem]">
                      {item.storeName}({item.productInfo.length})
                    </div>
                  </Checkbox>
                  <Progress
                    percent={
                      totalPrice[index] >= item.freeDeliveryMinCost
                        ? 100
                        : (totalPrice[index] / item.freeDeliveryMinCost) * 100
                    }
                    showInfo={false}
                    strokeColor="#41744D"
                  />
                  <div className="text-[0.9rem]">
                    {totalPrice[index] >= item.freeDeliveryMinCost ? (
                      <p className="mt-[-10px] pb-2">
                        지금 결제하면{" "}
                        <span className="text-primary5 font-bold">
                          무료 배송
                        </span>
                      </p>
                    ) : totalPrice[index] === 0 ? (
                      <p className="mt-[-10px] pb-2">상품을 선택해주세요.</p>
                    ) : (
                      <p className="mt-[-10px] pb-2">
                        <span className="font-bold">
                          {(
                            item.freeDeliveryMinCost - totalPrice[index]
                          ).toLocaleString()}
                        </span>
                        원만 더 담으면{" "}
                        <span className="text-primary5 font-bold">
                          무료 배송
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                {item.productInfo.map(
                  (product: productInfoDto, productIndex: number) => (
                    <div
                      className={`p-2 ${
                        productIndex === item.productInfo.length - 1
                          ? ""
                          : "border-b-[1px]"
                      }`}
                      key={product.productId}
                    >
                      <div className="flex justify-between">
                        <Checkbox
                          checked={selectedProducts.includes(product.productId)}
                          onChange={(e) =>
                            handleSelectProducts(
                              e,
                              index,
                              product,
                              item.storeId,
                              item.productInfo,
                              item.freeDeliveryMinCost,
                              item.deliveryCost
                            )
                          }
                        >
                          <p className="text-[1.2rem] font-bold pt-1">
                            {product.productName}
                          </p>
                        </Checkbox>
                        <button
                          onClick={() => handleDeleteOne(product.productId)}
                        >
                          <CloseOutlined />
                        </button>
                      </div>
                      <div className="h-full flex flex-row justify-between flex-wrap align-center">
                        <div className="flex flex-row gap-2">
                          <div className="w-[150px] h-[150px]">
                            <img
                              className="w-full h-full rounded-lg"
                              src={product.productThumbnailImage}
                              alt="상품 이미지"
                            />
                          </div>
                          <div className="flex flex-col gap-3 w-[20%] max-w-[160px] min-w-[160px]">
                            <div className="flex flex-row gap-3 my-auto">
                              <ButtonGroup>
                                <Button
                                  icon={<MinusOutlined />}
                                  onClick={() =>
                                    handleMinusCount(
                                      product.productId,
                                      product.quantity
                                    )
                                  }
                                />
                                <Input
                                  style={{
                                    borderRadius: 0,
                                    width: 70,
                                    textAlign: "center",
                                    marginLeft: -1,
                                  }}
                                  value={product.quantity}
                                  onChange={(e) =>
                                    handlecount(e, product.productId)
                                  }
                                />
                                <Button
                                  icon={<PlusOutlined />}
                                  onClick={() =>
                                    handleAddCount(
                                      product.productId,
                                      product.quantity
                                    )
                                  }
                                />
                              </ButtonGroup>
                            </div>
                          </div>
                        </div>
                        <div className="font-bold text-[1.5rem] my-auto max-[1200px]:w-full max-[1200px]:text-right">
                          {(
                            product.price * quantities[productIndex + index * 2]
                          ).toLocaleString()}
                          원
                        </div>
                      </div>
                    </div>
                  )
                )}
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
              <p>
                {totalPrice.length !== 0
                  ? totalPrice.reduce((a, b) => a + b).toLocaleString()
                  : 0}
                원
              </p>
              <p>
                {deliveryCost.length !== 0
                  ? deliveryCost.reduce((a, b) => a + b).toLocaleString()
                  : 0}
                원
              </p>
              <p className="font-bold text-primary4 text-[1.5rem]">
                {totalPrice.length !== 0 && deliveryCost.length !== 0
                  ? (
                      totalPrice.reduce((a, b) => a + b) +
                      deliveryCost.reduce((a, b) => a + b)
                    ).toLocaleString()
                  : 0}
                원
              </p>
            </div>
          </div>
          <p className="border-b-[1px] my-2"></p>
          <Button
            type="primary"
            size="large"
            style={{ width: "100%" }}
            onClick={handleCartOrder}
          >
            주문하기
          </Button>
        </div>
      </div>
    </div>
  );
}
