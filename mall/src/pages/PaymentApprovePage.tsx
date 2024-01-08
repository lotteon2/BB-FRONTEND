import { useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import { useEffect } from "react";

export default function PaymentApprovePage() {
  const param = useParams().message;

  console.log(param);
  useEffect(() => {
    setTimeout(() => {
      window.opener.postMessage(
        {
          state: param,
        },
        "http://localhost:3000"
      );

      //   window.close();
    }, 3000);
  }, []);

  return (
    <div>
      <Loading />
    </div>
  );
}
