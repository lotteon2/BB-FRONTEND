import { useQuery } from "react-query";
import { getPickupDetail } from "../../../apis/order";
import Loading from "../../common/Loading";
import { pickupOrderDetailData } from "../../../mocks/order";
import { Button, Form, Input, Tag } from "antd";

interface param {
  id: string;
}

export default function PickupOrderInfo(param: param) {
  const data = pickupOrderDetailData;

  // const {data, isLoading} = useQuery({
  //   queryKey: [""],
  //   queryFn: () => getPickupDetail(param.id),
  // })

  // if (!data || isLoading) return <Loading />
  return (
    <div>
      <div className="flex flex-row gap-5 flex-wrap justify-center mt-5">
        <div className="w-[45vw] max-w-[900px] min-w-[370px]">
          <div>
            <div className="flex flex-row justify-between border-b-[1px] border-grayscale7 text-[1.5rem]">
              <p>주문상품 정보</p>
              <p className="text-[1rem] pt-3">예약번호: {param.id}</p>
            </div>

            <div className="border-[1px] border-grayscale3 mt-3 relative rounded-lg">
              <div className="bg-grayscale2 pl-2 py-1 flex justify-between">
                <div>
                  <p>{data.storeName}</p>
                  <p className="text-grayscale6 text-[0.8rem]">
                    {data.storeAddress}
                  </p>
                </div>
                <Tag color="#315136" className="h-[20px] my-auto">
                  {data.reservationStatus === "PENDING"
                    ? "주문접수"
                    : "픽업 완료"}
                </Tag>
              </div>
              <div className="p-2 border-b-[1px]">
                <p className="text-[1.2rem] font-bold">{data.productName}</p>
                <div className="h-full flex flex-row justify-between flex-wrap align-center">
                  <div className="flex flex-row gap-2">
                    <div className="w-[150px] h-[150px]">
                      <img
                        className="w-full h-full rounded-lg"
                        src={data.productThumbnail}
                        alt="상품 이미지"
                      />
                    </div>
                    <div className="flex flex-col gap-3 w-[20%] max-w-[160px] min-w-[160px]">
                      <div className="flex flex-row gap-3">
                        <span className="border-[1px] px-2 py-1 rounded-lg">
                          가격
                        </span>
                        <span className="mt-1">
                          {data.unitPrce.toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex flex-row gap-3">
                        <span className="border-[1px] px-2 py-1 rounded-lg">
                          수량
                        </span>
                        <span className="mt-1">
                          {data.quantity.toLocaleString()}개
                        </span>
                      </div>
                      <div className="font-bold text-[1.5rem]">
                        {data.totalOrderPrice.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 my-auto max-[1200px]:w-full max-[1200px]:justify-end">
                    <Button
                      disabled={data.reviewStatus === "ABLE" ? false : true}
                    >
                      {data.reviewStatus === "DONE" ? "작성 완료" : "리뷰 작성"}
                    </Button>
                    <Button
                      disabled={data.cardStatus === "ABLE" ? false : true}
                      type="primary"
                    >
                      {data.cardStatus === "DONE" ? "작성 완료" : "카드 작성"}
                    </Button>
                  </div>
                </div>
              </div>
              <p className="px-2 py-2">
                픽업 일시:{" "}
                <span className="font-bold">
                  {data.pickupDate + " " + data.pickupTime}
                </span>
              </p>
              <div className="border-t-[1px]"></div>
              <div className="flex flex-row p-2">
                <div className="w-full flex flex-row justify-between gap-16 text-[1.2rem]">
                  <div className="flex flex-col gap-2">
                    <p>총 주문금액</p>
                    <p>총 할인금액</p>
                    <p className="font-bold">총 결제금액</p>
                  </div>
                  <div className="flex flex-col gap-2 text-right">
                    <p>{data.totalOrderPrice.toLocaleString()}원</p>
                    <p className="text-[#FF5555]">
                      {data.totalDiscountPrice.toLocaleString()}원
                    </p>
                    <p className="font-bold text-primary4">
                      {data.actualPrice.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Form
            name="pickupOrderDetailForm"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, width: "100%" }}
            autoComplete="off"
            initialValues={data}
          >
            {/* 주문자 정보 */}
            <div className="mt-10">
              <div className="border-b-[1px] border-grayscale7 relative">
                <p className="text-[1.5rem]">주문자</p>
              </div>
              <div className="flex flex-col gap-5 mt-10">
                <Form.Item name="ordererName" label="성함">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="ordererPhoneNumber" label="연락처">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="ordererEmail" label="이메일">
                  <Input disabled />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        <div className="w-[20vw] max-w-[400px] min-w-[370px]">
          <div className="flex flex-row justify-between border-b-[1px] border-grayscale7 text-[1.5rem]">
            <p>결제 금액</p>
            <p className="text-[1rem] pt-3 text-grayscale5 font-light">
              {data.paymentDateTime}
            </p>
          </div>
          <div className="flex flex-row gap-20 w-full text-[1.2rem] justify-between">
            <div className="flex flex-col gap-2">
              <p>총 주문금액</p>
              <p className="text-[#FF5555]">총 할인금액</p>
              <p className="font-bold text-[1.5rem]">총 결제금액</p>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <p>{data.totalOrderPrice.toLocaleString()}원</p>
              <p>{data.totalDiscountPrice.toLocaleString()}원</p>
              <p className="font-bold text-primary4 text-[1.5rem]">
                {data.actualPrice.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
