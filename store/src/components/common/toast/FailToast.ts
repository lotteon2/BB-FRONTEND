import { Toast } from "./Toast";

export const FailToast = (title: string | null) => {
  Toast.fire({
    iconHtml: '<a><img style="width: 80px" src="fail.png" alt="danger"></a>',
    title: title === null ? "서버에 오류가 발생했습니다." : title,
  });
};
