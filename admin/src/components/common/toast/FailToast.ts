import { Toast } from "./Toast";

export const FailToast = (title: string | null) => {
  Toast.fire({
    iconHtml:
      '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
    title: title === null ? "서버에 문제가 발생했습니다." : title,
  });
};
