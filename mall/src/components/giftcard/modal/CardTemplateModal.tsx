import { useState } from "react";
import { Button, Select } from "antd";
import { colorOptions } from "../../../recoil/common/data";
import { cardTemplateListDto } from "../../../recoil/common/interfaces";
import { useQuery } from "react-query";
import { getCardTamplateList } from "../../../apis/giftcard";
import Loading from "../../common/Loading";

interface param {
  cardTemplate: cardTemplateListDto;
  setCardTemplate: (cardTemplate: cardTemplateListDto) => void;
  setIsModalOpen: (cur: boolean) => void;
}
export default function CardTemplateModal(param: param) {
  const [color, setcolor] = useState<string>("mix");
  const [template, setTemplate] = useState<cardTemplateListDto>(
    param.cardTemplate
  );

  const { data, isLoading } = useQuery({
    queryKey: ["getCardTamplateList", color],
    queryFn: () => getCardTamplateList(color),
  });

  const handleSelectTemplate = () => {
    param.setCardTemplate(template);
    param.setIsModalOpen(false);
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Select
        options={colorOptions}
        defaultValue={color}
        style={{ width: 150 }}
        onChange={(value: string) => setcolor(value)}
      />
      <div className="flex flex-row gap-4 flex-wrap justify-center mt-5 max-h-[400px] overflow-auto">
        {data.map((item: cardTemplateListDto) => (
          <img
            src={item.imageUrl}
            key={item.cardTemplateId}
            alt="카드 템플릿"
            className={
              template.cardTemplateId === item.cardTemplateId
                ? "w-32 border-2 border-primary2 cursor-pointer"
                : "w-32 cursor-pointer"
            }
            onClick={() => setTemplate(item)}
          />
        ))}
      </div>
      <div className="flex justify-end mt-5">
        <Button type="primary" onClick={handleSelectTemplate}>
          선택
        </Button>
      </div>
    </div>
  );
}
