import { useMutation, useQuery } from "react-query";
import { deleteSelectedProduct, getProductList } from "../apis/store";
import { useState } from "react";
import WholeDiv from "../components/fallbacks/WholeDiv";
import {
  Button,
  Checkbox,
  Pagination,
  PaginationProps,
  Select,
  Table,
  Tag,
} from "antd";
import {
  dateOptions,
  salesOptions,
  statusOptions,
} from "../recoil/common/options";
import { ColumnsType } from "antd/es/table";
import { productListDto } from "../recoil/common/interfaces";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { SuccessToast } from "../components/common/toast/SuccessToast";
import { FailToast } from "../components/common/toast/FailToast";

export default function ProductPage() {
  const [status, setStatus] = useState<string>("DELETED");
  const [date, setDate] = useState<string>("OLD");
  const [sale, setSale] = useState<string>("BOTTOM_SALE");
  const [page, setPage] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [isChange, setIschange] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getProductList", status, date, sale, page, isChange],
    queryFn: () => getProductList(status, date, sale, page - 1, 13),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const columns: ColumnsType<productListDto> = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
      width: 40,
      render: (record) => (
        <Checkbox
          checked={selectedId.includes(record)}
          onChange={(e) => handleSingle(e, record)}
        ></Checkbox>
      ),
    },
    {
      title: "가게명",
      dataIndex: "storeName",
      key: "storeName",
      ellipsis: true,
    },
    {
      title: "상품명",
      dataIndex: "productName",
      key: "productName",
      ellipsis: true,
    },
    {
      title: "상품 가격",
      dataIndex: "productPrice",
      key: "productPrice",
      ellipsis: true,
      render: (record) => <p>{record.toLocaleString()}</p>,
    },
    {
      title: "판매량",
      dataIndex: "productSaleAmount",
      key: "productPrice",
      ellipsis: true,
      render: (record) => <p>{record.toLocaleString()}</p>,
    },
    {
      title: "평점",
      dataIndex: "averageRating",
      key: "averageRating",
      ellipsis: true,
    },
    {
      title: "등록일",
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: true,
    },
    {
      title: "판매 상태",
      dataIndex: "productSaleStatus",
      key: "productSaleStatus",
      ellipsis: true,
      render: (record) => (
        <Tag
          color={
            record === "SALE" ? "yellow" : record === "DELETED" ? "red" : ""
          }
          bordered={false}
        >
          {record === "SALE"
            ? "판매중"
            : record === "DELETED"
            ? "삭제됨"
            : "판매중단"}
        </Tag>
      ),
    },
  ];

  const handleSelectAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      let total: string[] = [];
      data.data.products.forEach((item: productListDto) => {
        total.push(item.key);
      });

      setSelectedId(total);
    } else {
      setSelectedId([]);
    }
  };

  const handleSingle = (e: CheckboxChangeEvent, key: string) => {
    if (e.target.checked) {
      setSelectedId((prev) => [...prev, key]);
    } else {
      const filtered = selectedId.filter((element) => element !== key);
      setSelectedId(filtered);
    }
  };

  const deleteMutation = useMutation(
    ["deleteSelectedProduct"],
    () => deleteSelectedProduct(selectedId),
    {
      onSuccess: () => {
        setIschange((cur) => !cur);
        SuccessToast("삭제되었습니다.");
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  if (!data || isLoading)
    return (
      <div className="w-[1620px] h-[897px] bg-grayscale3 p-2">
        <div className="w-full h-full bg-grayscale1 rounded-lg">
          <div className="flex flex-row gap-5 justify-end p-3">
            <button>최신순</button>
            <button>판매량 많은순</button>
          </div>
          <WholeDiv />
        </div>
      </div>
    );

  return (
    <div className="w-[1620px] h-[897px] bg-grayscale3 p-2">
      <div className="w-full h-full bg-grayscale1 rounded-lg relative">
        <div className="flex flex-row gap-5 justify-end p-3">
          <Select
            placeholder=""
            options={statusOptions}
            value={status}
            onChange={(e) => setStatus(e)}
            style={{ width: 150 }}
          />
          <Select
            placeholder=""
            options={dateOptions}
            value={date}
            onChange={(e) => setDate(e)}
            style={{ width: 150 }}
          />
          <Select
            placeholder=""
            options={salesOptions}
            value={sale}
            onChange={(e) => setSale(e)}
            style={{ width: 150 }}
          />
        </div>
        <div>
          <div className="absolute top-7 left-4 flex flex-row gap-2">
            <div>
              <Checkbox
                checked={selectedId.length === data.data.totalCnt}
                onChange={handleSelectAll}
              >
                전체 선택
              </Checkbox>
            </div>
            <Button size="small" onClick={() => deleteMutation.mutate()}>
              선택 상품 삭제
            </Button>
          </div>
          <Table
            dataSource={data.data.products}
            columns={columns}
            pagination={false}
            style={{ height: 775 }}
          />
          <div className="mt-2 text-center ab">
            <Pagination
              defaultCurrent={page}
              total={data.data.totalCnt}
              defaultPageSize={13}
              onChange={handlePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
