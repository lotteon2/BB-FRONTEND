import { defaultInstance } from "./utils";

export const getImageUrl = async (image: FormData) => {
  const { data } = await defaultInstance.post("", image);
  return data;
};
