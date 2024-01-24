import { Outlet } from "react-router";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useNavigate } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  loginState,
  searchWordState,
  sideMenuState,
  wishState,
  wordState,
} from "../recoil/atom/common";
import { Button, ConfigProvider, Input } from "antd";
import { useMutation } from "react-query";
import { modifyStoreWishList, modifyWishList } from "../apis/member";
import { productWishState, storeWishState } from "../recoil/atom/member";
import ScrollToTop from "../components/common/ScrollToTop";
import { useEffect } from "react";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

export default function MainLayout() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const productWishList = useRecoilValue<string[]>(productWishState);
  const resetProductWishList = useResetRecoilState(productWishState);
  const storeWishList = useRecoilValue<number[]>(storeWishState);
  const resetStoreWishList = useResetRecoilState(storeWishState);
  const setSideMenuState = useSetRecoilState<number>(sideMenuState);
  const setIsChange = useSetRecoilState<boolean>(wishState);
  const [search, setSearch] = useRecoilState<string>(searchWordState);
  const [word, setWord] = useRecoilState<string>(wordState);

  const handleWishList = () => {
    if (productWishList.length !== 0) {
      productWishMutation.mutate();
    } else {
      navigate("/mypage");
      setSideMenuState(1);
    }
    if (storeWishList.length !== 0) {
      storeWishMutation.mutate();
    } else {
      navigate("/mypage");
      setSideMenuState(1);
    }
  };

  const handleRefresh = () => {
    if (productWishList.length !== 0) {
      refreshProductWishMutation.mutate();
    }
    if (storeWishList.length !== 0) {
      refreshStoreWishMutation.mutate();
    }
  };

  const handleSearchList = () => {
    if (search === "") {
      setSearch("연인에게 선물하면 좋은 꽃 추천해줘");
      setWord("");
      navigate("/product/search");
    } else {
      setWord("");
      navigate("/product/search");
    }
  };

  const productWishMutation = useMutation(
    ["modifyWishList"],
    () => modifyWishList(productWishList),
    {
      onSuccess: () => {
        navigate("/mypage");
        setSideMenuState(1);
        resetProductWishList();
        setIsChange((cur) => !cur);
      },
      onError: () => {
        productWishMutation.mutate();
        setIsChange((cur) => !cur);
      },
    }
  );

  const storeWishMutation = useMutation(
    ["modifyStoreWishList"],
    () => modifyStoreWishList(storeWishList),
    {
      onSuccess: () => {
        navigate("/mypage");
        setSideMenuState(1);
        resetStoreWishList();
        setIsChange((cur) => !cur);
      },
      onError: () => {
        storeWishMutation.mutate();
        setIsChange((cur) => !cur);
      },
    }
  );

  const refreshProductWishMutation = useMutation(
    ["refreshProductWishMutation"],
    () => modifyWishList(productWishList),
    {
      onSuccess: () => {
        resetProductWishList();
        setIsChange((cur) => !cur);
      },
      onError: () => {
        refreshProductWishMutation.mutate();
        setIsChange((cur) => !cur);
      },
    }
  );

  const refreshStoreWishMutation = useMutation(
    ["refreshStoreWishMutation"],
    () => modifyStoreWishList(storeWishList),
    {
      onSuccess: () => {
        resetStoreWishList();
        setIsChange((cur) => !cur);
      },
      onError: () => {
        refreshStoreWishMutation.mutate();
        setIsChange((cur) => !cur);
      },
    }
  );

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", handleRefresh);
      // 4. beforeunload 이벤트는 리소스가 사라지기 전 window 자체에서 발행한다.
      // 4-2. window의 이벤트를 감지하여 beforunload 이벤트 발생 시 preventClose 함수가 실행된다.
    })();

    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
      // 5. 해당 이벤트 실행 후, beforeunload를 감지하는 것을 제거한다.
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="font-regular">
      <ScrollToTop />
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#85C031",
          },
        }}
      >
        <Header />
        {isLogin ? (
          <div className="fixed right-20 top-60 max-[1320px]:right-3 flex flex-col gap-3 z-20 bg-grayscale1 p-3 rounded-full border-2 shadow-xl z-30">
            <button onClick={() => navigate("/cart")} title="장바구니">
              <ShoppingBagIcon />
            </button>
            <button onClick={handleWishList} title="찜한 상품">
              <FavoriteIcon />
            </button>
            <button onClick={() => navigate("/flowers")} title="꽃도감">
              <LocalFloristIcon />
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              title="맨위로"
            >
              <ArrowUpwardIcon />
            </button>
          </div>
        ) : (
          <div className="fixed right-20 top-60 max-[1320px]:right-3 flex flex-col gap-3 z-20 bg-grayscale1 p-3 rounded-full border-2 shadow-xl z-30">
            <button onClick={() => navigate("/flowers")} title="꽃도감">
              <LocalFloristIcon />
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              title="맨위로"
            >
              <ArrowUpwardIcon />
            </button>
          </div>
        )}

        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-row gap-2 justify-end mt-[-10px] mr-6 mb-5">
            <Input
              style={{ width: 250 }}
              placeholder="연인에게 선물하면 좋은 꽃 추천해줘"
              defaultValue={word}
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
                setSearch(e.target.value);
              }}
            />
            <Button onClick={handleSearchList}>검색</Button>
          </div>
          <Outlet />
        </div>

        <Footer />
      </ConfigProvider>
    </div>
  );
}
