import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/common/Header";
import ProfileBar from "../components/common/ProfileBar";
import { loginState, storeIdState } from "../recoil/atom/common";
import { useRecoilValue } from "recoil";
import { Button, Empty } from "antd";
import StoreRegisterModal from "../components/store/moddal/StoreRegisterModal";
import { useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const storeId = useRecoilValue<number | null>(storeIdState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[1920px] h-screen font-regular flex flex-row">
      <div className="w-[300px] bg-grayscale7 relative">
        <Header />
      </div>
      <div className="w-[1620px] relative">
        <ProfileBar />
        {storeId === null ? (
          <div className="pt-80">
            <Empty description="등록된 가게정보가 없습니다.">
              <Button onClick={() => setIsModalOpen(true)}>
                가게 등록하기
              </Button>
            </Empty>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      {isModalOpen ? (
        <StoreRegisterModal
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
        />
      ) : (
        ""
      )}
    </div>
  );
}
