import axios from "axios";
import { defaultInstance } from "./utils";

export const getImageUrl = async (image: string) => {
  const { data } = await defaultInstance.get(
    "/products/image/presigned-url?file-name=" + image
  );
  return data;
};

export const uploadS3Server = async (
  url: string,
  data?: File,
  dataType?: string
) => {
  const response = await axios.put(url, data, {
    headers: {
      "Content-Type": dataType,
    },
  });

  return response;
};
