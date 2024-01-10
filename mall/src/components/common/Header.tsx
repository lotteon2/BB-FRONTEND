import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  mallState,
  loginState,
  sideMenuState,
  nicknameState,
  profileImageState,
} from "../../recoil/atom/common";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import Logo from "../../assets/images/logo.png";
import { Select } from "antd";
import { useMutation } from "react-query";
import { logout } from "../../apis/auth";
import { FailToast } from "./toast/FailToast";
import { SuccessToast } from "./toast/SuccessToast";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { modifyStoreWishList, modifyWishList } from "../../apis/member";
import { productWishState, storeWishState } from "../../recoil/atom/member";
import {
  cartOrderState,
  orderInfoState,
  orderState,
  pickupOrderState,
  subscriptionOrderState,
} from "../../recoil/atom/order";
import Notification from "./Notification";
import {
  notiCountState,
  notiEventState,
  notiShowState,
} from "../../recoil/atom/noti";
import { getUnreadNotificationsCount } from "../../apis/noti";

interface parameter {
  istoggled: string;
  usertoggled: string;
}

const HeaderStyle = styled.div<parameter>`
  max-width: 1320px;
  padding: 20px 10px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    margin: 0 1rem;
  }

  .header__menulist {
    list-style: none;
    display: flex;
    font-size: 1.3rem;
  }

  .header__left {
    display: flex;
  }

  .header__right {
    list-style: none;
    display: flex;
    text-align: right;
  }

  li {
    padding: 0 1rem;
  }
  .toggle {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  .user {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  @media screen and (max-width: 840px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props: parameter) =>
        props.usertoggled === "true" ? "flex" : "none"};
      flex-direction: column;
      width: 100%;
    }

    .header__menulist {
      display: ${(props: parameter) =>
        props.istoggled === "true" ? "flex" : "none"};
      flex-direction: column;
      width: 100%;
    }

    .header__menulist li,
    .header__right li {
      margin: 1rem 0;
      padding: 0;
    }

    .toggle {
      display: block;
    }

    .user {
      display: block;
    }
  }
`;

