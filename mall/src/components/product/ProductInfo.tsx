import { useState, useEffect } from "react";
import { Button, Input, Modal, Rate, Tag } from "antd";
import ShareIcon from "@mui/icons-material/Share";
import {
  BellFilled,
  HeartFilled,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ButtonGroup from "antd/es/button/button-group";
import CouponModal from "./modal/CouponModal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginState, nicknameState } from "../../recoil/atom/common";
import { productWishState } from "../../recoil/atom/member";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "react-query";
import { getProductDetail, requestSaleResume } from "../../apis/product";
import ProductInfoFallback from "../fallbacks/ProductInfoFallback";
import { getStoreDeliveryPolicy } from "../../apis/store";
import {
  modifyCartCountDto,
  orderDto,
  saleResumeDto,
  storeDeliveryPolicyDto,
} from "../../recoil/common/interfaces";
import { orderState } from "../../recoil/atom/order";
import { addToCart } from "../../apis/cart";
import { FailToast } from "../common/toast/FailToast";
import { SuccessToast } from "../common/toast/SuccessToast";
import Swal from "sweetalert2";
import { getMyPhoneNumber } from "../../apis/member";

interface param {
  productId: string;
  setProductDescription: (image: string) => void;
  setProductName: (name: string) => void;
  setStoreId: (id: number) => void;
}

export default function ProductInfo(param: param) {
  const navigate = useNavigate();
  const nickname = useRecoilValue<string>(nicknameState);
  const setOrder = useSetRecoilState<orderDto>(orderState);
  const [count, setCount] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isLogin = useRecoilValue<boolean>(loginState);
  const [productWishList, setProductWishList] =
    useRecoilState<string[]>(productWishState);
  const [deliveryPolicy, setDeliveryPolicy] = useState<storeDeliveryPolicyDto>({
    deliveryPrice: 0,
    freeDeliveryMinPrice: 0,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getProductDetail"],
    queryFn: () => getProductDetail(param.productId),
  });

  const handleWishButton = (productId: string) => {
    if (isLogin) {
      if (productWishList.includes(productId)) {
        setProductWishList(
          productWishList.filter((prev) => prev !== productId)
        );
      } else {
        setProductWishList((prev) => [...prev, productId]);
      }
    } else if (window.confirm("회원만 사용가능합니다. 로그인하시겠습니까?")) {
      navigate("/login");
    }
  };

  const handleMinusCount = () => {
    if (count <= 1) {
      setCount(1);
    } else setCount((cur) => cur - 1);
  };
  const handleAddCount = () => {
    setCount((cur) => cur + 1);
  };

  const handlecount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      setCount(1);
    } else {
      if (Number(e.target.value) === 0) {
        setCount(1);
      } else {
        setCount(Number(e.target.value));
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOrder = () => {
    const productCreate = {
      productId: data.data.productId,
      productName: data.data.productName,
      quantity: count,
      price: data.data.productPrice,
      productThumbnailImage: data.data.productDetailImage,
    };

    const order = {
      storeId: data.data.storeId,
      storeName: data.data.storeName,
      products: productCreate,
      totalAmount: data.data.productPrice * count,
      deliveryCost:
        data.data.productPrice * count >= deliveryPolicy.freeDeliveryMinPrice
          ? 0
          : deliveryPolicy.deliveryPrice,
      couponId: 0,
      couponAmount: 0,
      actualAmount:
        data.data.productPrice * count >= deliveryPolicy.freeDeliveryMinPrice
          ? data.data.productPrice * count
          : data.data.productPrice * count + deliveryPolicy.deliveryPrice,
      ordererName: "",
      ordererPhoneNumber: "",
      ordererEmail: "",
      recipientName: "",
      deliveryZipcode: "",
      deliveryRoadName: "",
      deliveryAddressDetail: "",
      recipientPhone: "",
      deliveryRequest: "",
      deliveryAddressId: 0,
    };

    setOrder(order);
    navigate("/order/general");
  };

  const handleAddToCart = () => {
    const cartDto = {
      productId: data.data.productId,
      selectedQuantity: count,
    };

    cartMutation.mutate(cartDto);
  };

  const handleSaleResume = () => {
    if (isLogin) {
      getPhoneNumberMutation.mutate();
    } else if (window.confirm("회원만 사용가능합니다. 로그인하시겠습니까?")) {
      navigate("/login");
    }
  };

  const getPhoneNumberMutation = useMutation(
    ["getMyPhoneNumber"],
    () => getMyPhoneNumber(),
    {
      onSuccess: (data) => {
        const resumeDto = {
          phoneNumber: data.phoneNumber,
          userName: nickname,
        };

        saleResumeMutation.mutate(resumeDto);
      },
      onError: () => {
        const resumeDto = {
          phoneNumber: "01011111111",
          userName: nickname,
        };

        saleResumeMutation.mutate(resumeDto);
        FailToast(null);
      },
    }
  );

  const saleResumeMutation = useMutation(
    ["saleResume"],
    (resumeDto: saleResumeDto) =>
      requestSaleResume(data.data.productId, resumeDto),
    {
      onSuccess: () => {
        SuccessToast("재판매 알림이 신청되었습니다.");
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const getPolilcyMutation = useMutation(
    ["getStorePolicy"],
    (storeId: number) => getStoreDeliveryPolicy(storeId),
    {
      onSuccess: (data) => {
        setDeliveryPolicy(data.data);
      },
      onError: () => {},
    }
  );

  const cartMutation = useMutation(
    ["addToCart"],
    (cartDto: modifyCartCountDto) => addToCart(cartDto),
    {
      onSuccess: () => {
        SuccessToast("장바구니에 상품이 담겼습니다.");
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  useEffect(() => {
    if (data) {
      param.setProductDescription(data.data.productDetailImage);
      param.setProductName(data.data.productName);
      param.setStoreId(data.data.storeId);
      getPolilcyMutation.mutate(data.data.storeId);
    }
  }, [data]);

  if (!data || isLoading) return <ProductInfoFallback />;

  return (
    <div className="w-full flex flex-row gap-10 flex-wrap justify-center">
      <div className="w-[33vw] h-[33vw] max-w-[440px] max-h-[440px] min-w-[370px] min-h-[370px] relative">
        <div className="absolute z-20 top-7 left-2">
          {data.data.productSaleStatus === "DISCONTINUED" ? (
            <Tag bordered={false} color="red">
              판매중지
            </Tag>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-row gap-3 text-grayscale5 font-light text-[0.8rem]">
          <p
            className="cursor-pointer"
            onClick={() => navigate("/store/detail/" + data.data.storeId)}
          >
            {data.data.storeName}
          </p>
          <p>{">"}</p>
          <p
            className="cursor-pointer"
            onClick={() =>
              navigate("/product/" + data.data.category.categoryId)
            }
          >
            {data.data.category.categoryName}
          </p>
          <p>{">"}</p>
          <div className="flex flex-row gap-2">
            {data.data.tag.map((item: { key: number; tagName: string }) => (
              <p
                key={item.key}
                className="cursor-pointer"
                onClick={() => navigate("/product/tag/" + item.key)}
              >
                {item.tagName}
              </p>
            ))}
          </div>
        </div>
        <img
          className={
            data.data.productSaleStatus === "DISCONTINUED"
              ? "w-full h-full contrast-50"
              : "w-full h-full"
          }
          src={data.data.productThumbnail}
          alt="상품 썸네일"
        />
      </div>
      <div className="w-1/2 max-w-[800px] min-w-[370px]">
        <div className="flex flex-row gap-2">
          <p className="text-[2.3rem] font-bold">{data.data.productName}</p>
        </div>
        <p className="text-[1rem] text-grayscale5 font-thin">
          {data.data.productDescription}
        </p>
        <div className="flex flex-row gap-5 justify-end text-grayscale5 font-light mt-2">
          <div className="flex flex-row gap-2 cursor-pointer">
            <ShareIcon /> <span>공유</span>
          </div>
          <div className="flex flex-row gap-2 cursor-pointer">
            {productWishList.includes(data.data.productId) ? (
              !data.data.isLiked ? (
                <div className="mt-[-4px] text-[#FF6464] text-[25px] hover:-translate-y-[2px]">
                  <HeartFilled
                    onClick={() => handleWishButton(data.data.productId)}
                  />
                </div>
              ) : (
                <div className="mt-[-4px] text-grayscale5 text-[25px] hover:-translate-y-[2px]">
                  <HeartFilled
                    onClick={() => handleWishButton(data.data.productId)}
                  />
                </div>
              )
            ) : data.data.isLiked ? (
              <div className="mt-[-4px] text-[#FF6464] text-[25px] hover:-translate-y-[2px]">
                <HeartFilled
                  onClick={() => handleWishButton(data.data.productId)}
                />
              </div>
            ) : (
              <div className="mt-[-4px] text-grayscale5 text-[25px] hover:-translate-y-[2px]">
                <HeartFilled
                  onClick={() => handleWishButton(data.data.productId)}
                />
              </div>
            )}
            <span>찜</span>
          </div>
        </div>
        <div className="border-t-[1px] border-b-[1px] py-5 my-2">
          <div className="flex flex-row gap-5 text-[1rem]">
            <div className="flex flex-col gap-5 font-light">
              <div>판매 개수</div>
              <div>상품 후기</div>
              <div className="pt-[2px]">쿠폰 혜택</div>
            </div>
            <div className="flex flex-col gap-5 text-[1rem]">
              <div>{data.data.salesCount.toLocaleString()}개</div>
              <div className="flex flex-row gap-2">
                <span>{data.data.reviewCount.toLocaleString()}개</span>
                <Rate
                  allowHalf
                  disabled
                  defaultValue={data.data.averageRating}
                  style={{ marginTop: 3, color: "#85C031" }}
                />
                <span className="text-[1rem] text-grayscale4 mt-[2px]">
                  ({data.data.averageRating})
                </span>
              </div>
              {isLogin ? (
                <Button type="primary" onClick={showModal}>
                  쿠폰 다운로드
                </Button>
              ) : (
                <div className="text-grayscale4">회원 전용 혜택입니다.</div>
              )}
            </div>
          </div>
          <p className="text-[2.3rem] font-bold text-primary4 mt-2">
            {data.data.productPrice.toLocaleString()}원
          </p>
        </div>
        <div className="text-[0.9rem] border-b-[1px] pb-2 flex flex-row gap-2">
          <span>택배 배송</span>
          {deliveryPolicy.deliveryPrice === 0 ? (
            <span className="font-bold">무료배송</span>
          ) : (
            <div className="flex flex-row gap-2">
              <span className="font-bold">
                {deliveryPolicy.deliveryPrice.toLocaleString()}원
              </span>
              <span className="font-light">
                ({deliveryPolicy.freeDeliveryMinPrice.toLocaleString()}원 이상
                결제 시 무료)
              </span>
            </div>
          )}
        </div>
        <div className="w-full h-14 border-[1px] border-grayscale3 relative mt-2">
          <div className="absolute left-3 top-3">
            <ButtonGroup>
              <Button icon={<MinusOutlined />} onClick={handleMinusCount} />
              <Input
                style={{
                  borderRadius: 0,
                  width: 100,
                  textAlign: "center",
                  marginLeft: -1,
                }}
                defaultValue={count}
                value={count}
                onChange={(e) => handlecount(e)}
              />
              <Button icon={<PlusOutlined />} onClick={handleAddCount} />
            </ButtonGroup>
          </div>
          <div className="absolute right-3 top-3 text-[1.5rem]">
            {(data.data.productPrice * count).toLocaleString()}원
          </div>
        </div>
        <p className="text-[1.2rem] font-regular flex flex-row gap-2 justify-end">
          <span className="mt-3">총 상품금액</span>
          <b className="text-primary4 text-[2rem] font-bold">
            {(data.data.productPrice * count).toLocaleString()}원
          </b>
        </p>
        {data.data.productSaleStatus === "DISCONTINUED" ? (
          <div className="flex flex-row gap-2 mt-3">
            <Button
              type="primary"
              style={{ width: "100%", height: "3rem" }}
              onClick={handleSaleResume}
            >
              재판매 알림 요청
            </Button>
          </div>
        ) : (
          <div className="flex flex-row gap-2 mt-3">
            <Button
              style={{ width: "50%", height: "3rem", backgroundColor: "#fff" }}
              onClick={handleAddToCart}
              disabled={
                data.data.productSaleStatus === "DISCONTINUED" ? true : false
              }
            >
              장바구니
            </Button>
            <Button
              type="primary"
              style={{ width: "50%", height: "3rem" }}
              onClick={handleOrder}
              disabled={
                data.data.productSaleStatus === "DISCONTINUED" ? true : false
              }
            >
              구매하기
            </Button>
          </div>
        )}

        {isModalOpen ? (
          <Modal
            title="쿠폰 다운로드"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[]}
          >
            <CouponModal storeId={data.data.storeId} />
          </Modal>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
