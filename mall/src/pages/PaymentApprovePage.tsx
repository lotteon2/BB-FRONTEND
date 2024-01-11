import { useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import { useEffect } from "react";

export default function PaymentApprovePage() {
  const param = useParams().message;

  useEffect(() => {
    if (param === "cancel") {
      window.close();
    } else {
      console.log("param");
      setTimeout(() => {
        window.opener.postMessage({
          state: param,
        });
        window.close();
      }, 3000);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full h-full">
      {param === "cancel" ? (
        ""
      ) : (
        <div className="mt-16">
          <Loading />
          <p className="text-center text-[1.5rem]">
            결제 진행중입니다
            <br /> 잠시만 기다려주세요
          </p>
        </div>
      )}
    </div>
  );
}
