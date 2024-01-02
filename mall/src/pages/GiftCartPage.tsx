import { Button, Modal } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CardTemplateModal from "../components/giftcard/modal/CardTemplateModal";
import { cardTemplateListDto } from "../recoil/common/interfaces";
import GiftCardRegister from "../components/giftcard/GiftCardRegister";
import NotFound from "../components/common/NotFound";

export default function GiftCardPage() {
  const param = useParams();
  const type = param.type;
  const orderProductId = param.id;
  const productId = param.productId;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cardTemplate, setCardTemplate] = useState<cardTemplateListDto>({
    cardTemplateId: 0,
    color: "",
    imageUrl: "",
  });

  if (!orderProductId || !productId || !type) return <NotFound />;

  return (
    <div>
      <div className="mx-auto w-52 text-center text-3xl font-bold border-b-4 border-primary7">
        기프트 카드 작성
      </div>
      <div className="flex justify-end mt-3 px-2">
        <Button size="large" onClick={() => setIsModalOpen(true)}>
          카드 템플릿 선택
        </Button>
      </div>
      <GiftCardRegister
        cardTemplate={cardTemplate}
        orderProductId={Number(orderProductId)}
        productId={productId}
        orderType={type}
      />
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title="카드 템플릿 선택"
        footer={[]}
      >
        <CardTemplateModal
          cardTemplate={cardTemplate}
          setCardTemplate={setCardTemplate}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </div>
  );
}
