import { Toast } from "./Toast";

export const SuccessToast = (title: string) => {
  Toast.fire({
    iconHtml:
      '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
    title: title,
  });
};
