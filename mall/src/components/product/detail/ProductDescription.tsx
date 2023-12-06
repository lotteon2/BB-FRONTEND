interface param {
  productDescription: string;
}
export default function ProductDescription(param: param) {
  return <img src={param.productDescription} alt="상품 상세 설명" />;
}
