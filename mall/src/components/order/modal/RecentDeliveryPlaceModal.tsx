import { useState } from "react";
import {
  deliveryAddressDto,
  orderDto,
  subscriptionOrderDto,
} from "../../../recoil/common/interfaces";
import { Empty, Button } from "antd";
import { useSetRecoilState } from "recoil";
import { orderState, subscriptionOrderState } from "../../../recoil/atom/order";
import { useQuery } from "react-query";
import { getRecentDeliveryAddress } from "../../../apis/delivery";
import Loading from "../../common/Loading";

interface param {
  handleCancel: () => void;
  type: string;
  addressId: number | null;
}
export default function RecentDeliveryPlaceModal(param: param) {
  const setSubscriptionOrder = useSetRecoilState<subscriptionOrderDto>(
    subscriptionOrderState
  );
  const setOrder = useSetRecoilState<orderDto>(orderState);

  const [selected, setSelected] = useState<deliveryAddressDto>({
    deliveryAddressId: param.addressId,
    recipientName: "",
    zipcode: "",
    roadName: "",
    addressDetail: "",
    phoneNumber: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getRecentDeliveryAddress"],
    queryFn: () => getRecentDeliveryAddress(),
  });

  const handleSelect = () => {
    if (param.type === "subscription") {
      setSubscriptionOrder((prev) => ({
        ...prev,
        recipientName: selected.recipientName,
        recipientPhone: selected.phoneNumber,
        deliveryZipcode: selected.zipcode,
        deliveryRoadName: selected.roadName,
        deliveryAddressDetail: selected.addressDetail,
        deliveryAddressId: selected.deliveryAddressId,
      }));
    } else {
      setOrder((prev) => ({
        ...prev,
        recipientName: selected.recipientName,
        recipientPhone: selected.phoneNumber,
        deliveryZipcode: selected.zipcode,
        deliveryRoadName: selected.roadName,
        deliveryAddressDetail: selected.addressDetail,
        deliveryAddressId: selected.deliveryAddressId,
      }));
    }

    param.handleCancel();
  };

  if (!data || isLoading) return <Loading />;

  return (
    <div>
      <div className="max-h-[500px] overflow-auto px-2">
        {data.data.length === 0 ? (
          <Empty description="최근 배송지 내역이 없습니다." />
        ) : (
          <div className="flex flex-col gap-3">
            {data.data.map((item: deliveryAddressDto) => (
              <div
                key={item.deliveryAddressId}
                className={`p-2 border-[1px] cursor-pointer hover:border-2 hover:border-primary7 ${
                  selected.deliveryAddressId === item.deliveryAddressId
                    ? "border-2 border-primary7"
                    : ""
                }`}
                onClick={() => setSelected(item)}
              >
                <p className="font-bold text-[1rem]">{item.recipientName}</p>
                <p>{item.phoneNumber}</p>
                <p className="font-light mt-3">{item.zipcode}</p>
                <div className="flex flex-row gap-2 text-[1rem]">
                  <p>{item.roadName}</p>
                  <p>{item.addressDetail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div></div>
      </div>
      {data.data.length === 0 ? (
        ""
      ) : (
        <div className="flex justify-end mt-3">
          <Button type="primary" size="large" onClick={handleSelect}>
            선택
          </Button>
        </div>
      )}
    </div>
  );
}