export default function Header() {
  const resetLoginState = useResetRecoilState(loginState);
  const resetNicknameState = useResetRecoilState(nicknameState);
  const resetProfileImage = useResetRecoilState(profileImageState);
  const resetPickup = useResetRecoilState(pickupOrderState);
  const resetOrder = useResetRecoilState(orderState);
  const resetSubscription = useResetRecoilState(subscriptionOrderState);
  const resetCart = useResetRecoilState(cartOrderState);
  const resetOrderInfo = useResetRecoilState(orderInfoState);
  const isMall = useRecoilValue<boolean>(mallState);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [userToggled, setUserToggled] = useState<boolean>(false);
  const [mall, setMallState] = useRecoilState<boolean>(mallState);
  const isLogin = useRecoilValue(loginState);
  const setSideMenuState = useSetRecoilState<number>(sideMenuState);
  const navigate = useNavigate();
  const [productWishList, setProductWishList] =
    useRecoilState<string[]>(productWishState);
  const [storeWishList, setStoreWishList] =
    useRecoilState<number[]>(storeWishState);
  const notiEvent = useRecoilValue<boolean>(notiEventState);
  const [isNotiShow, setNotiShow] = useRecoilState<boolean>(notiShowState);
  const [notiCount, setNotiCount] = useRecoilState<number>(notiCountState);

  const activeStyle = {
    borderBottom: "3px solid #41744D",
    fontFamily: "bold",
  };
  const rightActiveStyle = {
    fontFamily: "bold",
  };

  const handleChange = (value: string) => {
    if (value === "pickup") {
      setMallState(false);
      navigate("/pickup");
    } else {
      setMallState(true);
      navigate("/");
    }
  };

  const handleLogout = () => {
    productWishMutation.mutate();
    storeWishMutation.mutate();
  };

  const logouMutation = useMutation(["logout"], () => logout("kakao"), {
    onSuccess: () => {
      resetLoginState();
      resetNicknameState();
      resetProfileImage();
      resetPickup();
      resetOrder();
      resetSubscription();
      resetCart();
      resetOrderInfo();
      localStorage.clear();
      localStorage.removeItem("accessToken");
      isMall ? navigate("/") : navigate("/pickup");
      SuccessToast("로그아웃 되었습니다.");
    },
    onError: () => {
      FailToast(null);
    },
  });

  const productWishMutation = useMutation(
    ["modifyWishList"],
    () => modifyWishList(productWishList),
    {
      onSuccess: () => {
        setProductWishList([]);
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) logouMutation.mutate();
      },
      onError: () => {
        productWishMutation.mutate();
      },
    }
  );

  const storeWishMutation = useMutation(
    ["modifyStoreWishList"],
    () => modifyStoreWishList(storeWishList),
    {
      onSuccess: () => {
        setStoreWishList([]);
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) logouMutation.mutate();
      },
      onError: () => {
        storeWishMutation.mutate();
      },
    }
  );

  const notiCountMutate = useMutation(
    ["getUnreadNotificationsCount", notiEvent],
    () => getUnreadNotificationsCount(),
    {
      onSuccess: (data) => {
        setNotiCount(data.data.unreadCount);
      },
      onError: () => {},
    }
  );

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) notiCountMutate.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, notiEvent]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) notiCountMutate.mutate();
  }, [isNotiShow]);

  return (
    <div className="mt-5">
      <div className="ml-5">
        <Select
          defaultValue={mall ? "shoppingmall" : "pickup"}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "shoppingmall", label: "꽃 쇼핑몰" },
            { value: "pickup", label: "픽업/예약" },
          ]}
        />
      </div>
      <img
        className="w-36 mx-auto cursor-pointer"
        src={Logo}
        alt="로고"
        onClick={() => {
          mall ? navigate("/") : navigate("/pickup");
        }}
      />
      <HeaderStyle
        istoggled={isToggled.toString()}
        usertoggled={userToggled.toString()}
      >
        {/*햄버거 버튼 */}
        <div
          className="toggle"
          onClick={() => {
            setIsToggled(!isToggled);
          }}
        >
          <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} />
        </div>
        <div
          className="user"
          onClick={() => {
            setUserToggled(!userToggled);
          }}
        >
          <FontAwesomeIcon icon={!userToggled ? faUser : faTimes} />
        </div>
        {mall ? (
          <ul className="header__menulist">
            <li className="font-regular">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : {})}
                to="/product/1"
              >
                꽃다발
              </NavLink>
            </li>
            <li className="font-regular">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : {})}
                to="/product/2"
              >
                꽃바구니
              </NavLink>
            </li>
            <li className="font-regular">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : {})}
                to="/product/3"
              >
                꽃상자
              </NavLink>
            </li>
            <li className="font-regular">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : {})}
                to="/product/4"
              >
                화환
              </NavLink>
            </li>
            <li className="font-regular">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : {})}
                to="/subscription"
              >
                정기구독
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="header__menulist">
            <li className="font-regular">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : {})}
                to="/pickup/nearby"
              >
                주변 꽃집 찾기
              </NavLink>
            </li>
            <li className="font-regular">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : {})}
                to="/pickup/region"
              >
                지역별 꽃집 찾기
              </NavLink>
            </li>
          </ul>
        )}
        {isLogin ? (
          <ul className="header__right">
            <li className="relative">
              <button onClick={() => setNotiShow((cur) => !cur)}>
                <Badge badgeContent={notiCount} color="warning">
                  <NotificationsIcon fontSize="medium" />
                </Badge>
              </button>
              <div className="absolute top-[48px] left-[-90px] z-20 max-[500px]:top-[0px] max-[500px]:left-0">
                <Notification />
              </div>
            </li>
            <li className="font-light">
              <NavLink
                to="/cart"
                style={({ isActive }) => (isActive ? rightActiveStyle : {})}
              >
                장바구니
              </NavLink>
            </li>
            <li className="font-light" onClick={() => setSideMenuState(0)}>
              <NavLink
                to="/mypage"
                style={({ isActive }) => (isActive ? rightActiveStyle : {})}
              >
                마이페이지
              </NavLink>
            </li>
            <li>
              <button className="font-light" onClick={handleLogout}>
                로그아웃
              </button>
            </li>
          </ul>
        ) : (
          <ul className="header__right">
            <li className="font-light">
              <NavLink to="/login">로그인</NavLink>
            </li>
          </ul>
        )}
      </HeaderStyle>
    </div>
  );
}
