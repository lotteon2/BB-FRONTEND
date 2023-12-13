import { authInstance } from "./utils";

// 리뷰 조회
export const getReviews = async (
  storeId: number,
  page: number,
  size: number,
  sort: string
) => {
  const { data } = await authInstance.get(
    "/products/stores/" +
      storeId +
      "/reviews?page=" +
      page +
      "&size=" +
      size +
      "sort=" +
      sort
  );
  return data;
};

// 문의 리스트 조회
export const getQuestions = async (
  storeId: number,
  page: number,
  size: number,
  isReplied: boolean | null
) => {
  const { data } = await authInstance.get(
    "/stores/" +
      storeId +
      "/questions?is-replied=" +
      isReplied +
      "&size=" +
      size +
      "&page=" +
      page
  );
  return data;
};

// 문의 상세 조회
export const getQuestionDetail = async (questionId: string | undefined) => {
  const { data } = await authInstance.get("/stores/questions/" + questionId);
  return data;
};

// 답변 작성
export const registerAnswer = async (
  questionId: string | undefined,
  content: string
) => {
  const { data } = await authInstance.post(
    "/stores/questions/" + questionId + "/answers",
    content
  );
  return data;
};
