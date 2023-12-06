import { useQuery } from "react-query";
import { getSubscriptionProductDetail } from "../../apis/product";
import { useState } from "react";
import { Button, Modal, Rate } from "antd";
import ShareIcon from "@mui/icons-material/Share";
import { HeartFilled } from "@ant-design/icons";
import CouponModal from "./modal/CouponModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../recoil/atom/common";
import { productWishState } from "../../recoil/atom/member";
import { useNavigate } from "react-router";
import ProductInfoFallback from "../fallbacks/ProductInfoFallback";

interface param {
  storeId: number | undefined;
}

export default function SubscriptionInfo(param: param) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isLogin = useRecoilValue<boolean>(loginState);
  const [productWishList, setProductWishList] =
    useRecoilState<string[]>(productWishState);

  //   const data = subscriptionDetailData;
  const { data, isLoading } = useQuery({
    queryKey: ["getSubscriptionDetail"],
    queryFn: () => getSubscriptionProductDetail(param.storeId),
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (!data || isLoading) return <ProductInfoFallback />;

  return (
    <div className="w-full flex flex-row gap-10 flex-wrap justify-center">
      <div className="w-[33vw] h-[33vw] max-w-[440px] max-h-[440px] min-w-[370px] min-h-[370px">
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
        <p className="text-[1.2rem] font-regular flex flex-row gap-2 justify-end">
          <span className="mt-3">총 상품금액</span>
          <b className="text-primary4 text-[2rem] font-bold">
            {data.productPrice.toLocaleString()}원
          </b>
        </p>

        <Button type="primary" style={{ width: "100%", height: "3rem" }}>
          정기구독 신청
        </Button>
        {isModalOpen ? (
          <Modal
            title="쿠폰 다운로드"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[]}
          >
            <CouponModal storeId={param.storeId} />
          </Modal>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
