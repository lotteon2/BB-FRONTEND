import { useMutation, useQuery } from "react-query";
import { getSubscriptionProductDetail } from "../../apis/product";
import { useState, useEffect } from "react";
import { Button, Modal, Rate } from "antd";
import ShareIcon from "@mui/icons-material/Share";
import { HeartFilled } from "@ant-design/icons";
import CouponModal from "./modal/CouponModal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../recoil/atom/common";
import { productWishState } from "../../recoil/atom/member";
import { useNavigate } from "react-router";
import ProductInfoFallback from "../fallbacks/ProductInfoFallback";
import { subscriptionDetailData } from "../../mocks/product";
import {
  storeDeliveryPolicyDto,
  subscriptionOrderDto,
} from "../../recoil/common/interfaces";
import { getStoreDeliveryPolicy } from "../../apis/store";
import { subscriptionOrderState } from "../../recoil/atom/order";

interface param {
  productId: string | undefined;
  setProductDescription: (image: string) => void;
  setProductName: (name: string) => void;
  setStoreId: (id: number) => void;
}

const today = new Date();
export default function SubscriptionInfo(param: param) {
  const navigate = useNavigate();
  const setSubscriptionOrder = useSetRecoilState<subscriptionOrderDto>(
    subscriptionOrderState
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isLogin = useRecoilValue<boolean>(loginState);
  const [productWishList, setProductWishList] =
    useRecoilState<string[]>(productWishState);
  const [deliveryPolicy, setDeliveryPolicy] = useState<storeDeliveryPolicyDto>({
    deliveryPrice: 0,
    freeDeliveryMinPrice: 0,
  });

  const data = subscriptionDetailData;
  // const { data, isLoading } = useQuery({
  //   queryKey: ["getSubscriptionDetail"],
  //   queryFn: () => getSubscriptionProductDetail(param.productId),
  // });

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubscriptionOrder = () => {
    const productCreate = {
      productId: data.productId,
      productName: data.productName,
      quantity: 1,
      price: data.productPrice,
      productThumbnailImage: data.productDetailImage,
    };

    const subscriptionOrder = {
      storeId: data.storeId,
      storeName: data.storeName,
      paymentDay: today.getDay(),
      deliveryDay: today.getDay() + 3,
      products: productCreate,
      totalAmount: data.productPrice,
      deliveryCost:
        data.productPrice >= deliveryPolicy.freeDeliveryMinPrice
          ? 0
          : deliveryPolicy.deliveryPrice,
      couponId: 0,
      couponAmount: 0,
      actualAmount:
        data.productPrice >= deliveryPolicy.freeDeliveryMinPrice
          ? data.productPrice
          : data.productPrice + deliveryPolicy.deliveryPrice,
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

    setSubscriptionOrder(subscriptionOrder);
    navigate("/order/subscription");
  };

  const getPolilcyMutation = useMutation(
    ["getStorePolicy"],
    (storeId: number) => getStoreDeliveryPolicy(storeId),
    {
      onSuccess: (data) => {
        setDeliveryPolicy(data);
      },
      onError: () => {},
    }
  );

  useEffect(() => {
    if (data) {
      param.setProductDescription(data.productDetailImage);
      param.setProductName(data.productName);
      param.setStoreId(data.storeId);
      getPolilcyMutation.mutate(data.storeId);
    }
  }, []);
  // if (!data || isLoading) return <ProductInfoFallback />;

  return (
    <div className="w-full flex flex-row gap-10 flex-wrap justify-center">
      <div className="w-[33vw] h-[33vw] max-w-[440px] max-h-[440px] min-w-[370px] min-h-[370px]">
        <p
          className="cursor-pointer text-grayscale5 font-light text-[0.8rem]"
          onClick={() => navigate("/store/detail/" + data.storeId)}
        >
          {data.storeName}
        </p>
        <img
          src="https://f-mans.com/data/goods/1/2023/10/681_temp_16972473985275view.jpg"
          alt=""
        />
      </div>
      <div className="w-1/2 max-w-[800px] min-w-[370px]">
        <p className="text-[2.3rem] font-bold">{data.productName}</p>
        <p className="text-[1rem] text-grayscale5 font-thin">
          {data.productSummary}
        </p>
        <div className="flex flex-row gap-5 justify-end text-grayscale5 font-light mt-2">
          <div className="flex flex-row gap-2 cursor-pointer">
            <ShareIcon /> <span>공유</span>
          </div>
          <div className="flex flex-row gap-2 cursor-pointer">
            {productWishList.includes(data.productId) ? (
              !data.isLiked ? (
                <div className="mt-[-4px] text-[#FF6464] text-[25px] hover:-translate-y-[2px]">
                  <HeartFilled
                    onClick={() => handleWishButton(data.productId)}
                  />
                </div>
              ) : (
                <div className="mt-[-4px] text-grayscale5 text-[25px] hover:-translate-y-[2px]">
                  <HeartFilled
                    onClick={() => handleWishButton(data.productId)}
                  />
                </div>
              )
            ) : data.isLiked ? (
              <div className="mt-[-4px] text-[#FF6464] text-[25px] hover:-translate-y-[2px]">
                <HeartFilled onClick={() => handleWishButton(data.productId)} />
              </div>
            ) : (
              <div className="mt-[-4px] text-grayscale5 text-[25px] hover:-translate-y-[2px]">
                <HeartFilled onClick={() => handleWishButton(data.productId)} />
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
              <div>{data.salesCount.toLocaleString()}개</div>
              <div className="flex flex-row gap-2">
                <span>{data.reviewCount.toLocaleString()}개</span>
                <Rate
                  allowHalf
                  disabled
                  defaultValue={data.averageRating}
                  style={{ marginTop: 3, color: "#85C031" }}
                />
                <span className="text-[1rem] text-grayscale4 mt-[2px]">
                  ({data.averageRating})
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
            {data.productPrice.toLocaleString()}원
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
        <p className="text-right text-grayscale5 font-light text-[0.8rem]">
          정기배송의 경우 매월 결제일 기준 3일 후에 배송됩니다.
        </p>
        <p className="text-[1.2rem] font-regular flex flex-row gap-2 justify-end">
          <span className="mt-3">총 상품금액</span>
          <b className="text-primary4 text-[2rem] font-bold">
            {data.productPrice.toLocaleString()}원
          </b>
        </p>

        <Button
          type="primary"
          style={{ width: "100%", height: "3rem" }}
          onClick={handleSubscriptionOrder}
        >
          정기구독 신청
        </Button>
        {isModalOpen ? (
          <Modal
            title="쿠폰 다운로드"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[]}
          >
            <CouponModal storeId={data.storeId} />
          </Modal>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
