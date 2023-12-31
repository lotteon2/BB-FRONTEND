import { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import { mallState, loginState, sideMenuState } from "../../recoil/atom/common";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Logo from "../../assets/images/logo.png";
import { Select, ConfigProvider } from "antd";

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
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [userToggled, setUserToggled] = useState<boolean>(false);
  const [mallStae, setMallState] = useRecoilState<boolean>(mallState);
  const isLogin = useRecoilValue(loginState);
  const setSideMenuState = useSetRecoilState<number>(sideMenuState);
  const navigate = useNavigate();

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

  return (
    <div className="mt-5">
      <div className="ml-5">
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#85C031",
            },
          }}
        >
          <Select
            defaultValue={mallStae ? "shoppingmall" : "pickup"}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "shoppingmall", label: "꽃 쇼핑몰" },
              { value: "pickup", label: "픽업/예약" },
            ]}
          />
        </ConfigProvider>
      </div>
      <NavLink to={mallStae ? "/" : "/pickup"}>
        <img className="w-36 mx-auto" src={Logo} alt="로고" />
      </NavLink>
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
        {mallStae ? (
          <ul className="header__menulist">
            <li className="font-regular">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : {})}
                to="/product/shoppingmall/1"
              >
                꽃다발
              </NavLink>
            </li>
            <li className="font-regular">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : {})}
                to="/product/shoppingmall/2"
              >
                꽃바구니
              </NavLink>
            </li>
            <li className="font-regular">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : {})}
                to="/product/shoppingmall/3"
              >
                꽃상자
              </NavLink>
            </li>
            <li className="font-regular">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : {})}
                to="/product/shoppingmall/4"
              >
                화분
              </NavLink>
            </li>
            <li className="font-regular">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : {})}
                to="/product/shoppingmall/5"
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
              <button className="font-light">로그아웃</button>
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
