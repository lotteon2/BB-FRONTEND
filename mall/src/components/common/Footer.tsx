import Logo from "../../assets/images/logo.png";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Footer() {
  return (
    <div className="border-t-[1px] border-grayscale3">
      <footer className="bg-white">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4 flex flex-start">
            <div>
              <img className="w-40" src={Logo} alt="" />
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                BLOOMING BLOOMS
              </h2>
              <ul className="text-gray-500 font-thin text-sm">
                <li>
                  <a href="#">대표: 롯데e커머스</a>
                </li>
                <li>
                  <a href="#">주소: 서울특별시 송파구 올림픽로 300, 26층</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                고객센터
              </h2>
              <ul className="mb-6 text-gray-500 font-thin text-sm">
                <li>
                  <a href="#">전화번호 : 1899-7000(유료)</a>
                </li>
                <li>
                  <a href="#">E-mail : indl1670@gmail.com</a>
                </li>
              </ul>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                전자금융거래 분쟁담당
              </h2>
              <ul className="text-gray-500 font-thin text-sm">
                <li>
                  <a href="#">전화번호 : 1899-7000(유료)</a>
                </li>
                <li>
                  <a href="#">E-mail : indl1670@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-4 py-6 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center">
              © 2023 <a href="http://localhost:3000">BloomingBlooms™</a>. All
              Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
              <a
                href="https://github.com/orgs/lotteon2/teams/lb3t1/repositories/"
                className="text-gray-400 hover:text-gray-900"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
