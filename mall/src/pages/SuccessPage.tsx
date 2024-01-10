import { Button } from "antd";
import Success from "../assets/images/success.gif";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { mallState } from "../recoil/atom/common";

export default function SuccessPage() {
  const isMall = useRecoilValue(mallState);
  const navigate = useNavigate();

  return (
    <div className="my-20">
      <img src={Success} alt="" className="m-auto w-40 h-40" />
      <p className="text-center text-[1.3rem] font-bold my-5">
        결제가 완료되었습니다.
      </p>
      <div className="flex flex-row gap-3 justify-center">
        <Button onClick={() => (isMall ? navigate("/") : navigate("/pickup"))}>
          메인으로 돌아가기
        </Button>
        <Button type="primary" onClick={() => navigate("/mypage")}>
          주문내역 확인하기
        </Button>
      </div>
    </div>
  );
}
