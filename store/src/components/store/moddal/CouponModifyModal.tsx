import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";
import {
  couponDto,
  couponRegisterDto,
} from "../../../recoil/common/interfaces";
import { useMutation } from "react-query";
import { registerCoupon } from "../../../apis/store";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../../recoil/atom/common";
import { FailToast } from "../../common/toast/FailToast";
import { SuccessToast } from "../../common/toast/SuccessToast";
import dayjs from "dayjs";

interface param {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleChange: () => void;
  data: couponRegisterDto;
}
export default function CouponModifyModal(param: param) {
  const storeId = useRecoilValue<number>(storeIdState);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [modifyValues, setModifyValues] = useState<couponDto>({
    couponName: param.data.couponName,
    discountPrice: param.data.discountPrice,
    minPrice: param.data.minPrice,
    limitCount: param.data.limitCount,
    startDate: dayjs(param.data.startDate),
    endDate: dayjs(param.data.endDate),
  });

  const handleRegister = () => {
    if (
      modifyValues.couponName !== "" &&
      modifyValues.limitCount !== null &&
      modifyValues.discountPrice !== null &&
      modifyValues.minPrice !== null &&
      modifyValues.startDate !== null &&
      modifyValues.endDate !== null
    ) {
      const couponInfo = {
        couponName: modifyValues.couponName,
        discountPrice: modifyValues.discountPrice,
        minPrice: modifyValues.minPrice,
        limitCount: modifyValues.limitCount,
        startDate: start,
        endDate: end,
      };
      registerMutation.mutate(couponInfo);
    }
  };

  const registerMutation = useMutation(
    ["registerCouponInfo"],
    (couponInfo: couponRegisterDto) => registerCoupon(storeId, couponInfo),
    {
      onSuccess: () => {
        SuccessToast("등록되었습니다.");
        param.handleCancel();
        param.handleChange();
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const handleStartDate: DatePickerProps["onChange"] = (date, dateString) => {
    setStart(dateString);
    setModifyValues((prev) => ({ ...prev, startDate: date }));
  };

  const handleEndDate: DatePickerProps["onChange"] = (date, dateString) => {
    setEnd(dateString);
    setModifyValues((prev) => ({ ...prev, endDate: date }));
  };

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(modifyValues);
  }, [form, modifyValues]);

  return (
    <Modal
      title="쿠폰 수정"
      footer={[]}
      maskClosable={false}
      open={param.isModalOpen}
      onCancel={param.handleCancel}
    >
      <Form
        name="couponRegisterform"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        autoComplete="off"
        initialValues={modifyValues}
        style={{ marginLeft: -80 }}
      >
        <Form.Item
          name="couponName"
          label="쿠폰명"
          rules={[{ required: true, message: "필수 입력값입니다." }]}
        >
          <Input
            value={modifyValues.couponName}
            className="w-full"
            placeholder="쿠폰명"
            onChange={(e) =>
              setModifyValues((prev) => ({
                ...prev,
                couponName: e.target.value,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          name="limitCount"
          label="발행개수"
          rules={[{ required: true, message: "필수 입력값입니다." }]}
        >
          <InputNumber
            value={modifyValues.limitCount}
            className="w-full"
            placeholder="발행개수"
            onChange={(e) =>
              setModifyValues((prev) => ({
                ...prev,
                limitCount: e,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          name="discountPrice"
          label="할인금액"
          rules={[{ required: true, message: "필수 입력값입니다." }]}
        >
          <InputNumber
            value={modifyValues.discountPrice}
            className="w-full"
            placeholder="할인금액"
            onChange={(e) =>
              setModifyValues((prev) => ({
                ...prev,
                discountPrice: e,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          name="minPrice"
          label="최소주문금액"
          rules={[{ required: true, message: "필수 입력값입니다." }]}
        >
          <InputNumber
            value={modifyValues.minPrice}
            className="w-full"
            placeholder="최소주문금액"
            onChange={(e) =>
              setModifyValues((prev) => ({
                ...prev,
                minPrice: e,
              }))
            }
          />
        </Form.Item>
        <div className="flex flex-row gap-8 ml-[115px]">
          <Form.Item
            name="startDate"
            label="시작일"
            rules={[{ required: true, message: "필수 입력값입니다." }]}
          >
            <DatePicker
              onChange={handleStartDate}
              format="YYYY-MM-DD"
              value={modifyValues.startDate}
            />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="종료일"
            rules={[{ required: true, message: "필수 입력값입니다." }]}
          >
            <DatePicker
              onChange={handleEndDate}
              format="YYYY-MM-DD"
              value={modifyValues.endDate}
            />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <Button key="cancel" onClick={param.handleCancel}>
            취소
          </Button>
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            onClick={handleRegister}
          >
            등록
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
