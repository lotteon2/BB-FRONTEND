import { authInstance } from "./utils";

export const getImageUrl = async (image: string) => {
  const { data } = await authInstance.get(
    "/products/image/presigned-url?file-name=" + image
  );
  return data;
};

export const uploadImage = async (url: string, image: File | undefined) => {
  if (image) {
    const { data } = await authInstance.put("", image);
    return data;
  }
};
