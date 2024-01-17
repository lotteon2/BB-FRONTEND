import { NavLink } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import StoreIcon from "@mui/icons-material/Store";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import InventoryIcon from "@mui/icons-material/Inventory";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PaidIcon from "@mui/icons-material/Paid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { useRef, useState } from "react";
import { Tour } from "antd";
import type { TourProps } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);

  const activeStyle = {
    color: "#DEA9F6",
  };

  const steps: TourProps["steps"] = [
    {
      title: "대시보드",
      description:
        "대시보드탭에서는 주간 매출액 그래프와 주간 상품별 판매량, 재고 잔여량을 확인할 수 있습니다. 각 그래프는 이미지 혹은 CSV 파일로 다운로드 할 수 있습니다.",
      placement: "right",
      target: () => ref1.current,
    },
    {
      title: "가게 관리",
      description:
        "가게 관리탭에서는 가게 정보를 수정할 수 있습니다. 가게를 등록해야 나머지 서비스를 모두 이용할 수 있으니 첫 진입 시 가게 등록을 먼저 진행해주세요. 내 가게만의 쿠폰과 정기구독 상품을 등록하고 관리할 수도 있습니다.",
      placement: "right",
      target: () => ref2.current,
    },
    {
      title: "상품 관리",
      description:
        "상품관리 탭에서는 가게에서 판매할 상품을 등록하고 관리할 수 있습니다. 카테고리별로 조회할 수도 있고 검색을 통해 특정 상품만 조회할 수도 있습니다. 상품 등록 시 최대한 자세한 정보를 등록해야 더욱 유효한 재고관리 정보를 받아볼 수 있으니 꼼꼼하게 작성 부탁드립니다.",
      placement: "right",
      target: () => ref3.current,
    },
    {
      title: "배송주문 관리",
      description:
        "배송주문 관리탭에서는 배송 주문에 관한 정보만 확인할 수 있습니다. 주문 상태별로 목록을 조회할 수 있고, 특정 아이템을 클릭하면 상세정보를 확인할 수 있습니다. 택배사에 상품을 접수하면 주문 상태를 '배송 시작'으로 바꿔주어야 합니다.",
      placement: "right",
      target: () => ref4.current,
    },
    {
      title: "구독/픽업 관리",
      description:
        "구독/픽업 관리 탭에서는 현재 신청된 구독과 픽업 정보들을 확인할 수 있습니다. 캘린더 형식을 지원해 더욱 간편하게 확인할 수 있습니다. 캘린더에 등록된 이벤트를 클릭하면 해당 날짜에 대한 구독/픽업 정보들을 확인할 수 있습니다.",
      placement: "right",
      target: () => ref5.current,
    },
    {
      title: "재고 관리",
      description:
        "재고 관리 탭에서는 꽃 종류별로 재고 잔여량을 확인할 수 있습니다. 그래프 형식으로 한눈에 재고를 파악할 수 있고, 바쁘신 가게 사장님들을 위해 특정 꽃의 재고가 50개 이하로 내려가게 되면 BB에서 알람을 발송해줍니다. 재고에 변경사항이 있을 시 '재고 관리' 버튼을 통해 재고를 변경할 수 있습니다.",
      placement: "right",
      target: () => ref6.current,
    },
    {
      title: "리뷰/문의 관리",
      description:
        "리뷰/문의 관리 탭에서는 가게에 등록된 리뷰와 문의들을 조회하고 관리할 수 있습니다. 문의 관리에서는 등록된 문의에 대한 답변을 남길 수 있습니다.",
      placement: "right",
      target: () => ref7.current,
    },
    {
      title: "정산 내역",
      description:
        "정산 내역 탭에서는 매월 정산된 내역들을 확인할 수 있습니다. 정산은 매월 25일 일괄적으로 이루어지고, 월별 총 매출의 90%를 정산받을 수 있어요. 나머지 10%는 BB 서비스 이용료로 더욱 편안한 가게 관리를 위한 서비스 품질 향상에 사용됩니다.",
      placement: "right",
      target: () => ref8.current,
    },
  ];

  return (
    <div className="mt-10">
      <NavLink to="/">
        <p className="text-center logo text-primary1 text-5xl cursor-pointer">
          Blooming Blooms
        </p>
      </NavLink>
      <ul className="mt-10 ml-8 flex flex-col text-3xl gap-10 text-grayscale1">
        <li className="w-[90%]" ref={ref1}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/"
          >
            <SpaceDashboardIcon sx={{ fontSize: 40, marginRight: 2 }} />
            대시보드
          </NavLink>
        </li>
        <li className="w-[90%]" ref={ref2}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/store"
          >
            <StoreIcon sx={{ fontSize: 40, marginRight: 2 }} />
            가게 관리
          </NavLink>
        </li>
        <li className="w-[90%]" ref={ref3}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/product"
          >
            <InventoryIcon sx={{ fontSize: 40, marginRight: 2 }} />
            상품 관리
          </NavLink>
        </li>
        <li className="w-[90%]" ref={ref4}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/order"
          >
            <LocalShippingIcon sx={{ fontSize: 40, marginRight: 2 }} />
            배송주문 관리
          </NavLink>
        </li>
        <li className="w-[90%]" ref={ref5}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/schedule"
          >
            <ChecklistRtlIcon sx={{ fontSize: 40, marginRight: 2 }} />
            구독/픽업 관리
          </NavLink>
        </li>
        <li className="w-[90%]" ref={ref6}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/stock"
          >
            <LocalFloristIcon sx={{ fontSize: 40, marginRight: 2 }} />
            재고 관리
          </NavLink>
        </li>
        <li className="w-[90%]" ref={ref7}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/manage"
          >
            <RateReviewIcon sx={{ fontSize: 40, marginRight: 2 }} />
            리뷰/문의 관리
          </NavLink>
        </li>
        <li className="w-[90%]" ref={ref8}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/settlement"
          >
            <PaidIcon sx={{ fontSize: 40, marginRight: 2 }} />
            정산 내역
          </NavLink>
        </li>
      </ul>
      <button
        className="absolute bottom-5 right-5 text-grayscale1"
        onClick={() => setOpen(true)}
      >
        <QuestionCircleFilled style={{ marginRight: 2 }} />
        도움말
      </button>

      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
}
