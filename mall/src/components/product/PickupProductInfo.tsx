import { useState, useEffect } from "react";
import { Button, Input, Modal, Rate, Calendar, Tag } from "antd";
import ShareIcon from "@mui/icons-material/Share";
import { HeartFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonGroup from "antd/es/button/button-group";
import CouponModal from "./modal/CouponModal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginState, nicknameState } from "../../recoil/atom/common";
import { productWishState } from "../../recoil/atom/member";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "react-query";
import { getProductDetail, requestSaleResume } from "../../apis/product";
import ProductInfoFallback from "../fallbacks/ProductInfoFallback";
import { Dayjs } from "dayjs";
import { pickupOrderDto, saleResumeDto } from "../../recoil/common/interfaces";
import { pickupTime } from "../../recoil/common/data";
import { pickupOrderState } from "../../recoil/atom/order";
import dayjs from "dayjs";
import { getMyPhoneNumber } from "../../apis/member";
import { FailToast } from "../common/toast/FailToast";
import { SuccessToast } from "../common/toast/SuccessToast";
import ProductImage from "./ProductImage";

interface param {
  productId: string | undefined;
  setProductName: (name: string) => void;
}

declare const window: typeof globalThis & {
  Kakao: any;
};

export default function PickupProductInfo(param: param) {
  const navigate = useNavigate();
  const nickname = useRecoilValue<string>(nicknameState);
  const [count, setCount] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isLogin = useRecoilValue<boolean>(loginState);
  const [productWishList, setProductWishList] =
    useRecoilState<string[]>(productWishState);
  const [pickupDate, setPickupDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [date, setDate] = useState<Dayjs>(dayjs());
  const setPickupOrder = useSetRecoilState<pickupOrderDto>(pickupOrderState);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["getPickupProductDetail", isLogin],
    queryFn: () => getProductDetail(param.productId, isLogin),
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

  const handleCalendar = (value: Dayjs) => {
    const selectedDate = value.toDate();
    const today = new Date();
    if (selectedDate < today) {
      alert("당일 및 이전 날짜는 선택할 수 없습니다.");
    } else {
      setDate(value);
      setPickupDate(value.format().split("T")[0]);
    }
  };

  const handleReservation = () => {
    if (pickupDate === "") {
      alert("픽업 날짜를 선택해주세요.");
    } else if (selectedTime === "") {
      alert("픽업 시간을 선택해주세요.");
    } else {
      const productCreate = {
        productId: data.data.productId,
        productName: data.data.productName,
        quantity: count,
        price: data.data.productPrice,
        productThumbnailImage: data.data.productThumbnail,
      };

      const pickupOrder = {
        storeId: data.data.storeId,
        storeName: data.data.storeName,
        pickupDate: pickupDate,
        pickupTime: selectedTime,
        product: productCreate,
        totalAmount: data.data.productPrice * count,
        deliveryCost: 0,
        couponId: null,
        couponAmount: 0,
        actualAmount: data.data.productPrice * count,
        ordererName: "",
        ordererPhoneNumber: "",
        ordererEmail: "",
      };

      setPickupOrder(pickupOrder);
      navigate("/order/pickup");
    }
  };

  const handleSaleResume = () => {
    if (isLogin) {
      const resumeDto = {
        phoneNumber: phoneNumber,
        userName: nickname,
      };

      saleResumeMutation.mutate(resumeDto);
    } else if (window.confirm("회원만 사용가능합니다. 로그인하시겠습니까?")) {
      navigate("/login");
    }
  };

  const getPhoneNumberMutation = useMutation(
    ["getMyPhoneNumber"],
    () => getMyPhoneNumber(),
    {
      onSuccess: (data) => {
        setPhoneNumber(data.data);
      },
      onError: () => {
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

  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: data.data.productName,
        description: "소중한 마음, 향기에 담아 전해보세요",
        imageUrl: data.data.productThumbnail,
        link: {
          webUrl: `https://blooming.blooms.mall.stockey.kr/pickup/product/detail/${data.data.productId}`,
          mobileWebUrl: `https://blooming.blooms.mall.stockey.kr/pickup/product/detail/${data.data.productId}`,
        },
      },
      buttons: [
        {
          title: "확인하러 가기",
          link: {
            webUrl: `https://blooming.blooms.mall.stockey.kr/pickup/product/detail/${data.data.productId}`,
            mobileWebUrl: `https://blooming.blooms.mall.stockey.kr/pickup/product/detail/${data.data.productId}`,
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (data) {
      param.setProductName(data.data.productName);
      getPhoneNumberMutation.mutate();

      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_JS_API_KEY);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div
          className={
            data.data.productSaleStatus === "DISCONTINUED"
              ? "w-full h-full contrast-50 relative"
              : "w-full h-full relative"
          }
        >
          <ProductImage src={data.data.productThumbnail} alt="상품 썸네일" />
        </div>
      </div>
      <div className="w-1/2 max-w-[800px] min-w-[370px]">
        <p className="text-[2.3rem] font-bold mt-3">{data.data.productName}</p>
        <p className="text-[1rem] text-grayscale5 font-thin">
          {data.data.productSummary}
        </p>
        <div className="flex flex-row gap-5 justify-end text-grayscale5 font-light mt-2">
          <div
            className="flex flex-row gap-2 cursor-pointer"
            onClick={shareKakao}
          >
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
            {/* {data.data.productPrice.toLocaleString()}원 */}
          </p>
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
          <div>
            <div className="flex flex-row gap-3 p-2 my-3 justify-center flex-wrap border-[1px]">
              <div className="w-[320px] h-[320px]">
                <Calendar
                  fullscreen={false}
                  onChange={handleCalendar}
                  value={date}
                  disabledDate={(date) =>
                    date.valueOf() < Date.now() ? true : false
                  }
                />
              </div>
              <div className="w-[300px] h-[320px] flex flex-row flex-wrap pt-5 gap-1">
                {pickupTime.map((item: string, index: number) => (
                  <div
                    key={index}
                    className={`w-[70px] h-[40px] text-center py-2 border-[1px] rounded-lg cursor-pointer hover:border-primary4 hover:text-primary4 ${
                      selectedTime === item
                        ? "border-primary4 text-primary4"
                        : ""
                    }`}
                    onClick={() => setSelectedTime(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-row gap-2 mt-3">
              <Button
                type="primary"
                style={{ width: "100%", height: "3rem" }}
                onClick={handleReservation}
              >
                예약하기
              </Button>
            </div>
          </div>
        )}

        {isModalOpen ? (
          <Modal
            title="쿠폰 다운로드"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[]}
          >
            <CouponModal
              storeId={data.data.storeId}
              phoneNumber={phoneNumber}
            />
          </Modal>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
