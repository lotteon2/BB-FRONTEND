import { useCallback, useEffect, useState } from "react";
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

interface param {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleChange: () => void;
}
export default function CouponRegisterModal(param: param) {
  const storeId = useRecoilValue<number>(storeIdState);
  const [start, setStart] = useState<any>();
  const [end, setEnd] = useState<any>();
  const [registerValues, setRegisterValues] = useState<couponDto>({
    couponName: "",
    discountPrice: null,
    minPrice: null,
    limitCount: null,
    startDate: null,
    endDate: null,
  });

  const handleRegister = () => {
    if (
      registerValues.couponName !== "" &&
      registerValues.limitCount !== null &&
      registerValues.discountPrice !== null &&
      registerValues.minPrice !== null &&
      registerValues.startDate !== null &&
      registerValues.endDate !== null &&
      registerValues.discountPrice < registerValues.minPrice
    ) {
      const startDate = new Date(start);
      const endDate = new Date(end);

      if (endDate >= startDate) {
        const couponInfo = {
          couponName: registerValues.couponName,
          discountPrice: registerValues.discountPrice,
          minPrice: registerValues.minPrice,
          limitCount: registerValues.limitCount,
          startDate: start,
          endDate: end,
        };
        registerMutation.mutate(couponInfo);
      }
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
    setRegisterValues((prev) => ({ ...prev, startDate: date }));
  };

  const handleEndDate: DatePickerProps["onChange"] = (date, dateString) => {
    setEnd(dateString);
    setRegisterValues((prev) => ({ ...prev, endDate: date }));
  };

  const checkStartDate = useCallback(
    (_: any, value: string) => {
      if (!value) {
        return Promise.reject(new Error("필수 입력값입니다."));
      }
      if (end) {
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (endDate < startDate)
          return Promise.reject(new Error("잘못된 입력값입니다."));
      }

      return Promise.resolve();
      // eslint-disable-next-line
    },
    [start, end]
  );

  const checkEndDate = useCallback(
    (_: any, value: string) => {
      if (!value) {
        return Promise.reject(new Error("필수 입력값입니다."));
      }
      if (start) {
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (endDate < startDate)
          return Promise.reject(new Error("잘못된 입력값입니다."));
      }

      return Promise.resolve();
      // eslint-disable-next-line
    },
    [start, end]
  );

  const checkCouponAmount = useCallback(
    (_: any, value: number) => {
      if (!value) {
        return Promise.reject(new Error("필수 입력값입니다."));
      }

      if (registerValues.minPrice !== null) {
        if (value >= registerValues.minPrice) {
          return Promise.reject(
            new Error("할인금액은 최소주문금액보다 작은 금액이어야 합니다.")
          );
        }
      }

      return Promise.resolve();
      // eslint-disable-next-line
    },
    [registerValues]
  );

  const checkMinPrice = useCallback(
    (_: any, value: number) => {
      if (!value) {
        return Promise.reject(new Error("필수 입력값입니다."));
      }

      if (registerValues.discountPrice !== null) {
        if (value <= registerValues.discountPrice) {
          return Promise.reject(
            new Error("최소주문금액은 할인금액보다 큰 금액이어야 합니다.")
          );
        }
      }

      return Promise.resolve();
      // eslint-disable-next-line
    },
    [registerValues]
  );

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(registerValues);
  }, [form, registerValues]);

  return (
    <Modal
      title="쿠폰 등록"
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
        initialValues={registerValues}
        style={{ marginLeft: -80 }}
      >
        <Form.Item
          name="couponName"
          label="쿠폰명"
          rules={[{ required: true, message: "필수 입력값입니다." }]}
        >
          <Input
            value={registerValues.couponName}
            className="w-full"
            placeholder="쿠폰명"
            onChange={(e) =>
              setRegisterValues((prev) => ({
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
            value={registerValues.limitCount}
            className="w-full"
            placeholder="발행개수"
            onChange={(e) =>
              setRegisterValues((prev) => ({
                ...prev,
                limitCount: e,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          name="discountPrice"
          label="할인금액"
          rules={[{ required: true, validator: checkCouponAmount }]}
        >
          <InputNumber
            value={registerValues.discountPrice}
            className="w-full"
            placeholder="할인금액"
            onChange={(e) =>
              setRegisterValues((prev) => ({
                ...prev,
                discountPrice: e,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          name="minPrice"
          label="최소주문금액"
          rules={[{ required: true, validator: checkMinPrice }]}
        >
          <InputNumber
            value={registerValues.minPrice}
            className="w-full"
            placeholder="최소주문금액"
            onChange={(e) =>
              setRegisterValues((prev) => ({
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
            rules={[{ required: true, validator: checkStartDate }]}
          >
            <DatePicker
              onChange={handleStartDate}
              format="YYYY-MM-DD"
              value={registerValues.startDate}
            />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="종료일"
            rules={[{ required: true, validator: checkEndDate }]}
          >
            <DatePicker
              onChange={handleEndDate}
              format="YYYY-MM-DD"
              value={registerValues.endDate}
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
