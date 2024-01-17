import { Button } from "antd";
import Fail from "../assets/images/fail.gif";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { mallState } from "../recoil/atom/common";

export default function FailPage() {
  const isMall = useRecoilValue(mallState);
  const navigate = useNavigate();

  return (
    <div className="my-20">
      <img src={Fail} alt="" className="m-auto w-40 h-40" />
      <p className="text-center text-[1.3rem] font-bold my-5">
        주문 접수 도중 오류가 발생했습니다.
      </p>
      <div className="flex flex-row gap-3 justify-center">
        <Button onClick={() => (isMall ? navigate("/") : navigate("/pickup"))}>
          메인으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
