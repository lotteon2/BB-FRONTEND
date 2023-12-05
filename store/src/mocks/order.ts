export const orderDeliveryList = {
  totalCnt: 6,
  orders: [
    {
      key: "aaaaaa",
      products: [
        {
          productId: 1,
          thumbnailImage:
            "https://f-mans.com/data/goods/1/2022/11/140_temp_16675233646624view.jpg",
          name: "상품1",
          price: 54000,
          quantity: 1,
        },
        {
          productId: 1,
          thumbnailImage:
            "https://f-mans.com/data/goods/1/2022/11/140_temp_16675233646624view.jpg",
          name: "상품2",
          price: 54000,
          quantity: 1,
        },
      ],
      orderDeliveryStatus: "ORDER_RECEIVED",
      paymentAmount: 108000,
      paymentDate: "2023-11-21",
      zipcode: "42421",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "603호",
      deliveryRequest: "예쁘게 해주세요",
    },
    {
      key: "cccccccc",
      products: [
        {
          productId: 1,
          thumbnailImage:
            "https://f-mans.com/data/goods/1/2022/11/140_temp_16675233646624view.jpg",
          name: "상품1",
          price: 54000,
          quantity: 1,
        },
      ],
      orderDeliveryStatus: "ORDER_RECEIVED",
      paymentAmount: 108000,
      paymentDate: "2023-11-21",
      zipcode: "42421",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "603호",
      deliveryRequest: "예쁘게 해주세요",
    },
    {
      key: "bbbbbb",
      products: [
        {
          productId: 1,
          thumbnailImage:
            "https://f-mans.com/data/goods/1/2022/11/140_temp_16675233646624view.jpg",
          name: "상품1",
          price: 54000,
          quantity: 1,
        },
      ],
      orderDeliveryStatus: "ORDER_RECEIVED",
      paymentAmount: 108000,
      paymentDate: "2023-11-21",
      zipcode: "42421",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "603호",
      deliveryRequest: "예쁘게 해주세요",
    },
    {
      key: "dddddddd",
      products: [
        {
          productId: 1,
          thumbnailImage:
            "https://f-mans.com/data/goods/1/2022/11/140_temp_16675233646624view.jpg",
          name: "상품1",
          price: 54000,
          quantity: 1,
        },
      ],
      orderDeliveryStatus: "ORDER_RECEIVED",
      paymentAmount: 108000,
      paymentDate: "2023-11-21",
      zipcode: "42421",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "603호",
      deliveryRequest: "예쁘게 해주세요",
    },
    {
      key: "eeeeeeee",
      products: [
        {
          productId: 1,
          thumbnailImage:
            "https://f-mans.com/data/goods/1/2022/11/140_temp_16675233646624view.jpg",
          name: "상품1",
          price: 54000,
          quantity: 1,
        },
      ],
      orderDeliveryStatus: "ORDER_RECEIVED",
      paymentAmount: 108000,
      paymentDate: "2023-11-21",
      zipcode: "42421",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "603호",
      deliveryRequest: "예쁘게 해주세요",
    },
  ],
};

export const orderDetailData = {
  orderGroupId: "111111",
  paymentDate: "2023-11-23",
  products: [
    {
      productId: 1,
      thumbnailImage:
        "https://f-mans.com/data/goods/1/2022/11/140_temp_16675233646624view.jpg",
      name: "상품이름1",
      price: 54000,
      quantity: 1,
      totalAmount: 54000, // price*quantity 계산하기
      reviewIsWritten: false,
      cardIsWritten: false,
    },
    {
      productId: 2,
      thumbnailImage:
        "https://f-mans.com/data/goods/1/2022/11/140_temp_16675233646624view.jpg",
      name: "상품이름2",
      price: 54000,
      quantity: 1,
      totalAmount: 54000, // price*quantity 계산하기
    },
  ],
  orderDeliveryStatus: "ORDER_RECEIVED",
  totalAmount: 108000,
  deliveryCost: 0,
  couponAmount: 2000,
  paymentAmount: 107000,
  // 아래는 delivery 테이블 사용
  recipientName: "김정윤",
  zipcode: "06250",
  roadName: "압구정로 72길 7",
  addressDetail: "1층",
  recipientPhoneNumber: "010-5448-2069",
  deliveryRequest: "예쁘게 잘 해주세요",
};
