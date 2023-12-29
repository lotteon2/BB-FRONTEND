export const couponListForPay = {
  data: [
    {
      couponId: 1,
      couponName: "쿠폰이름",
      storeName: "가게이름",
      discountPrice: 1000,
      endDate: "1234-56-78",
      minPrice: 1000,
      isAvailable: true,
    },
    {
      couponId: 2,
      couponName: "쿠폰이름",
      storeName: "가게이름",
      discountPrice: 1000,
      endDate: "1234-56-78",
      minPrice: 1000,
      isAvailable: false,
    },
  ],
};

export const deliveryAddressData = {
  addressList: [
    {
      deliveryAddressId: 1,
      recipientName: "가가가",
      zipcode: "012345",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "602호",
      phoneNumber: "01012345678",
    },
    {
      deliveryAddressId: 2,
      recipientName: "가가가",
      zipcode: "012345",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "602호",
      phoneNumber: "01012345678",
    },
    {
      deliveryAddressId: 3,
      recipientName: "가가가",
      zipcode: "012345",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "602호",
      phoneNumber: "01012345678",
    },
    {
      deliveryAddressId: 4,
      recipientName: "가가가",
      zipcode: "012345",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "602호",
      phoneNumber: "01012345678",
    },
    {
      deliveryAddressId: 5,
      recipientName: "가가가",
      zipcode: "012345",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "602호",
      phoneNumber: "01012345678",
    },
    {
      deliveryAddressId: 6,
      recipientName: "가가가",
      zipcode: "012345",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "602호",
      phoneNumber: "01012345678",
    },
    {
      deliveryAddressId: 7,
      recipientName: "가가가",
      zipcode: "012345",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "602호",
      phoneNumber: "01012345678",
    },
    {
      deliveryAddressId: 8,
      recipientName: "가가가",
      zipcode: "012345",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "602호",
      phoneNumber: "01012345678",
    },
    {
      deliveryAddressId: 9,
      recipientName: "가가가",
      zipcode: "012345",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "602호",
      phoneNumber: "01012345678",
    },
    {
      deliveryAddressId: 10,
      recipientName: "가가가",
      zipcode: "012345",
      roadName: "부산광역시 사하구 동매로 16",
      addressDetail: "602호",
      phoneNumber: "01012345678",
    },
  ],
};

export const orderDeliveryDetailData = {
  orderGroupId: "ASDFASDF", // uuid 앞 8글자
  orderDeliveries: [
    {
      storeId: 1,
      storeName: "가게이름1",
      products: [
        {
          productId: "1",
          thumbnailImage:
            "https://f-mans.com/data/goods/1/2023/10/70_temp_16972440461206list1.jpg",
          name: "계절마음",
          price: 50000,
          quantity: 1,
          totalAmount: 50000, // price*quantity 계산하기
          reviewStatus: "ABLE",
          cardStatus: "ABLE",
        },
        {
          productId: "2",
          thumbnailImage:
            "https://f-mans.com/data/goods/1/2023/10/70_temp_16972440461206list1.jpg",
          name: "계절마음2",
          price: 50000,
          quantity: 2,
          totalAmount: 100000, // price*quantity 계산하기
          reviewStatus: "DISABLED",
          cardStatus: "DONE",
        },
      ],
      orderDeliveryStatus: "PENDING",
      totalAmount: 150000,
      deliveryCost: 0,
      couponAmount: 1000,
      paymentAmount: 149900,
    },
  ],
  // 아래는 주문의 나머지 정보
  paymentDate: "2023-12-12",
  totalAmount: 150000, // (위 OrderInfoForStore 리스트에서 totalAmount합산하여 구하기)
  deliveryCost: 0, // (위 OrderInfoForStore 리스트에서 deliveryCost합산하여 구하기)
  couponAmount: 1000, // (위 OrderInfoForStore 리스트에서 couponAmount합산하여 구하기)
  paymentAmount: 149900, // (위 OrderInfoForStore 리스트에서 paymentAmount합산하여 구하기)
  // 아래는 delivery 테이블 사용
  ordererName: "김정윤",
  ordererPhoneNumber: "01012345678",
  ordererEmail: "indl1670@naver.com",
  recipientName: "김정윤",
  zipcode: "45420",
  roadName: "부산광역시 사하구 동매로 16",
  addressDetail: "603호",
  recipientPhoneNumber: "01012345678",
  deliveryRequest: "조심히 와주세요",
};

export const pickupOrderDetailData = {
  productId: "1",
  productName: "상품명",
  productThumbnail:
    "https://f-mans.com/data/goods/1/2023/10/70_temp_16972440461206list1.jpg",
  unitPrce: 50000,
  storeName: "가게명",
  storeAddress: "부산광역시 사하구 동매로 16 1층",
  quantity: 1,
  reservationStatus: "PENDING",
  paymentDateTime: "2023-12-12",
  totalOrderPrice: 50000,
  totalDiscountPrice: 1000,
  actualPrice: 49000,
  reviewStatus: "ABLE", // DISABLED | ABLE | DONE
  cardStatus: "ABLE", // DISABLED | ABLE | DONE
  ordererName: "김정윤",
  ordererPhoneNumber: "01012345678",
  ordererEmail: "indl1670@naver.com",
  pickupDate: "2023-12-14",
  pickupTime: "11:30",
};

export const subscriptionOrderDetailData = {
  productId: "1",
  productName: "상품명",
  productThumbnail:
    "https://f-mans.com/data/goods/1/2023/10/70_temp_16972440461206list1.jpg",
  unitPrce: 50000,
  storeName: "가게명",
  quantity: 1,
  paymentDateTime: "2023-12-12",
  totalOrderPrice: 50000,
  totalDiscountPrice: 1000,
  deliveryPrice: 0,
  actualPrice: 49000,
  reviewStatus: "DISABLED", // DISABLED | ABLE | DONE
  ordererName: "김정윤",
  ordererPhoneNumber: "01012345678",
  ordererEmail: "indl1670@naver.com",
  recipientName: "김정윤",
  recipientPhoneNumber: "01012345678",
  zipcode: "45420",
  roadName: "부산광역시 사하구 동매로 16",
  addressDetail: "603호",
  nextPaymentDate: "2023-01-12",
  nextDeliveryDate: "2023-01-15",
  deliveryRequest: "예쁘게 해주세요",
};
