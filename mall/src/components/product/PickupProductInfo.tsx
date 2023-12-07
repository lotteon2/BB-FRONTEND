import { useState, useEffect } from "react";
import { Button, Input, Modal, Rate, Calendar } from "antd";
import ShareIcon from "@mui/icons-material/Share";
import { HeartFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonGroup from "antd/es/button/button-group";
import CouponModal from "./modal/CouponModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../recoil/atom/common";
import { productWishState } from "../../recoil/atom/member";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "react-query";
import { getProductDetail } from "../../apis/product";
import ProductInfoFallback from "../fallbacks/ProductInfoFallback";
import { productDetailData } from "../../mocks/product";
import type { Dayjs } from "dayjs";
import type { CalendarProps } from "antd";
import type { DatePickerProps } from "antd";
import { getStoreDeliveryPolicy } from "../../apis/store";
import { storeDeliveryPolicyDto } from "../../recoil/common/interfaces";

interface param {
  productId: string | undefined;
  setProductDescription: (image: string) => void;
  setProductName: (name: string) => void;
  setStoreId: (id: number) => void;
}

export default function PickupProductInfo(param: param) {
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isLogin = useRecoilValue<boolean>(loginState);
  const [productWishList, setProductWishList] =
    useRecoilState<string[]>(productWishState);
  const [deliveryPolicy, setDeliveryPolicy] = useState<storeDeliveryPolicyDto>({
    deliveryPrice: 0,
    freeDeliveryMinPrice: 0,
  });

  const data = productDetailData;
  // const { data, isLoading } = useQuery({
  //   queryKey: ["getProductDetail"],
  //   queryFn: () => getProductDetail(param.productId),
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

  const handleCalendar = (value: Dayjs) => {
    console.log(value.format());
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
      param.setProductDescription(data.data.productDetailImage);
      param.setProductName(data.data.productName);
      param.setStoreId(data.data.storeId);
      getPolilcyMutation.mutate(data.data.storeId);
    }
  }, []);

  // if (!data || isLoading) return <ProductInfoFallback />;

  return (
    <div className="w-full flex flex-row gap-10 flex-wrap justify-center">
      <div className="w-[33vw] h-[33vw] max-w-[440px] max-h-[440px] min-w-[370px] min-h-[370px]">
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
          className="w-full h-full"
          src="https://f-mans.com/data/goods/1/2023/10/681_temp_16972473985275view.jpg"
          alt=""
        />
      </div>
      <div className="w-1/2 max-w-[800px] min-w-[370px]">
        <p className="text-[2.3rem] font-bold">{data.data.productName}</p>
        <p className="text-[1rem] text-grayscale5 font-thin">
          {data.data.productSummary}
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
        <div className="flex flex-row gap-3 p-2 my-3 justify-center flex-wrap border-[1px]">
          <div className="w-[320px] h-[320px]">
            <Calendar fullscreen={false} onChange={handleCalendar} />
          </div>
          <div className="w-[300px] h-[320px] flex flex-row flex-wrap pt-5 gap-1">
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              11:00
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              11:30
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              12:00
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              12:30
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              13:00
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              13:30
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              14:00
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              14:30
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              15:00
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              15:30
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              16:00
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              16:30
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              17:00
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              17:30
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              18:00
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              18:30
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              19:00
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              19:30
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              20:00
            </div>
            <div className="w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg">
              20:30
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 mt-3">
          <Button type="primary" style={{ width: "100%", height: "3rem" }}>
            예약하기
          </Button>
        </div>
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
