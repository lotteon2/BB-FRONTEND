import { useEffect, useState } from "react";
import { Button, InputNumber, Modal } from "antd";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../recoil/atom/common";
import { stockDto, stockModifyDto } from "../../recoil/common/interfaces";
import { SuccessToast } from "../common/toast/SuccessToast";
import { FailToast } from "../common/toast/FailToast";
import { modifyFlowerStocks } from "../../apis/product";

interface param {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleChange: () => void;
  data: stockDto[];
}
export default function StockModifyModal(param: param) {
  const storeId = useRecoilValue(storeIdState);

  const [flowerStocks, setflowerStocks] = useState<stockModifyDto[]>([]);

  const handleModify = () => {
    modifyMutation.mutate(flowerStocks);
  };

  const handleFlowerStock = (e: number | null, id: number) => {
    var stocks = flowerStocks;
    const index = stocks.findIndex((e) => e.flowerId === id);

    stocks[index] = {
      flowerId: id,
      stock: Number(e),
    };

    setflowerStocks(stocks);
  };

  useEffect(() => {
    var stocks: stockModifyDto[] = [];
    param.data.forEach((element: stockDto) => {
      const info = {
        flowerId: element.flowerId,
        stock: element.data[0],
      };
      stocks.push(info);
    });

    setflowerStocks(stocks);
    // eslint-disable-next-line
  }, []);

  const modifyMutation = useMutation(
    ["modifyStocks"],
    (stocks: stockModifyDto[]) => modifyFlowerStocks(storeId, stocks),
    {
      onSuccess: () => {
        SuccessToast("수정되었습니다.");
        param.handleChange();
        param.handleCancel();
      },
      onError: () => {
        FailToast(null);
      },
    }
  );
  return (
    <div>
      <Modal
        title="재고 수정"
        open={param.isModalOpen}
        onCancel={param.handleCancel}
        footer={[
          <Button onClick={param.handleCancel} key="cancel">
            취소
          </Button>,
          <Button onClick={handleModify} type="primary" key="save">
            저장
          </Button>,
        ]}
        maskClosable={false}
      >
        <div className="w-full h-[500px] overflow-auto">
          <div className="w-full flex flex-row">
            <div className="w-full">
              {param.data.map((item: stockDto, index: number) => (
                <div className="w-full flex flex-row gap-3" key={index}>
                  <p className="mt-[23px] text-[1rem] w-1/4">{item.name}</p>
                  <span className="mt-[23px]">:</span>
                  <InputNumber
                    onChange={(e) => handleFlowerStock(e, item.flowerId)}
                    defaultValue={item.data[0]}
                    className="mt-5"
                    style={{ width: 250 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
