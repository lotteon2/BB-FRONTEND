import { cardRegisterDto, recommandDto } from "../recoil/common/interfaces";
import { authInstance, defaultInstance } from "./utils";

export const getCardTamplateList = async (color: string) => {
  const { data } = await authInstance.get("/giftcard/template?color=" + color);
  return data;
};

export const getLanguageOfFlowers = async (productId: string) => {
  const { data } = await authInstance.get(
    "/products/" + productId + "/language-of-flowers"
  );
  return data;
};
export const getRecommandLetter = async (recommandDto: recommandDto) => {
  const { data } = await authInstance.post("/giftcard/gpt", recommandDto);
  return data;
};

export const registerGiftCard = async (
  type: string,
  registerDto: cardRegisterDto
) => {
  console.log(registerDto);

  const { data } = await authInstance.post(
    "/giftcard/register?type=" + type,
    registerDto
  );
  return data;
};

export const getMyGiftCardList = async (page: number, size: number) => {
  const { data } = await authInstance.get(
    "/giftcard/my?page=" + page + "&size=" + size
  );
  return data;
};

export const getGiftCardDetail = async (
  cardId: string | undefined,
  password: string | undefined
) => {
  if (cardId && password) {
    const { data } = await defaultInstance.get(
      "/giftcard/card/" + cardId + "/" + password
    );
    return data;
  }
};
