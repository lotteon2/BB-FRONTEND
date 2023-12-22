import { useState } from "react";
import { Button, Empty, Modal, Pagination, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { productItemDto } from "../../recoil/common/interfaces";
import ProductDetailModal from "./modal/ProductDetailModal";
import ProductModifyModal from "./modal/ProductModifyModal";
import { useQuery } from "react-query";
import { getProductList } from "../../apis/product";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../recoil/atom/common";
import ListFallback from "../fallbacks/ListFallback";

interface param {
  category: number | undefined;
  representativeFlower: number | undefined;
  saleState: string | undefined;
  handleChange: () => void;
  isChange: boolean;
}
export default function ProductTable(param: param) {
  const storeId = useRecoilValue<number>(storeIdState);
  const [page, setPage] = useState<number>(1);
  const [productId, setProductId] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModifyModalOpen(false);
  };

  const handleProductInfo = (productId: string) => {
    setProductId(productId);
    showModal();
  };

  const handleProductModify = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setProductId(productId);
    console.log(productId);
    setIsModifyModalOpen(true);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getProductList", page - 1, param],
    queryFn: () =>
      getProductList(
        storeId,
        param.category,
        param.representativeFlower,
        param.saleState,
        page - 1,
        5
      ),
  });

  const columns: ColumnsType<productItemDto> = [
    {
      title: "",
      dataIndex: "productThumbnail",
      key: "productThumbnail",
      render: (record) => (
        <img className="w-[110px] h-[110px]" src={record} alt="상품 이미지" />
      ),
    },
    {
      title: "상품명",
      dataIndex: "productName",
      key: "productName",
      ellipsis: true,
      width: 250,
    },
    {
      title: "카테고리",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "대표꽃",
      dataIndex: "representativeFlower",
      key: "representativeFlower",
    },
    {
      title: "가격",
      dataIndex: "productPrice",
      key: "productPrice",
      render: (record) => <p>{Number(record).toLocaleString()} 원</p>,
    },
    {
      title: "판매량",
      dataIndex: "productSaleAmount",
      key: "productSaleAmount",
      render: (record) => <p>{Number(record).toLocaleString()} 개</p>,
    },
    {
      title: "평점",
      dataIndex: "averageRating",
      key: "averageRating",
    },
    {
      title: "판매상태",
      dataIndex: "productSaleStatus",
      key: "productSaleStatus",
      render: (record) => (
        <Tag bordered={false} color={record === "판매 중" ? "purple" : "red"}>
          {record}
        </Tag>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "modifyButton",
      render: (record) => (
        <Button onClick={(e) => handleProductModify(e, record.key)}>
          수정
        </Button>
      ),
    },
  ];

  if (!data || isLoading) return <ListFallback />;

  return (
    <div className="w-full text-center">
      {data.data.totalCnt === 0 ? (
        <Empty description="등록된 상품정보가 없습니다." className="pt-80" />
      ) : (
        <div>
          <div className="w-full h-[780px] mt-3">
            <Table
              onRow={(record) => {
                return {
                  onClick: () => {
                    handleProductInfo(record.key);
                  },
                };
              }}
              dataSource={data.data.products}
              columns={columns}
              pagination={false}
            />
          </div>
          <Pagination
            defaultCurrent={page}
            total={data.data.totalCnt}
            defaultPageSize={5}
            onChange={(e) => setPage(e)}
          />

          <Modal
            title="상품 정보 상세"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={<Button onClick={handleCancel}>닫기</Button>}
          >
            <ProductDetailModal productId={productId} />
          </Modal>

          <Modal
            title="상품 정보 수정"
            open={isModifyModalOpen}
            onCancel={handleCancel}
            footer={[]}
          >
            <ProductModifyModal
              handleCancel={handleCancel}
              productId={productId}
              handleChange={param.handleChange}
            />
          </Modal>
        </div>
      )}
    </div>
  );
}
