import { Toast } from "./Toast";

export const SuccessToast = (title: string) => {
  Toast.fire({
    iconHtml:
      '<a><img style="width: 80px" src="success.png" alt="success"></a>',
    title: title,
  });
};
